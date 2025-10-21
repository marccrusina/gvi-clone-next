import { getImageUrlFromMedia, type ResponsiveImageProps } from '../types/image'
import { getDefaultCropType, isValidCropType } from '../utils/image-config'
import { generateSrcSets } from '../utils/image-transforms'

/**
 * React Server Component for responsive images using native img element
 * Primary image component for server-side rendering
 */
export default function ResponsiveImage({
  media,
  cropType,
  alt,
  imageServerUrl,
  priority = false,
  className,
}: ResponsiveImageProps) {
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
      />
    </picture>
  )
}

/**
 * Alternative implementation using native img element with picture tag
 * Use this when Next.js Image constraints don't fit your needs
 */
export function ResponsiveImageNative({
  media,
  cropType,
  alt,
  imageServerUrl,
  className,
}: Omit<ResponsiveImageProps, 'priority' | 'sizes'>) {
  const validCropType = isValidCropType(cropType)
    ? cropType
    : getDefaultCropType()
  const imageUrl = getImageUrlFromMedia(media)

  if (!imageUrl) {
    return null
  }

  const srcSets = generateSrcSets(imageUrl, validCropType, imageServerUrl)

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
      />
    </picture>
  )
}
