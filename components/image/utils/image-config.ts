/**
 * Configuration helper for environment-specific settings
 */

export interface Breakpoints {
  mobile: number
  tabletP: number
  tabletL: number
  deskS: number
  deskL: number
}

/**
 * Get responsive breakpoints configuration
 */
export function getBreakpoints(): Breakpoints {
  return {
    mobile: 600, // < 601px
    tabletP: 1023, // 601px - 1023px
    tabletL: 1279, // 1024px - 1279px
    deskS: 1439, // 1280px - 1439px
    deskL: 1440, // ≥ 1440px
  }
}

/**
 * Get image server URL based on hostname or environment
 */
export function getImageServerUrl(hostname?: string): string {
  // Default fallback URL
  const defaultUrl = process.env.IMAGE_SERVER_URL || 'https://media.example.com'

  if (!hostname) {
    return defaultUrl
  }

  // Environment-specific URL mapping
  const urlMap: Record<string, string> = {
    localhost: process.env.LOCAL_IMAGE_SERVER_URL || defaultUrl,
    'staging.example.com': process.env.STAGING_IMAGE_SERVER_URL || defaultUrl,
    'example.com': process.env.PRODUCTION_IMAGE_SERVER_URL || defaultUrl,
  }

  return urlMap[hostname] || defaultUrl
}

/**
 * Get responsive sizes attribute based on container width
 */
export function getResponsiveSizes(containerWidth?: number): string {
  if (!containerWidth) {
    return '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw'
  }

  if (containerWidth <= 600) {
    return '100vw'
  } else if (containerWidth <= 1023) {
    return '(max-width: 600px) 100vw, 100vw'
  } else if (containerWidth <= 1279) {
    return '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, 100vw'
  } else if (containerWidth <= 1439) {
    return '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, 100vw'
  } else {
    return '(max-width: 600px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1439px) 100vw, 100vw'
  }
}

/**
 * Check if URL is a template URL that needs transformation
 */
export function isTemplateUrl(url: string): boolean {
  return url.includes('{cropName}') && url.includes('{width}')
}

/**
 * Get default crop type for fallback
 */
export function getDefaultCropType(): string {
  return 'DEFAULT_VIEW'
}

/**
 * Validate crop type exists in configuration
 */
export function isValidCropType(cropType: string): boolean {
  const validCrops = [
    'DEFAULT_VIEW',
    'FULL_WIDTH_BANNER',
    'LANDSCAPE_BANNER',
    'TOP_PAGE_BANNER',
    'SQUAT_BANNER',
    'BOX_WITH_MARGIN_BANNER',
    'BOARD_WITH_FIELDS_2_ITEMS',
    'BOARD_WITH_FIELDS_3_ITEMS',
    'BOARD_WITH_FIELDS_4_ITEMS',
    'SQUARE_BOARDS_WITH_SPLIT',
    'SQUARE_BOARDS_WITHOUT_SPLIT',
    'COMBO_MINI_SLIDER_SMALL',
    'COMBO_MINI_SLIDER_BIG',
    'PLP_TWO_TILES',
    'CART_PROMO_BANNER',
    'AVATAR_MEGA_MENU',
    'BIG_MENU_BANNER',
    'QUERY_LIST',
    'FOOTER_NEWSLETTER_SIDE_BANNER',
    'FOOTER_NEWSLETTER_DRAWER',
  ]

  return validCrops.includes(cropType)
}
