'use client'

import { useParams, useRouter } from 'next/navigation'
import ResponsiveImage from '@/components/image/components/responsive-image'
import ResponsiveImageLazy from '@/components/image/components/responsive-image-lazy'
import ResponsivePicture from '@/components/image/components/responsive-picture'
import {
  getExtractedImages,
  getExtractedImagesByCategory,
} from '@/data/mock-image-utils'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Image Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested image could not be found.
          </p>
          <button
            type="button"
            onClick={() => router.push('/image')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => router.push('/image')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Gallery
            </button>
            <div className="text-sm text-gray-500">
              Image {currentIndex + 1} of {allImages.length}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentImage.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {currentImage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image Components */}
            <div className="space-y-8">
              {/* ResponsiveImage Component */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ResponsiveImage Component
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ResponsiveImageLazy Component
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ResponsivePicture Component
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
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
          <div className="space-y-6">
            {/* Image Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Image Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Placements:
                  </span>
                  <span className="ml-2 text-sm text-gray-900 font-mono">
                    {currentImage.placements.length}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Categories:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {currentImage.allCategories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Image ID:
                  </span>
                  <span className="ml-2 text-sm text-gray-900 font-mono">
                    {currentImage.imageId}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Tags:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {currentImage.allTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Placements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                All Placements
              </h3>
              <div className="space-y-3">
                {currentImage.placements.map((placement, index) => (
                  <div
                    key={placement.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Placement {index + 1}
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Section:</span>{' '}
                        {placement.sectionName}
                      </div>
                      <div>
                        <span className="font-medium">Viewtype:</span>{' '}
                        {placement.sectionViewtype}
                      </div>
                      <div>
                        <span className="font-medium">Crop Type:</span>{' '}
                        {placement.cropType}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>{' '}
                        {placement.category}
                      </div>
                      {placement.teaserTitle && (
                        <div>
                          <span className="font-medium">Title:</span>{' '}
                          {placement.teaserTitle}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Navigation
              </h3>
              <div className="space-y-3">
                {previousImage && (
                  <button
                    type="button"
                    onClick={() => router.push(`/image/${previousImage.id}`)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      ← Previous
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {previousImage.title}
                    </div>
                  </button>
                )}
                {nextImage && (
                  <button
                    type="button"
                    onClick={() => router.push(`/image/${nextImage.id}`)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      Next →
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {nextImage.title}
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Related Images */}
            {relatedImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Images
                </h3>
                <div className="space-y-3">
                  {relatedImages.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => router.push(`/image/${image.id}`)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {image.title}
                      </div>
                      <div className="text-xs text-gray-500">
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
