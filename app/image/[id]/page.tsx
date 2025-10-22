'use client'

import { useParams, useRouter } from 'next/navigation'
import ResponsiveImage from '@/components/image/components/responsive-image'
import ResponsiveImageLazy from '@/components/image/components/responsive-image-lazy'
import ResponsivePicture from '@/components/image/components/responsive-picture'
import {
  getExtractedImages,
  getExtractedImagesByCategory,
} from '@/data/mock-image-utils'
import styles from './page.module.scss'

export default function ImageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const imageId = params.id as string
  const imageServerUrl = 'https://media.grandvision.it/cmsuat'

  const allImages = getExtractedImages()

  // Find current image
  const currentImage = allImages.find((img) => img.id === imageId)

  // Find current image index for navigation
  const currentIndex = allImages.findIndex((img) => img.id === imageId)

  // Get previous and next images
  const previousImage = currentIndex > 0 ? allImages[currentIndex - 1] : null
  const nextImage =
    currentIndex < allImages.length - 1 ? allImages[currentIndex + 1] : null

  // Get related images from same category
  const relatedImages = currentImage
    ? getExtractedImagesByCategory(currentImage.allCategories[0])
        .filter((img) => img.id !== imageId)
        .slice(0, 3)
    : []

  if (!currentImage) {
    return (
      <div className={styles.notFound}>
        <div className={styles.content}>
          <h1 className={styles.notFoundTitle}>Image Not Found</h1>
          <p className={styles.notFoundDescription}>
            The requested image could not be found.
          </p>
          <button
            type="button"
            onClick={() => router.push('/image')}
            className={styles.backButton}
          >
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header with navigation */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <button
              type="button"
              onClick={() => router.push('/image')}
              className={styles.backLink}
            >
              ← Back to Gallery
            </button>
            <div className={styles.imageCounter}>
              Image {currentIndex + 1} of {allImages.length}
            </div>
          </div>

          <h1 className={styles.title}>{currentImage.title}</h1>
          <p className={styles.description}>{currentImage.description}</p>
        </div>

        <div className={styles.mainGrid}>
          {/* Main content */}
          <div className={styles.imageSection}>
            {/* Image Components */}
            <div>
              {/* ResponsiveImage Component */}
              <div className={styles.imageCard}>
                <div className={styles.imageCardContent}>
                  <h2 className={styles.imageCardTitle}>
                    ResponsiveImage Component
                  </h2>
                  <div className={styles.imageContainer}>
                    <ResponsiveImage
                      media={currentImage.media}
                      cropType={currentImage.placements[0].cropType}
                      alt={currentImage.altText}
                      imageServerUrl={imageServerUrl}
                    />
                  </div>
                </div>
              </div>

              {/* ResponsiveImageLazy Component */}
              <div className={styles.imageCard}>
                <div className={styles.imageCardContent}>
                  <h2 className={styles.imageCardTitle}>
                    ResponsiveImageLazy Component
                  </h2>
                  <div className={styles.imageContainer}>
                    <ResponsiveImageLazy
                      media={currentImage.media}
                      cropType={currentImage.placements[0].cropType}
                      alt={currentImage.altText}
                      imageServerUrl={imageServerUrl}
                      showSkeleton={true}
                    />
                  </div>
                </div>
              </div>

              {/* ResponsivePicture Component */}
              <div className={styles.imageCard}>
                <div className={styles.imageCardContent}>
                  <h2 className={styles.imageCardTitle}>
                    ResponsivePicture Component
                  </h2>
                  <div className={styles.imageContainer}>
                    <ResponsivePicture
                      media={currentImage.media}
                      cropType={currentImage.placements[0].cropType}
                      alt={currentImage.altText}
                      imageServerUrl={imageServerUrl}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Image Details */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Image Details</h3>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Placements:</span>
                  <span className={styles.detailValue}>
                    {currentImage.placements.length}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Categories:</span>
                  <div className={styles.categories}>
                    {currentImage.allCategories.map((category) => (
                      <span key={category} className={styles.categoryTag}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Image ID:</span>
                  <span className={styles.detailValue}>
                    {currentImage.imageId}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Tags:</span>
                  <div className={styles.tags}>
                    {currentImage.allTags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Placements */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>All Placements</h3>
              <div className={styles.placementsList}>
                {currentImage.placements.map((placement, index) => (
                  <div key={placement.id} className={styles.placementCard}>
                    <div className={styles.placementTitle}>
                      Placement {index + 1}
                    </div>
                    <div className={styles.placementDetails}>
                      <div className={styles.placementDetail}>
                        <span className={styles.label}>Section:</span>{' '}
                        {placement.sectionName}
                      </div>
                      <div className={styles.placementDetail}>
                        <span className={styles.label}>Viewtype:</span>{' '}
                        {placement.sectionViewtype}
                      </div>
                      <div className={styles.placementDetail}>
                        <span className={styles.label}>Crop Type:</span>{' '}
                        {placement.cropType}
                      </div>
                      <div className={styles.placementDetail}>
                        <span className={styles.label}>Category:</span>{' '}
                        {placement.category}
                      </div>
                      {placement.teaserTitle && (
                        <div className={styles.placementDetail}>
                          <span className={styles.label}>Title:</span>{' '}
                          {placement.teaserTitle}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Navigation</h3>
              <div className={styles.navigationList}>
                {previousImage && (
                  <button
                    type="button"
                    onClick={() => router.push(`/image/${previousImage.id}`)}
                    className={styles.navButton}
                  >
                    <div className={styles.navButtonTitle}>← Previous</div>
                    <div className={styles.navButtonSubtitle}>
                      {previousImage.title}
                    </div>
                  </button>
                )}
                {nextImage && (
                  <button
                    type="button"
                    onClick={() => router.push(`/image/${nextImage.id}`)}
                    className={styles.navButton}
                  >
                    <div className={styles.navButtonTitle}>Next →</div>
                    <div className={styles.navButtonSubtitle}>
                      {nextImage.title}
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Related Images */}
            {relatedImages.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Related Images</h3>
                <div className={styles.relatedList}>
                  {relatedImages.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => router.push(`/image/${image.id}`)}
                      className={styles.relatedButton}
                    >
                      <div className={styles.relatedTitle}>{image.title}</div>
                      <div className={styles.relatedSubtitle}>
                        {image.placements.length} placement
                        {image.placements.length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
