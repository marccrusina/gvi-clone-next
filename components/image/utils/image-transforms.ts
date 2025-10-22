import { imageCrops } from '@/components/image/constants/image-crops'
import type {
  ImageDimensions,
  ImageRatio,
  SrcSetResult,
} from '@/components/image/types/image'

/**
 * Replaces crop template placeholders in image URLs
 * Based on getImageFromUrl from src/utils/url.ts
 */
export function transformImageUrl(
  url: string,
  crop: string,
  width: number | string,
  imageServerUrl: string,
): string {
  if (!url) {
    return ''
  }
  if (!crop || !width) {
    console.warn(
      'Missing crop or width parameters for image URL transformation',
    )
    return ''
  }

  try {
    // Handle different URL template patterns
    let transformedUrl = url

    // Replace {cropName} placeholder
    if (transformedUrl.includes('{cropName}')) {
      transformedUrl = transformedUrl.replace('{cropName}', crop)
    }

    // Replace {width} placeholder
    if (transformedUrl.includes('{width}')) {
      transformedUrl = transformedUrl.replace('{width}', String(width))
    }

    // If no placeholders found, try the original pattern
    if (transformedUrl === url && url.includes('/{cropName}/{width}')) {
      transformedUrl = url.replace('/{cropName}/{width}', `/${crop}/${width}`)
    }

    // Ensure imageServerUrl is properly formatted
    const cleanImageServerUrl = imageServerUrl.replace(/\/$/, '')
    const cleanTransformedUrl = transformedUrl.replace(/^\//, '')

    return `${cleanImageServerUrl}/${cleanTransformedUrl}`
  } catch (error) {
    console.error('Error transforming image URL:', error)
    return ''
  }
}

/**
 * Generates responsive srcset URLs for all breakpoints
 * Based on getSrcSetsImageFromUrl from src/utils/url.ts
 */
export function generateSrcSets(
  url: string,
  type: string,
  imageServerUrl: string,
): SrcSetResult {
  try {
    const bannerCropOption = imageCrops[type]

    if (!bannerCropOption) {
      console.warn(`Crop type '${type}' not found in imageCrops configuration`)
      return {}
    }

    const { mobile, deskL, deskS, tabletL, tabletP } = bannerCropOption

    const result: SrcSetResult = {}

    // Generate URLs for each breakpoint, only if crop and width are available
    if (mobile?.crop && mobile?.width) {
      result.mobile = transformImageUrl(
        url,
        mobile.crop,
        mobile.width,
        imageServerUrl,
      )
    }

    if (deskL?.crop && deskL?.width) {
      result.deskL = transformImageUrl(
        url,
        deskL.crop,
        deskL.width,
        imageServerUrl,
      )
    }

    if (deskS?.crop && deskS?.width) {
      result.deskS = transformImageUrl(
        url,
        deskS.crop,
        deskS.width,
        imageServerUrl,
      )
    }

    if (tabletL?.crop && tabletL?.width) {
      result.tabletL = transformImageUrl(
        url,
        tabletL.crop,
        tabletL.width,
        imageServerUrl,
      )
    }

    if (tabletP?.crop && tabletP?.width) {
      result.tabletP = transformImageUrl(
        url,
        tabletP.crop,
        tabletP.width,
        imageServerUrl,
      )
    }

    return result
  } catch (error) {
    console.error('Error generating srcsets:', error)
    return {}
  }
}

/**
 * Extracts aspect ratio from image URL pattern
 * Based on getImageRatioandWidthFromUrl from src/utils/image.ts
 */
export function extractImageRatio(url: string): ImageRatio | null {
  try {
    if (!url) {
      return null
    }

    const splittedUrl = url.split('/')
    const imageRatioValueIndex = splittedUrl.findIndex(
      (split) => split.indexOf('ratio') > -1,
    )

    if (imageRatioValueIndex === -1) {
      return null
    }

    const ratioString = splittedUrl[imageRatioValueIndex]
    if (!ratioString) {
      return null
    }

    const imageRatioValues = ratioString
      .split('ratio')[1]
      ?.split('x')
      ?.map((value) => {
        const parsed = parseFloat(value)
        return Number.isNaN(parsed) ? 0 : parsed
      })
      .filter((value) => value > 0)

    if (!imageRatioValues || imageRatioValues.length !== 2) {
      return null
    }

    const imageWidthValue = parseFloat(splittedUrl[imageRatioValueIndex + 1])

    if (Number.isNaN(imageWidthValue) || imageWidthValue <= 0) {
      return null
    }

    return {
      ratio: imageRatioValues,
      width: imageWidthValue,
    }
  } catch (error) {
    console.error('Error extracting image ratio:', error)
    return null
  }
}

/**
 * Calculates image height by width and ratio
 * Based on getImageHeightByWidthAndRatio from src/utils/image.ts
 */
export function getImageHeightByWidthAndRatio({
  width,
  ratios,
}: {
  width: number
  ratios: number[]
}): number | null {
  try {
    const rat1 = ratios[0]
    const rat2 = ratios[1]

    const ratio = width / rat1
    const calculated_height = ratio * rat2

    return calculated_height
  } catch {
    return null
  }
}

/**
 * Calculates image dimensions from URL
 * Based on getCoreMediaImageDimensions from src/utils/image.ts
 */
export function calculateImageDimensions(
  imageUrl: string,
): ImageDimensions | null {
  try {
    const imageDataFromImageUrl = extractImageRatio(imageUrl || '')
    const imageWidth = imageDataFromImageUrl?.width || null
    const imageHeight = getImageHeightByWidthAndRatio({
      ratios: imageDataFromImageUrl?.ratio || [0, 0],
      width: imageDataFromImageUrl?.width || 0,
    })
    return {
      width: imageWidth,
      height: imageHeight,
    }
  } catch {
    return null
  }
}

/**
 * Calculates resized height by resized width
 * Based on getImageResizedHeightByResizedWidth from src/utils/image.ts
 */
export function getImageResizedHeightByResizedWidth(
  resizedWith: number,
  originalWidth: number,
  originalHeight: number,
): number | null {
  try {
    const resizedHeight = (originalHeight / originalWidth) * resizedWith
    if (Number.isNaN(resizedHeight)) {
      return null
    }
    return resizedHeight
  } catch {
    return null
  }
}

/**
 * Generates a responsive srcset string for use in img srcset attribute
 */
export function generateSrcSetString(srcSets: SrcSetResult): string {
  const srcSetEntries: string[] = []

  if (srcSets.mobile) srcSetEntries.push(`${srcSets.mobile} 375w`)
  if (srcSets.tabletP) srcSetEntries.push(`${srcSets.tabletP} 601w`)
  if (srcSets.tabletL) srcSetEntries.push(`${srcSets.tabletL} 1024w`)
  if (srcSets.deskS) srcSetEntries.push(`${srcSets.deskS} 1280w`)
  if (srcSets.deskL) srcSetEntries.push(`${srcSets.deskL} 1440w`)

  return srcSetEntries.join(', ')
}

/**
 * Generates responsive sizes attribute for proper image selection
 * Updated to work properly with grid layouts instead of full viewport width
 */
export function generateSizesAttribute(): string {
  return '(max-width: 600px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, (max-width: 1439px) 25vw, 100vw'
}
