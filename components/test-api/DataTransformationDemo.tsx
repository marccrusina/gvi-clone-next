'use client'

import { useId, useState } from 'react'
import { imageCrops } from '@/components/image/constants/image-crops'
import { generateSrcSets } from '@/components/image/utils/image-transforms'
import type { ExtractedImageData } from '@/data/mock-image-utils'
import { getExtractedImages } from '@/data/mock-image-utils'

interface TransformationStep {
  step: string
  input: Record<string, unknown>
  output: Record<string, unknown>
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Data Transformation Pipeline
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          This demo shows how raw CMS data is transformed through multiple steps
          to become responsive image component props. Each step demonstrates the
          data flow and transformations.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={imageSelectId}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Image
            </label>
            <select
              id={imageSelectId}
              value={selectedImage?.id || firstImage?.id || ''}
              onChange={(e) => {
                const image = allImages.find((img) => img.id === e.target.value)
                setSelectedImage(image || null)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allImages.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.title} ({image.imageId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor={cropTypeSelectId}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Crop Type
            </label>
            <select
              id={cropTypeSelectId}
              value={selectedCropType}
              onChange={(e) => setSelectedCropType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="space-y-6">
        {transformationSteps.map((step) => (
          <div
            key={step.step}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900">
                {step.step}
              </h3>
              <p className="text-blue-700 mt-1">{step.description}</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Input
                  </h4>
                  <div className="bg-gray-50 rounded-md p-4">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(step.input, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Output */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Output
                  </h4>
                  <div className="bg-green-50 rounded-md p-4">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(step.output, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              {step.code && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Code Example
                  </h4>
                  <div className="bg-gray-900 rounded-md p-4">
                    <pre className="text-sm text-green-400 overflow-x-auto">
                      {step.code}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Transformation Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {transformationSteps.length}
            </div>
            <div className="text-sm text-gray-600">Transformation Steps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Object.keys(imageCrops).length}
            </div>
            <div className="text-sm text-gray-600">Available Crop Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {allImages.length}
            </div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
        </div>
      </div>
    </div>
  )
}
