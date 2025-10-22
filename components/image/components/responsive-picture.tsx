import {
  getImageUrlFromMedia,
  type ResponsivePictureProps,
} from '@/components/image/types/image'
import {
  getDefaultCropType,
  isValidCropType,
} from '@/components/image/utils/image-config'
import {
  generateSizesAttribute,
  generateSrcSetString,
  generateSrcSets,
} from '@/components/image/utils/image-transforms'

/**
 * ResponsivePicture component using native img element
 * This ensures proper image loading and optimization
 */
export default function ResponsivePicture({
  media,
  cropType,
  alt,
  imageServerUrl,
  loading = 'lazy',
  className,
  priority = false,
  sizes,
}: ResponsivePictureProps & { priority?: boolean; sizes?: string }) {
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

  // Generate srcset string for native img
  const srcSetString = generateSrcSetString(srcSets)

  // Use provided sizes or generate default
  const sizesAttribute = sizes || generateSizesAttribute()

  return (
    // biome-ignore lint/performance/noImgElement: Using native img for better control
    <img
      src={defaultSrc}
      alt={alt}
      width={800}
      height={600}
      className={`responsive-picture w-full h-auto ${className || ''}`}
      sizes={sizesAttribute}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        display: 'block',
        objectFit: 'contain',
        overflow: 'hidden',
      }}
      // Use srcSet for responsive images
      {...(srcSetString && { srcSet: srcSetString })}
      // Ensure proper loading behavior
      loading={priority ? 'eager' : loading}
      // Support for cross-origin images
      crossOrigin="anonymous"
    />
  )
}

/**
 * Enhanced picture component with additional features
 * Includes error handling and loading states using Next.js Image
 */
export function ResponsivePictureEnhanced({
  media,
  cropType,
  alt,
  imageServerUrl,
  loading = 'lazy',
  className,
  onLoad,
  onError,
  fallbackSrc,
  priority = false,
  sizes,
}: ResponsivePictureProps & {
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  priority?: boolean
  sizes?: string
}) {
  const validCropType = isValidCropType(cropType)
    ? cropType
    : getDefaultCropType()
  const imageUrl = getImageUrlFromMedia(media)

  if (!imageUrl) {
    return fallbackSrc ? (
      // biome-ignore lint/performance/noImgElement: Using native img for better control
      <img
        src={fallbackSrc}
        alt={alt}
        width={800}
        height={600}
        className={`responsive-picture w-full h-auto ${className || ''}`}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          display: 'block',
          objectFit: 'contain',
          overflow: 'hidden',
        }}
        onLoad={onLoad}
        onError={onError}
      />
    ) : null
  }

  const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)
  const defaultSrc = srcSets.mobile || fallbackSrc || ''

  if (!defaultSrc) {
    return null
  }

  // Generate srcset string for native img
  const srcSetString = generateSrcSetString(srcSets)

  // Use provided sizes or generate default
  const sizesAttribute = sizes || generateSizesAttribute()

  return (
    // biome-ignore lint/performance/noImgElement: Using native img for better control
    <img
      src={defaultSrc}
      alt={alt}
      width={800}
      height={600}
      className={`responsive-picture w-full h-auto ${className || ''}`}
      sizes={sizesAttribute}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        display: 'block',
        objectFit: 'contain',
        overflow: 'hidden',
      }}
      // Use srcSet for responsive images
      {...(srcSetString && { srcSet: srcSetString })}
      // Ensure proper loading behavior
      loading={priority ? 'eager' : loading}
      // Support for cross-origin images
      crossOrigin="anonymous"
      onLoad={onLoad}
      onError={onError}
    />
  )
}

/**
 * Picture component with aspect ratio preservation using Next.js Image
 * Calculates and maintains aspect ratio from URL metadata
 */
export function ResponsivePictureWithAspectRatio({
  media,
  cropType,
  alt,
  imageServerUrl,
  loading = 'lazy',
  className,
  priority = false,
  sizes,
}: ResponsivePictureProps & { priority?: boolean; sizes?: string }) {
  const validCropType = isValidCropType(cropType)
    ? cropType
    : getDefaultCropType()
  const imageUrl = getImageUrlFromMedia(media)

  if (!imageUrl) {
    return null
  }

  const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)
  const defaultSrc = srcSets.mobile || ''

  if (!defaultSrc) {
    return null
  }

  // Extract aspect ratio from URL if available
  const aspectRatioMatch = imageUrl.match(/ratio(\d+)x(\d+)/)
  const aspectRatio = aspectRatioMatch
    ? `${aspectRatioMatch[1]}/${aspectRatioMatch[2]}`
    : '16/9' // Default aspect ratio

  // Generate srcset string for native img
  const srcSetString = generateSrcSetString(srcSets)

  // Use provided sizes or generate default
  const sizesAttribute = sizes || generateSizesAttribute()

  return (
    // biome-ignore lint/performance/noImgElement: Using native img for better control
    <img
      src={defaultSrc}
      alt={alt}
      width={800}
      height={600}
      className={`responsive-picture w-full h-auto ${className || ''}`}
      sizes={sizesAttribute}
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        aspectRatio: aspectRatio,
        display: 'block',
        objectFit: 'contain',
        overflow: 'hidden',
      }}
      // Use srcSet for responsive images
      {...(srcSetString && { srcSet: srcSetString })}
      // Ensure proper loading behavior
      loading={priority ? 'eager' : loading}
      // Support for cross-origin images
      crossOrigin="anonymous"
    />
  )
}
