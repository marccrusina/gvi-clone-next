'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getImageUrlFromMedia,
  type ResponsiveImageLazyProps,
} from '@/components/image/types/image'
import {
  getDefaultCropType,
  isValidCropType,
} from '@/components/image/utils/image-config'
import { generateSrcSets } from '@/components/image/utils/image-transforms'

/**
 * Skeleton component for loading state
 */
function SkeletonLoader({
  className,
  aspectRatio,
}: {
  className?: string
  aspectRatio?: string
}) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{
        aspectRatio: aspectRatio || '16/9',
        width: '100%',
      }}
    />
  )
}

/**
 * Client-side component with lazy loading and skeleton
 * Features fade-in effect and loading state management
 */
export default function ResponsiveImageLazy({
  media,
  cropType,
  alt,
  imageServerUrl,
  priority = false,
  className,
  onLoad,
}: ResponsiveImageLazyProps) {
  // Validate crop type
  const validCropType = isValidCropType(cropType)
    ? cropType
    : getDefaultCropType()

  // Get the image URL from media
  const imageUrl = getImageUrlFromMedia(media)

  if (!imageUrl) {
    console.warn('No image URL found in media object')
    return null
  }

  // Generate responsive srcsets
  const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)

  // Get the mobile image as the default src
  const defaultSrc = srcSets.mobile || ''

  if (!defaultSrc) {
    console.warn('No mobile image URL generated')
    return null
  }

  return (
    <picture className={`responsive-picture ${className || ''}`}>
      {srcSets.deskL && (
        <source media="(min-width: 1440px)" srcSet={srcSets.deskL} />
      )}
      {srcSets.deskS && (
        <source media="(min-width: 1280px)" srcSet={srcSets.deskS} />
      )}
      {srcSets.tabletL && (
        <source media="(min-width: 1024px)" srcSet={srcSets.tabletL} />
      )}
      {srcSets.tabletP && (
        <source media="(min-width: 601px)" srcSet={srcSets.tabletP} />
      )}
      <img
        src={defaultSrc}
        alt={alt}
        width={800}
        height={600}
        className="responsive-image w-full h-auto"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          display: 'block',
          objectFit: 'contain',
          overflow: 'hidden',
        }}
        loading={priority ? 'eager' : 'lazy'}
        crossOrigin="anonymous"
        onLoad={onLoad}
      />
    </picture>
  )
}

/**
 * Alternative lazy loading component using native picture element
 * Useful when you need more control over the loading behavior
 */
export function ResponsiveImageLazyNative({
  media,
  cropType,
  alt,
  imageServerUrl,
  className,
  onLoad,
  showSkeleton = true,
}: Omit<ResponsiveImageLazyProps, 'priority' | 'sizes'>) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true) // Always show images immediately
  const [showSkeletonState, setShowSkeletonState] = useState(showSkeleton)
  const imgRef = useRef<HTMLDivElement>(null)

  const validCropType = isValidCropType(cropType)
    ? cropType
    : getDefaultCropType()
  const imageUrl = getImageUrlFromMedia(media)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!imageUrl) {
    return null
  }

  const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)

  const handleLoad = () => {
    setIsLoaded(true)
    setShowSkeletonState(false)
    onLoad?.()
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Skeleton loader */}
      {showSkeletonState && !isLoaded && (
        <SkeletonLoader className="absolute inset-0 z-10" aspectRatio="16/9" />
      )}

      {/* Native picture element */}
      {isVisible && (
        <picture
          className={`responsive-picture transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {srcSets.deskL && (
            <source media="(min-width: 1440px)" srcSet={srcSets.deskL} />
          )}
          {srcSets.deskS && (
            <source media="(min-width: 1280px)" srcSet={srcSets.deskS} />
          )}
          {srcSets.tabletL && (
            <source media="(min-width: 1024px)" srcSet={srcSets.tabletL} />
          )}
          {srcSets.tabletP && (
            <source media="(min-width: 601px)" srcSet={srcSets.tabletP} />
          )}
          <img
            src={srcSets.mobile || ''}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
            crossOrigin="anonymous"
            onLoad={handleLoad}
          />
        </picture>
      )}
    </div>
  )
}
