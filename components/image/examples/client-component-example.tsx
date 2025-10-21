'use client'

import { useEffect, useState } from 'react'
import ResponsiveImageLazy from '../components/responsive-image-lazy'
import ResponsivePicture from '../components/responsive-picture'
import {
  useImageSrcset,
  useImageSrcsetWithStates,
  useResponsiveImage,
} from '../hooks/use-image-srcset'
import type { Media } from '../types/image'

// Example client component with lazy loading
export function ProductTile({
  product,
}: {
  product: { media: Media; title: string }
}) {
  return (
    <div className="product-tile">
      <ResponsiveImageLazy
        media={product.media}
        cropType="PLP_TWO_TILES"
        alt={product.title}
        imageServerUrl={process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || ''}
        showSkeleton
        onLoad={() => console.log('Image loaded')}
        className="w-full h-auto rounded-lg"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
    </div>
  )
}

// Example using the hook directly
export function CustomImageComponent({
  media,
  cropType,
}: {
  media: Media
  cropType: string
}) {
  const { srcSets, dimensions, error } = useImageSrcset(
    media,
    cropType,
    process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || '',
  )

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    // biome-ignore lint/performance/noImgElement: <TODO: add explanation here>
    <img
      src={srcSets.mobile}
      srcSet={`${srcSets.mobile} 375w, ${srcSets.tabletP} 601w, ${srcSets.tabletL} 1024w, ${srcSets.deskS} 1280w, ${srcSets.deskL} 1440w`}
      sizes="(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw"
      alt="Product visual"
      width={dimensions?.width || 800}
      height={dimensions?.height || 600}
      className="w-full h-auto"
    />
  )
}

// Example with viewport detection
export function ViewportAwareImage({
  media,
  cropType,
}: {
  media: Media
  cropType: string
}) {
  const [currentWidth, setCurrentWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => setCurrentWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const { currentImage, isMobile, isTablet } = useResponsiveImage(
    media,
    cropType,
    process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || '',
    currentWidth,
  )

  return (
    <div className="viewport-aware-image">
      {/** biome-ignore lint/performance/noImgElement: <TODO: add explanation here> */}
      <img
        src={currentImage}
        alt="Product in current viewport"
        className="w-full h-auto"
      />
      <div className="mt-2 text-sm text-gray-600">
        Current viewport:{' '}
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} ({currentWidth}
        px)
      </div>
    </div>
  )
}

// Example with error handling and fallback
export function ImageWithFallback({
  media,
  cropType,
}: {
  media: Media
  cropType: string
}) {
  const { hasError, error } = useImageSrcsetWithStates(
    media,
    cropType,
    process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || '',
  )

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
        <div className="text-center">
          <div className="text-red-500 mb-2">Failed to load image</div>
          <div className="text-sm text-gray-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveImageLazy
      media={media}
      cropType={cropType}
      alt="Image with fallback"
      imageServerUrl={process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || ''}
      showSkeleton
    />
  )
}

// Example using native picture element
export function NativePictureExample({ media }: { media: Media }) {
  return (
    <ResponsivePicture
      media={media}
      cropType="FULL_WIDTH_BANNER"
      alt="Native picture element"
      imageServerUrl={process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || ''}
      loading="lazy"
      className="w-full h-auto"
    />
  )
}

// Example with aspect ratio preservation
export function AspectRatioImage({ media }: { media: Media }) {
  const { aspectRatio, srcSets } = useImageSrcset(
    media,
    'FULL_WIDTH_BANNER',
    process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || '',
  )

  return (
    <div className="relative w-full" style={{ aspectRatio }}>
      {/** biome-ignore lint/performance/noImgElement: <TODO: add explanation here> */}
      <img
        src={srcSets.mobile}
        srcSet={`${srcSets.mobile} 375w, ${srcSets.tabletP} 601w, ${srcSets.tabletL} 1024w, ${srcSets.deskS} 1280w, ${srcSets.deskL} 1440w`}
        sizes="(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw"
        alt="Decorative aspect-ratio example"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
