'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import ResponsiveImage from '@/components/image/components/responsive-image'
import DataTransformationDemo from '@/components/test-api/DataTransformationDemo'
import {
  getExtractedCategories,
  getExtractedImageStats,
  getExtractedImages,
  getExtractedImagesByCategory,
} from '@/data/mock-image-utils'

export default function ImageGalleryPage() {
  const imageServerUrl = 'https://media.grandvision.it/cmsuat'
  const allImages = getExtractedImages()
  const categories = getExtractedCategories()
  const extractedImageStats = getExtractedImageStats()

  // State for selected image source and view mode
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'gallery' | 'transformation'>(
    'gallery',
  )
  const selectId = useId()
  const viewModeId = useId()

  // Filter images based on selected source
  const filteredImages =
    selectedSource === 'all'
      ? allImages
      : getExtractedImagesByCategory(selectedSource)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Gallery & Data Transformation
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Showcasing responsive image components using real CMS data from
            mockImageResponse.json. Each image demonstrates different crop types
            and responsive behavior with actual content management system data.
            Explore the data transformation pipeline to see how raw CMS data
            becomes responsive image components.
          </p>

          {/* View Mode Selector */}
          <div className="max-w-md mx-auto mb-6">
            <label
              htmlFor={viewModeId}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose View Mode
            </label>
            <select
              id={viewModeId}
              value={viewMode}
              onChange={(e) =>
                setViewMode(e.target.value as 'gallery' | 'transformation')
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="gallery">Image Gallery</option>
              <option value="transformation">Data Transformation Demo</option>
            </select>
          </div>

          {/* Image Source Selector - Only show in gallery mode */}
          {viewMode === 'gallery' && (
            <div className="max-w-md mx-auto">
              <label
                htmlFor={selectId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose Image Source
              </label>
              <select
                id={selectId}
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All Images ({allImages.length})</option>
                {categories.map((category) => {
                  const categoryImages = getExtractedImagesByCategory(category)
                  return (
                    <option key={category} value={category}>
                      {category} ({categoryImages.length})
                    </option>
                  )
                })}
              </select>
            </div>
          )}
        </div>

        {/* Conditional Content Based on View Mode */}
        {viewMode === 'transformation' ? (
          <DataTransformationDemo />
        ) : (
          <>
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((imageData) => (
                <Link
                  key={imageData.id}
                  href={`/image/${imageData.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Image Preview */}
                  <div className="aspect-video overflow-hidden">
                    <ResponsiveImage
                      media={imageData.media}
                      cropType={imageData.placements[0].cropType}
                      alt={imageData.altText}
                      imageServerUrl={imageServerUrl}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {imageData.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {imageData.description}
                    </p>

                    {/* Categories and Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {imageData.allCategories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {category}
                        </span>
                      ))}
                      {imageData.allTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Technical Details */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="font-mono">
                        Placements: {imageData.placements.length}
                      </div>
                      <div className="font-mono">ID: {imageData.imageId}</div>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-blue-600 text-sm font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Summary - Only show in gallery mode */}
        {viewMode === 'gallery' && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedSource === 'all'
                ? 'Gallery Summary'
                : `Filtered Results - ${selectedSource}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredImages.length}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedSource === 'all'
                    ? 'Total Images'
                    : 'Filtered Images'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {selectedSource === 'all'
                    ? extractedImageStats.totalCategories
                    : 1}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedSource === 'all'
                    ? 'Categories'
                    : 'Selected Category'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Component Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {selectedSource === 'all'
                    ? extractedImageStats.totalTags
                    : new Set(filteredImages.flatMap((img) => img.allTags))
                        .size}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedSource === 'all' ? 'Unique Tags' : 'Filtered Tags'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
