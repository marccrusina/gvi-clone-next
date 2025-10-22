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
import styles from './page.module.scss'

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Image Gallery & Data Transformation</h1>
          <p className={styles.description}>
            Showcasing responsive image components using real CMS data from
            mockImageResponse.json. Each image demonstrates different crop types
            and responsive behavior with actual content management system data.
            Explore the data transformation pipeline to see how raw CMS data
            becomes responsive image components.
          </p>

          {/* View Mode Selector */}
          <div className={styles.controls}>
            <label htmlFor={viewModeId} className={styles.label}>
              Choose View Mode
            </label>
            <select
              id={viewModeId}
              value={viewMode}
              onChange={(e) =>
                setViewMode(e.target.value as 'gallery' | 'transformation')
              }
              className={styles.select}
            >
              <option value="gallery">Image Gallery</option>
              <option value="transformation">Data Transformation Demo</option>
            </select>
          </div>

          {/* Image Source Selector - Only show in gallery mode */}
          {viewMode === 'gallery' && (
            <div className={styles.controlGroup}>
              <label htmlFor={selectId} className={styles.label}>
                Choose Image Source
              </label>
              <select
                id={selectId}
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className={styles.select}
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
            <div className={styles.gallery}>
              {filteredImages.map((imageData) => (
                <Link
                  key={imageData.id}
                  href={`/image/${imageData.id}`}
                  className={styles.card}
                >
                  {/* Image Preview */}
                  <div className={styles.imageContainer}>
                    <ResponsiveImage
                      media={imageData.media}
                      cropType={imageData.placements[0].cropType}
                      alt={imageData.altText}
                      imageServerUrl={imageServerUrl}
                    />
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{imageData.title}</h3>
                    <p className={styles.cardDescription}>
                      {imageData.description}
                    </p>

                    {/* Categories and Tags */}
                    <div className={styles.tags}>
                      {imageData.allCategories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className={`${styles.tag} ${styles.primary}`}
                        >
                          {category}
                        </span>
                      ))}
                      {imageData.allTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`${styles.tag} ${styles.secondary}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Technical Details */}
                    <div className={styles.technicalDetails}>
                      <div>Placements: {imageData.placements.length}</div>
                      <div>ID: {imageData.imageId}</div>
                    </div>

                    {/* View Details Link */}
                    <div className={styles.viewDetails}>
                      <span>View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Summary - Only show in gallery mode */}
        {viewMode === 'gallery' && (
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>
              {selectedSource === 'all'
                ? 'Gallery Summary'
                : `Filtered Results - ${selectedSource}`}
            </h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <div className={`${styles.summaryValue} ${styles.blue}`}>
                  {filteredImages.length}
                </div>
                <div className={styles.summaryLabel}>
                  {selectedSource === 'all'
                    ? 'Total Images'
                    : 'Filtered Images'}
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={`${styles.summaryValue} ${styles.green}`}>
                  {selectedSource === 'all'
                    ? extractedImageStats.totalCategories
                    : 1}
                </div>
                <div className={styles.summaryLabel}>
                  {selectedSource === 'all'
                    ? 'Categories'
                    : 'Selected Category'}
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={`${styles.summaryValue} ${styles.purple}`}>
                  3
                </div>
                <div className={styles.summaryLabel}>Component Types</div>
              </div>
              <div className={styles.summaryItem}>
                <div className={`${styles.summaryValue} ${styles.orange}`}>
                  {selectedSource === 'all'
                    ? extractedImageStats.totalTags
                    : new Set(filteredImages.flatMap((img) => img.allTags))
                        .size}
                </div>
                <div className={styles.summaryLabel}>
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
