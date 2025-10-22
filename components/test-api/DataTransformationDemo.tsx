'use client'

import { useId, useState } from 'react'
import { imageCrops } from '@/components/image/constants/image-crops'
import { generateSrcSets } from '@/components/image/utils/image-transforms'
import type { ExtractedImageData } from '@/data/mock-image-utils'
import { getExtractedImages } from '@/data/mock-image-utils'
import styles from './DataTransformationDemo.module.scss'

interface TransformationStep {
  step: string
  input: unknown
  output: unknown
  description: string
  code?: string
}

export default function DataTransformationDemo() {
  const [selectedImage, setSelectedImage] = useState<ExtractedImageData | null>(
    null,
  )
  const [selectedCropType, setSelectedCropType] =
    useState<string>('FULL_WIDTH_BANNER')
  const [imageServerUrl] = useState('https://media.grandvision.it/cmsuat')

  const imageSelectId = useId()
  const cropTypeSelectId = useId()

  const allImages = getExtractedImages()
  const firstImage = allImages[0]

  // Use selected image or first image as default
  const currentImage = selectedImage || firstImage

  // Generate transformation steps
  const getTransformationSteps = (): TransformationStep[] => {
    if (!currentImage) return []

    const steps: TransformationStep[] = []

    // Step 1: Raw Mock Data
    steps.push({
      step: '1. Raw Mock Data (mockImageResponse.json)',
      input: {
        description: 'Original JSON structure from CMS',
        data: {
          sections: 'Array of sections with items',
          items: 'Each item contains media array',
          media: 'Media objects with type and uriTemplate',
          uriTemplate: currentImage.media.uriTemplate,
        },
      },
      output: currentImage.media,
      description:
        'The raw data structure as it comes from the CMS API response',
      code: `// Raw CMS data structure
{
  "sections": [
    {
      "name": "section_name",
      "viewtype": "full-width-banner",
      "items": [
        {
          "media": [
            {
              "type": "CMPicture",
              "uriTemplate": "${currentImage.media.uriTemplate}"
            }
          ]
        }
      ]
    }
  ]
}`,
    })

    // Step 2: Data Extraction
    steps.push({
      step: '2. Data Extraction (extractImageDataFromResponse)',
      input: currentImage.media,
      output: {
        id: currentImage.id,
        media: currentImage.media,
        title: currentImage.title,
        description: currentImage.description,
        imageId: currentImage.imageId,
        altText: currentImage.altText,
        placements: currentImage.placements,
        allTags: currentImage.allTags,
        allCategories: currentImage.allCategories,
      },
      description: 'Extracted and structured data from the raw CMS response',
      code: `// Data extraction process
const extractedData = {
  id: "${currentImage.id}",
  media: {
    type: "CMPicture",
    uriTemplate: "${currentImage.media.uriTemplate}"
  },
  title: "${currentImage.title}",
  description: "${currentImage.description}",
  imageId: "${currentImage.imageId}",
  altText: "${currentImage.altText}",
  placements: ${JSON.stringify(currentImage.placements, null, 2)},
  allTags: ${JSON.stringify(currentImage.allTags)},
  allCategories: ${JSON.stringify(currentImage.allCategories)}
}`,
    })

    // Step 3: Crop Configuration
    const cropConfig = imageCrops[selectedCropType as keyof typeof imageCrops]
    steps.push({
      step: '3. Crop Configuration (imageCrops)',
      input: {
        cropType: selectedCropType,
        description: 'Crop type determines responsive breakpoints',
      },
      output: cropConfig,
      description:
        'Configuration object defining crop settings for each breakpoint',
      code: `// Crop configuration for ${selectedCropType}
const cropConfig = ${JSON.stringify(cropConfig, null, 2)}`,
    })

    // Step 4: URL Transformation
    const transformedUrls = generateSrcSets(
      currentImage.media.uriTemplate,
      selectedCropType,
      imageServerUrl,
    )
    steps.push({
      step: '4. URL Transformation (generateSrcSets)',
      input: {
        uriTemplate: currentImage.media.uriTemplate,
        cropType: selectedCropType,
        imageServerUrl: imageServerUrl,
      },
      output: transformedUrls,
      description: 'Generated responsive URLs for each breakpoint',
      code: `// URL transformation process
const transformedUrls = generateSrcSets(
  "${currentImage.media.uriTemplate}",
  "${selectedCropType}",
  "${imageServerUrl}"
)

// Result:
${JSON.stringify(transformedUrls, null, 2)}`,
    })

    // Step 5: Component Props
    steps.push({
      step: '5. Component Props (ResponsiveImage)',
      input: {
        media: currentImage.media,
        cropType: selectedCropType,
        alt: currentImage.altText,
        imageServerUrl: imageServerUrl,
      },
      output: {
        srcSets: transformedUrls,
        defaultSrc: transformedUrls.mobile,
        mediaQueries: {
          deskL: `(min-width: 1440px)`,
          deskS: `(min-width: 1280px)`,
          tabletL: `(min-width: 1024px)`,
          tabletP: `(min-width: 601px)`,
          mobile: 'default',
        },
      },
      description: 'Final props passed to the ResponsiveImage component',
      code: `// Component usage
<ResponsiveImage
  media={${JSON.stringify(currentImage.media, null, 2)}}
  cropType="${selectedCropType}"
  alt="${currentImage.altText}"
  imageServerUrl="${imageServerUrl}"
/>

// Generated HTML:
<picture>
  <source media="(min-width: 1440px)" srcSet="${transformedUrls.deskL}" />
  <source media="(min-width: 1280px)" srcSet="${transformedUrls.deskS}" />
  <source media="(min-width: 1024px)" srcSet="${transformedUrls.tabletL}" />
  <source media="(min-width: 601px)" srcSet="${transformedUrls.tabletP}" />
  <img src="${transformedUrls.mobile}" alt="${currentImage.altText}" />
</picture>`,
    })

    return steps
  }

  const transformationSteps = getTransformationSteps()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Data Transformation Pipeline</h2>
        <p className={styles.description}>
          This demo shows how raw CMS data is transformed through multiple steps
          to become responsive image component props. Each step demonstrates the
          data flow and transformations.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <h3 className={styles.controlsTitle}>Configuration</h3>
        <div className={styles.controlsGrid}>
          <div className={styles.controlGroup}>
            <label htmlFor={imageSelectId} className={styles.label}>
              Select Image
            </label>
            <select
              id={imageSelectId}
              value={selectedImage?.id || firstImage?.id || ''}
              onChange={(e) => {
                const image = allImages.find((img) => img.id === e.target.value)
                setSelectedImage(image || null)
              }}
              className={styles.select}
            >
              {allImages.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.title} ({image.imageId})
                </option>
              ))}
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label htmlFor={cropTypeSelectId} className={styles.label}>
              Select Crop Type
            </label>
            <select
              id={cropTypeSelectId}
              value={selectedCropType}
              onChange={(e) => setSelectedCropType(e.target.value)}
              className={styles.select}
            >
              {Object.keys(imageCrops).map((cropType) => (
                <option key={cropType} value={cropType}>
                  {cropType}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transformation Steps */}
      <div className={styles.steps}>
        {transformationSteps.map((step) => (
          <div key={step.step} className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>{step.step}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>

            <div className={styles.stepContent}>
              <div className={styles.stepGrid}>
                {/* Input */}
                <div className={styles.inputOutput}>
                  <h4 className={styles.inputOutputTitle}>Input</h4>
                  <div className={styles.inputContainer}>
                    <pre className={styles.json}>
                      {JSON.stringify(step.input, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Output */}
                <div className={styles.inputOutput}>
                  <h4 className={styles.inputOutputTitle}>Output</h4>
                  <div className={styles.outputContainer}>
                    <pre className={styles.json}>
                      {JSON.stringify(step.output, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              {step.code && (
                <div className={styles.codeSection}>
                  <h4 className={styles.inputOutputTitle}>Code Example</h4>
                  <div className={styles.codeContainer}>
                    <pre className={styles.code}>{step.code}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <h3 className={styles.summaryTitle}>Transformation Summary</h3>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <div className={`${styles.summaryValue} ${styles.blue}`}>
              {transformationSteps.length}
            </div>
            <div className={styles.summaryLabel}>Transformation Steps</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={`${styles.summaryValue} ${styles.green}`}>
              {Object.keys(imageCrops).length}
            </div>
            <div className={styles.summaryLabel}>Available Crop Types</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={`${styles.summaryValue} ${styles.purple}`}>
              {allImages.length}
            </div>
            <div className={styles.summaryLabel}>Total Images</div>
          </div>
        </div>
      </div>
    </div>
  )
}
