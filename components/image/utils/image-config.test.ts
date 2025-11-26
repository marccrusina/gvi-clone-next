import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getBreakpoints,
  getDefaultCropType,
  getImageServerUrl,
  getResponsiveSizes,
  isTemplateUrl,
  isValidCropType,
} from './image-config'

describe('image-config', () => {
  describe('getBreakpoints', () => {
    it('should return correct breakpoint values', () => {
      const breakpoints = getBreakpoints()

      expect(breakpoints).toEqual({
        mobile: 600,
        tabletP: 1023,
        tabletL: 1279,
        deskS: 1439,
        deskL: 1440,
      })
    })

    it('should return breakpoints with correct types', () => {
      const breakpoints = getBreakpoints()

      expect(typeof breakpoints.mobile).toBe('number')
      expect(typeof breakpoints.tabletP).toBe('number')
      expect(typeof breakpoints.tabletL).toBe('number')
      expect(typeof breakpoints.deskS).toBe('number')
      expect(typeof breakpoints.deskL).toBe('number')
    })

    it('should return breakpoints in ascending order', () => {
      const breakpoints = getBreakpoints()

      expect(breakpoints.mobile).toBeLessThan(breakpoints.tabletP)
      expect(breakpoints.tabletP).toBeLessThan(breakpoints.tabletL)
      expect(breakpoints.tabletL).toBeLessThan(breakpoints.deskS)
      expect(breakpoints.deskS).toBeLessThan(breakpoints.deskL)
    })

    it('should return consistent values across multiple calls', () => {
      const breakpoints1 = getBreakpoints()
      const breakpoints2 = getBreakpoints()

      expect(breakpoints1).toEqual(breakpoints2)
    })

    it('should have all required breakpoint properties', () => {
      const breakpoints = getBreakpoints()

      expect(breakpoints).toHaveProperty('mobile')
      expect(breakpoints).toHaveProperty('tabletP')
      expect(breakpoints).toHaveProperty('tabletL')
      expect(breakpoints).toHaveProperty('deskS')
      expect(breakpoints).toHaveProperty('deskL')
    })
  })

  describe('getImageServerUrl', () => {
    const originalEnv = process.env

    beforeEach(() => {
      vi.resetModules()
      process.env = { ...originalEnv }
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it('should return default URL when no hostname provided', () => {
      process.env.IMAGE_SERVER_URL = 'https://default.example.com'
      const url = getImageServerUrl()

      expect(url).toBe('https://default.example.com')
    })

    it('should return fallback URL when IMAGE_SERVER_URL not set', () => {
      delete process.env.IMAGE_SERVER_URL
      const url = getImageServerUrl()

      expect(url).toBe('https://media.example.com')
    })

    it('should return localhost URL for localhost hostname', () => {
      process.env.LOCAL_IMAGE_SERVER_URL = 'https://local.example.com'
      const url = getImageServerUrl('localhost')

      expect(url).toBe('https://local.example.com')
    })

    it('should return staging URL for staging hostname', () => {
      process.env.STAGING_IMAGE_SERVER_URL = 'https://staging.example.com'
      const url = getImageServerUrl('staging.example.com')

      expect(url).toBe('https://staging.example.com')
    })

    it('should return production URL for production hostname', () => {
      process.env.PRODUCTION_IMAGE_SERVER_URL = 'https://prod.example.com'
      const url = getImageServerUrl('example.com')

      expect(url).toBe('https://prod.example.com')
    })

    it('should return default URL for unknown hostname', () => {
      process.env.IMAGE_SERVER_URL = 'https://default.example.com'
      const url = getImageServerUrl('unknown.example.com')

      expect(url).toBe('https://default.example.com')
    })
  })

  describe('getResponsiveSizes', () => {
    it('should return full responsive sizes when no container width provided', () => {
      const sizes = getResponsiveSizes()

      expect(sizes).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw',
      )
    })

    it('should return 100vw for mobile width (600px or less)', () => {
      const sizes = getResponsiveSizes(600)

      expect(sizes).toBe('100vw')
    })

    it('should return 100vw for very small width', () => {
      const sizes = getResponsiveSizes(320)

      expect(sizes).toBe('100vw')
    })

    it('should return progressive sizes for tablet portrait width (601-1023px)', () => {
      const sizes = getResponsiveSizes(800)

      expect(sizes).toBe('(max-width: 600px) 100vw, 100vw')
    })

    it('should return progressive sizes for tablet landscape width (1024-1279px)', () => {
      const sizes = getResponsiveSizes(1200)

      expect(sizes).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, 100vw',
      )
    })

    it('should return progressive sizes for small desktop width (1280-1439px)', () => {
      const sizes = getResponsiveSizes(1300)

      expect(sizes).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, 100vw',
      )
    })

    it('should return full progressive sizes for large desktop width (1440px+)', () => {
      const sizes = getResponsiveSizes(1920)

      expect(sizes).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw',
      )
    })

    it('should handle exact breakpoint values correctly', () => {
      expect(getResponsiveSizes(600)).toBe('100vw')
      expect(getResponsiveSizes(1023)).toBe('(max-width: 600px) 100vw, 100vw')
      expect(getResponsiveSizes(1279)).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, 100vw',
      )
      expect(getResponsiveSizes(1439)).toBe(
        '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, 100vw',
      )
    })
  })

  describe('isTemplateUrl', () => {
    it('should return true for URL with both {cropName} and {width} placeholders', () => {
      const url = 'https://example.com/images/{cropName}/{width}/image.jpg'

      expect(isTemplateUrl(url)).toBe(true)
    })

    it('should return false for URL with only {cropName} placeholder', () => {
      const url = 'https://example.com/images/{cropName}/image.jpg'

      expect(isTemplateUrl(url)).toBe(false)
    })

    it('should return false for URL with only {width} placeholder', () => {
      const url = 'https://example.com/images/{width}/image.jpg'

      expect(isTemplateUrl(url)).toBe(false)
    })

    it('should return false for URL without any placeholders', () => {
      const url = 'https://example.com/images/banner/1200/image.jpg'

      expect(isTemplateUrl(url)).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isTemplateUrl('')).toBe(false)
    })

    it('should handle URLs with placeholders in different order', () => {
      const url = 'https://example.com/images/{width}/{cropName}/image.jpg'

      expect(isTemplateUrl(url)).toBe(true)
    })

    it('should handle URLs with multiple occurrences of placeholders', () => {
      const url =
        'https://example.com/{cropName}/images/{width}/{cropName}/image.jpg'

      expect(isTemplateUrl(url)).toBe(true)
    })
  })

  describe('getDefaultCropType', () => {
    it('should return DEFAULT_VIEW as default crop type', () => {
      expect(getDefaultCropType()).toBe('DEFAULT_VIEW')
    })

    it('should return consistent value across multiple calls', () => {
      const crop1 = getDefaultCropType()
      const crop2 = getDefaultCropType()

      expect(crop1).toBe(crop2)
    })

    it('should return a non-empty string', () => {
      const cropType = getDefaultCropType()

      expect(cropType).toBeTruthy()
      expect(typeof cropType).toBe('string')
      expect(cropType.length).toBeGreaterThan(0)
    })
  })

  describe('isValidCropType', () => {
    it('should return true for DEFAULT_VIEW', () => {
      expect(isValidCropType('DEFAULT_VIEW')).toBe(true)
    })

    it('should return true for FULL_WIDTH_BANNER', () => {
      expect(isValidCropType('FULL_WIDTH_BANNER')).toBe(true)
    })

    it('should return true for LANDSCAPE_BANNER', () => {
      expect(isValidCropType('LANDSCAPE_BANNER')).toBe(true)
    })

    it('should return true for TOP_PAGE_BANNER', () => {
      expect(isValidCropType('TOP_PAGE_BANNER')).toBe(true)
    })

    it('should return true for SQUAT_BANNER', () => {
      expect(isValidCropType('SQUAT_BANNER')).toBe(true)
    })

    it('should return true for BOX_WITH_MARGIN_BANNER', () => {
      expect(isValidCropType('BOX_WITH_MARGIN_BANNER')).toBe(true)
    })

    it('should return true for BOARD_WITH_FIELDS_2_ITEMS', () => {
      expect(isValidCropType('BOARD_WITH_FIELDS_2_ITEMS')).toBe(true)
    })

    it('should return true for BOARD_WITH_FIELDS_3_ITEMS', () => {
      expect(isValidCropType('BOARD_WITH_FIELDS_3_ITEMS')).toBe(true)
    })

    it('should return true for BOARD_WITH_FIELDS_4_ITEMS', () => {
      expect(isValidCropType('BOARD_WITH_FIELDS_4_ITEMS')).toBe(true)
    })

    it('should return true for SQUARE_BOARDS_WITH_SPLIT', () => {
      expect(isValidCropType('SQUARE_BOARDS_WITH_SPLIT')).toBe(true)
    })

    it('should return true for SQUARE_BOARDS_WITHOUT_SPLIT', () => {
      expect(isValidCropType('SQUARE_BOARDS_WITHOUT_SPLIT')).toBe(true)
    })

    it('should return true for COMBO_MINI_SLIDER_SMALL', () => {
      expect(isValidCropType('COMBO_MINI_SLIDER_SMALL')).toBe(true)
    })

    it('should return true for COMBO_MINI_SLIDER_BIG', () => {
      expect(isValidCropType('COMBO_MINI_SLIDER_BIG')).toBe(true)
    })

    it('should return true for PLP_TWO_TILES', () => {
      expect(isValidCropType('PLP_TWO_TILES')).toBe(true)
    })

    it('should return true for CART_PROMO_BANNER', () => {
      expect(isValidCropType('CART_PROMO_BANNER')).toBe(true)
    })

    it('should return true for AVATAR_MEGA_MENU', () => {
      expect(isValidCropType('AVATAR_MEGA_MENU')).toBe(true)
    })

    it('should return true for BIG_MENU_BANNER', () => {
      expect(isValidCropType('BIG_MENU_BANNER')).toBe(true)
    })

    it('should return true for QUERY_LIST', () => {
      expect(isValidCropType('QUERY_LIST')).toBe(true)
    })

    it('should return true for FOOTER_NEWSLETTER_SIDE_BANNER', () => {
      expect(isValidCropType('FOOTER_NEWSLETTER_SIDE_BANNER')).toBe(true)
    })

    it('should return true for FOOTER_NEWSLETTER_DRAWER', () => {
      expect(isValidCropType('FOOTER_NEWSLETTER_DRAWER')).toBe(true)
    })

    it('should return false for invalid crop type', () => {
      expect(isValidCropType('INVALID_CROP')).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isValidCropType('')).toBe(false)
    })

    it('should return false for lowercase valid crop type', () => {
      expect(isValidCropType('default_view')).toBe(false)
    })

    it('should return false for partial crop type name', () => {
      expect(isValidCropType('DEFAULT')).toBe(false)
    })

    it('should be case-sensitive', () => {
      expect(isValidCropType('Default_View')).toBe(false)
      expect(isValidCropType('default_VIEW')).toBe(false)
    })
  })
})
