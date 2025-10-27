import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  calculateImageDimensions,
  extractImageRatio,
  generateSizesAttribute,
  generateSrcSetString,
  generateSrcSets,
  getImageHeightByWidthAndRatio,
  getImageResizedHeightByResizedWidth,
  transformImageUrl,
} from './image-transforms'

describe('image-transforms', () => {
  const imageServerUrl = 'https://media.grandvision.it'
  const mockUrl = '/content/{cropName}/{width}/banner.jpg'

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset console.warn and console.error mocks
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('transformImageUrl', () => {
    it('should transform URL with {cropName} and {width} placeholders', () => {
      const result = transformImageUrl(
        mockUrl,
        'landscape_ratio64x29',
        2880,
        imageServerUrl,
      )

      expect(result).toBe(
        'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg',
      )
    })

    it('should handle numeric width as string', () => {
      const result = transformImageUrl(
        mockUrl,
        'portrait_ratio75x104',
        '675',
        imageServerUrl,
      )

      expect(result).toBe(
        'https://media.grandvision.it/content/portrait_ratio75x104/675/banner.jpg',
      )
    })

    it('should handle URLs without placeholders by replacing pattern', () => {
      const urlWithPattern = '/content/{cropName}/{width}/test.jpg'
      const result = transformImageUrl(
        urlWithPattern,
        'landscape_ratio1x1',
        1440,
        imageServerUrl,
      )

      expect(result).toBe(
        'https://media.grandvision.it/content/landscape_ratio1x1/1440/test.jpg',
      )
    })

    it('should properly format imageServerUrl with trailing slash', () => {
      const result = transformImageUrl(
        mockUrl,
        'landscape_ratio64x29',
        2880,
        'https://media.grandvision.it/',
      )

      expect(result).toBe(
        'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg',
      )
    })

    it('should return empty string for empty URL', () => {
      const result = transformImageUrl(
        '',
        'landscape_ratio64x29',
        2880,
        imageServerUrl,
      )

      expect(result).toBe('')
    })

    it('should warn and return empty string when crop is missing', () => {
      const result = transformImageUrl(mockUrl, '', 2880, imageServerUrl)

      expect(result).toBe('')
      expect(console.warn).toHaveBeenCalledWith(
        'Missing crop or width parameters for image URL transformation',
      )
    })

    it('should warn and return empty string when width is missing', () => {
      const result = transformImageUrl(
        mockUrl,
        'landscape_ratio64x29',
        0,
        imageServerUrl,
      )

      expect(result).toBe('')
      expect(console.warn).toHaveBeenCalled()
    })

    it('should handle errors gracefully', () => {
      // Test with null values to force error
      const result = transformImageUrl(
        // biome-ignore lint/suspicious/noExplicitAny: Testing null input for error handling
        null as any,
        'landscape_ratio64x29',
        2880,
        imageServerUrl,
      )

      expect(result).toBe('')
    })
  })

  describe('generateSrcSets', () => {
    it('should generate srcsets for FULL_WIDTH_BANNER', () => {
      const result = generateSrcSets(
        mockUrl,
        'FULL_WIDTH_BANNER',
        imageServerUrl,
      )

      expect(result).toEqual({
        mobile:
          'https://media.grandvision.it/content/portrait_ratio75x104/675/banner.jpg',
        tabletP:
          'https://media.grandvision.it/content/landscape_ratio96x65/1382/banner.jpg',
        tabletL:
          'https://media.grandvision.it/content/landscape_ratio64x29/1843/banner.jpg',
        deskS:
          'https://media.grandvision.it/content/landscape_ratio64x29/2560/banner.jpg',
        deskL:
          'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg',
      })
    })

    it('should generate srcsets for LANDSCAPE_BANNER', () => {
      const result = generateSrcSets(
        mockUrl,
        'LANDSCAPE_BANNER',
        imageServerUrl,
      )

      expect(result.mobile).toContain('landscape_ratio375x284/675')
      expect(result.deskL).toContain('landscape_ratio40x13/2880')
    })

    it('should generate srcsets for SQUARE_BOARDS_WITH_SPLIT', () => {
      const result = generateSrcSets(
        mockUrl,
        'SQUARE_BOARDS_WITH_SPLIT',
        imageServerUrl,
      )

      expect(result.mobile).toContain('landscape_ratio1x1/675')
      expect(result.deskL).toContain('landscape_ratio1x1/1280')
    })

    it('should warn for invalid crop type', () => {
      const result = generateSrcSets(mockUrl, 'INVALID_TYPE', imageServerUrl)

      expect(result).toEqual({})
      expect(console.warn).toHaveBeenCalledWith(
        "Crop type 'INVALID_TYPE' not found in imageCrops configuration",
      )
    })

    it('should skip breakpoints with missing crop or width', () => {
      // FOOTER_NEWSLETTER_SIDE_BANNER doesn't have deskL or tabletL
      const result = generateSrcSets(
        mockUrl,
        'FOOTER_NEWSLETTER_SIDE_BANNER',
        imageServerUrl,
      )

      expect(result.deskL).toBeUndefined()
      expect(result.tabletL).toBeUndefined()
      expect(result.mobile).toBeDefined()
    })

    it('should handle errors gracefully', () => {
      const result = generateSrcSets(
        // biome-ignore lint/suspicious/noExplicitAny: Testing null input for error handling
        null as any,
        'FULL_WIDTH_BANNER',
        imageServerUrl,
      )

      // Should return empty srcsets for each breakpoint
      expect(Object.keys(result).length).toBeGreaterThan(0)
      expect(result.mobile).toBe('')
    })
  })

  describe('extractImageRatio', () => {
    it('should extract ratio from landscape_ratio64x29 URL', () => {
      const url =
        'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg'
      const result = extractImageRatio(url)

      expect(result).toEqual({
        ratio: [64, 29],
        width: 2880,
      })
    })

    it('should extract ratio from portrait_ratio75x104 URL', () => {
      const url =
        'https://media.grandvision.it/content/portrait_ratio75x104/675/test.jpg'
      const result = extractImageRatio(url)

      expect(result).toEqual({
        ratio: [75, 104],
        width: 675,
      })
    })

    it('should extract ratio from landscape_ratio1x1 URL', () => {
      const url =
        'https://media.grandvision.it/content/landscape_ratio1x1/1440/square.jpg'
      const result = extractImageRatio(url)

      expect(result).toEqual({
        ratio: [1, 1],
        width: 1440,
      })
    })

    it('should return null for empty URL', () => {
      const result = extractImageRatio('')

      expect(result).toBeNull()
    })

    it('should return null for URL without ratio', () => {
      const url = 'https://media.grandvision.it/content/nocrop/1440/image.jpg'
      const result = extractImageRatio(url)

      expect(result).toBeNull()
    })

    it('should return null for invalid ratio format', () => {
      const url =
        'https://media.grandvision.it/content/ratio_invalid/1440/image.jpg'
      const result = extractImageRatio(url)

      expect(result).toBeNull()
    })

    it('should return null for invalid width', () => {
      const url =
        'https://media.grandvision.it/content/landscape_ratio64x29/invalid/image.jpg'
      const result = extractImageRatio(url)

      expect(result).toBeNull()
    })

    it('should handle errors gracefully', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Testing null input for error handling
      const result = extractImageRatio(null as any)

      expect(result).toBeNull()
    })
  })

  describe('getImageHeightByWidthAndRatio', () => {
    it('should calculate height for 64:29 ratio and width 2880', () => {
      const result = getImageHeightByWidthAndRatio({
        width: 2880,
        ratios: [64, 29],
      })

      expect(result).toBe(1305) // 2880 / 64 * 29 = 1305
    })

    it('should calculate height for 1:1 ratio and width 1440', () => {
      const result = getImageHeightByWidthAndRatio({
        width: 1440,
        ratios: [1, 1],
      })

      expect(result).toBe(1440)
    })

    it('should calculate height for 75:104 ratio and width 675', () => {
      const result = getImageHeightByWidthAndRatio({
        width: 675,
        ratios: [75, 104],
      })

      expect(result).toBe(936) // 675 / 75 * 104 = 936
    })

    it('should return NaN for empty ratios array', () => {
      const result = getImageHeightByWidthAndRatio({
        width: 1440,
        ratios: [],
      })

      expect(Number.isNaN(result)).toBe(true)
    })

    it('should return NaN for invalid input', () => {
      const result = getImageHeightByWidthAndRatio({
        width: NaN,
        ratios: [64, 29],
      })

      expect(Number.isNaN(result)).toBe(true)
    })
  })

  describe('calculateImageDimensions', () => {
    it('should calculate dimensions from URL with ratio64x29', () => {
      const url =
        'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg'
      const result = calculateImageDimensions(url)

      expect(result).toEqual({
        width: 2880,
        height: 1305,
      })
    })

    it('should calculate dimensions from URL with ratio1x1', () => {
      const url =
        'https://media.grandvision.it/content/landscape_ratio1x1/1440/square.jpg'
      const result = calculateImageDimensions(url)

      expect(result).toEqual({
        width: 1440,
        height: 1440,
      })
    })

    it('should return null width and NaN height for URL without ratio', () => {
      const url = 'https://media.grandvision.it/content/nocrop/1440/image.jpg'
      const result = calculateImageDimensions(url)

      expect(result?.width).toBeNull()
      expect(Number.isNaN(result?.height)).toBe(true)
    })

    it('should return null width and NaN height for invalid URL', () => {
      const result = calculateImageDimensions('')

      expect(result?.width).toBeNull()
      expect(Number.isNaN(result?.height)).toBe(true)
    })
  })

  describe('getImageResizedHeightByResizedWidth', () => {
    it('should calculate resized height maintaining aspect ratio', () => {
      const result = getImageResizedHeightByResizedWidth(1440, 2880, 1305)

      expect(result).toBe(652.5) // (1305 / 2880) * 1440 = 652.5
    })

    it('should handle square aspect ratio', () => {
      const result = getImageResizedHeightByResizedWidth(500, 1000, 1000)

      expect(result).toBe(500)
    })

    it('should return Infinity for zero original width', () => {
      const result = getImageResizedHeightByResizedWidth(1440, 0, 1305)

      expect(result).toBe(Infinity)
    })

    it('should return null for NaN result', () => {
      const result = getImageResizedHeightByResizedWidth(NaN, 2880, 1305)

      expect(result).toBeNull()
    })

    it('should return Infinity for null original width', () => {
      const result = getImageResizedHeightByResizedWidth(
        1440,
        // biome-ignore lint/suspicious/noExplicitAny: Testing null input for error handling
        null as any,
        1305,
      )

      expect(result).toBe(Infinity)
    })
  })

  describe('generateSrcSetString', () => {
    it('should generate srcset string from SrcSetResult', () => {
      const srcSets = {
        mobile: 'https://media.grandvision.it/image-675.jpg',
        tabletP: 'https://media.grandvision.it/image-1382.jpg',
        tabletL: 'https://media.grandvision.it/image-1843.jpg',
        deskS: 'https://media.grandvision.it/image-2560.jpg',
        deskL: 'https://media.grandvision.it/image-2880.jpg',
      }

      const result = generateSrcSetString(srcSets)

      expect(result).toBe(
        'https://media.grandvision.it/image-675.jpg 375w, ' +
          'https://media.grandvision.it/image-1382.jpg 601w, ' +
          'https://media.grandvision.it/image-1843.jpg 1024w, ' +
          'https://media.grandvision.it/image-2560.jpg 1280w, ' +
          'https://media.grandvision.it/image-2880.jpg 1440w',
      )
    })

    it('should handle partial srcsets', () => {
      const srcSets = {
        mobile: 'https://media.grandvision.it/image-675.jpg',
        deskL: 'https://media.grandvision.it/image-2880.jpg',
      }

      const result = generateSrcSetString(srcSets)

      expect(result).toBe(
        'https://media.grandvision.it/image-675.jpg 375w, ' +
          'https://media.grandvision.it/image-2880.jpg 1440w',
      )
    })

    it('should handle empty srcsets', () => {
      const result = generateSrcSetString({})

      expect(result).toBe('')
    })
  })

  describe('generateSizesAttribute', () => {
    it('should generate sizes attribute string', () => {
      const result = generateSizesAttribute()

      expect(result).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, (max-width: 1439px) 25vw, 100vw',
      )
    })

    it('should always return the same value', () => {
      const result1 = generateSizesAttribute()
      const result2 = generateSizesAttribute()

      expect(result1).toBe(result2)
    })
  })
})
