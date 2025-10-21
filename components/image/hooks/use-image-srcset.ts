'use client'

import { useMemo } from 'react'
import {
  getImageUrlFromMedia,
  type ImageDimensions,
  type Media,
  type SrcSetResult,
} from '../types/image'
import { getDefaultCropType, isValidCropType } from '../utils/image-config'
import {
  calculateImageDimensions,
  extractImageRatio,
  generateSrcSets,
} from '../utils/image-transforms'

/**
 * Hook for accessing responsive image data
 * Provides srcsets, dimensions, and aspect ratio information
 */
export function useImageSrcset(
  media: Media | undefined,
  cropType: string,
  imageServerUrl: string,
) {
  return useMemo(() => {
    if (!media) {
      return {
        srcSets: {} as SrcSetResult,
        dimensions: { width: null, height: null } as ImageDimensions,
        aspectRatio: '16/9',
        isLoading: false,
        error: 'No media provided',
      }
    }

    try {
      // Validate crop type
      const validCropType = isValidCropType(cropType)
        ? cropType
        : getDefaultCropType()

      // Get the image URL from media
      const imageUrl = getImageUrlFromMedia(media)

      if (!imageUrl) {
        return {
          srcSets: {} as SrcSetResult,
          dimensions: { width: null, height: null } as ImageDimensions,
          aspectRatio: '16/9',
          isLoading: false,
          error: 'No image URL found in media object',
        }
      }

      // Generate responsive srcsets
      const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)

      // Calculate dimensions
      const dimensions = calculateImageDimensions(imageUrl)

      // Extract aspect ratio
      const ratioData = extractImageRatio(imageUrl)
      const aspectRatio = ratioData
        ? `${ratioData.ratio[0]}/${ratioData.ratio[1]}`
        : '16/9'

      return {
        srcSets,
        dimensions,
        aspectRatio,
        isLoading: false,
        error: null,
      }
    } catch (error) {
      return {
        srcSets: {} as SrcSetResult,
        dimensions: { width: null, height: null } as ImageDimensions,
        aspectRatio: '16/9',
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }, [media, cropType, imageServerUrl])
}

/**
 * Hook for responsive image with loading states
 * Includes loading and error states
 */
export function useImageSrcsetWithStates(
  media: Media | undefined,
  cropType: string,
  imageServerUrl: string,
) {
  const imageData = useImageSrcset(media, cropType, imageServerUrl)

  return {
    ...imageData,
    hasError: !!imageData.error,
    hasValidSrcSets: Object.keys(imageData.srcSets).length > 0,
    mobileSrc: imageData.srcSets.mobile,
    desktopSrc: imageData.srcSets.deskL || imageData.srcSets.deskS,
  }
}

/**
 * Hook for image with aspect ratio preservation
 * Calculates and returns aspect ratio information
 */
export function useImageWithAspectRatio(
  media: Media | undefined,
  cropType: string,
  imageServerUrl: string,
) {
  const imageData = useImageSrcset(media, cropType, imageServerUrl)

  return {
    ...imageData,
    aspectRatioStyle: {
      aspectRatio: imageData.aspectRatio,
    },
    containerStyle: {
      width: '100%',
      aspectRatio: imageData.aspectRatio,
      position: 'relative' as const,
    },
  }
}

/**
 * Hook for responsive image with breakpoint detection
 * Returns appropriate image URL based on current viewport
 */
export function useResponsiveImage(
  media: Media | undefined,
  cropType: string,
  imageServerUrl: string,
  currentWidth?: number,
) {
  const imageData = useImageSrcset(media, cropType, imageServerUrl)

  const getImageForWidth = (width: number) => {
    if (width >= 1440) return imageData.srcSets.deskL
    if (width >= 1280) return imageData.srcSets.deskS
    if (width >= 1024) return imageData.srcSets.tabletL
    if (width >= 601) return imageData.srcSets.tabletP
    return imageData.srcSets.mobile
  }

  return {
    ...imageData,
    getImageForWidth,
    currentImage: currentWidth
      ? getImageForWidth(currentWidth)
      : imageData.srcSets.mobile,
    isMobile: currentWidth ? currentWidth < 601 : true,
    isTablet: currentWidth ? currentWidth >= 601 && currentWidth < 1024 : false,
    isDesktop: currentWidth ? currentWidth >= 1024 : false,
  }
}
