/**
 * Universal Carousel Transformer for CMS API
 * Transforms various CMS API carousel structures into standardized Glide props
 */

import type {
  ApiCarouselItem,
  ApiCarouselPlacement,
  CarouselConfig,
  GlideConfig,
  ProcessedCarouselItem,
} from '@/types/carousel'

/**
 * Get all items, flattening any nested teasableItems
 */
function getAllItems(items: ApiCarouselItem[]): ApiCarouselItem[] {
  const allItems: ApiCarouselItem[] = []

  for (const item of items) {
    if (item.teasableItems && item.teasableItems.length > 0) {
      // This is a collection, add its teasable items
      allItems.push(...item.teasableItems)
    } else {
      // Regular item
      allItems.push(item)
    }
  }

  return allItems
}

/**
 * Extract carousel title from placement data
 */
function extractTitle(apiData: ApiCarouselPlacement): string | undefined {
  const collectionItem = apiData.items.find(
    (item) => item.type === 'CMCollection',
  )
  return collectionItem?.collectionTitle || collectionItem?.title
}

/**
 * Extract item title with fallbacks
 */
function extractItemTitle(item: ApiCarouselItem): string | undefined {
  return item.title || item.teaserTitle1 || item.teaserTitle2 || item.name
}

/**
 * Extract item subtitle
 */
function extractItemSubtitle(item: ApiCarouselItem): string | undefined {
  return (
    item.teaserPreTitle ||
    (item.teaserTitle1 && item.teaserTitle2 ? item.teaserTitle2 : undefined)
  )
}

/**
 * Extract item description
 */
function extractItemDescription(item: ApiCarouselItem): string | undefined {
  return item.teaserText1 || item.teaserText2
}

/**
 * Extract image URL from media array
 */
function extractImageUrl(item: ApiCarouselItem): string | undefined {
  if (!item.media || item.media.length === 0) return undefined

  const image = item.media[0]
  return image.uriTemplate
    ?.replace('{cropName}', 'original')
    .replace('{width}', '400')
}

/**
 * Extract navigation link
 */
function extractLink(item: ApiCarouselItem): string | undefined {
  return (
    item.formattedUrl ||
    item.navigationPath?.map((p) => p.segment).join('/') ||
    '#'
  )
}

/**
 * Check if link is external
 */
function isExternalLink(item: ApiCarouselItem): boolean {
  const url = item.formattedUrl || ''
  return url.startsWith('http') || item.type === 'CMExternalChannel'
}

/**
 * Map API item type to standardized type
 */
function mapItemType(apiType: string): ProcessedCarouselItem['type'] {
  switch (apiType) {
    case 'CMExternalChannel':
      return 'brand'
    case 'LXTeaser':
      return 'teaser'
    case 'ProductPage':
      return 'product'
    case 'CMCollection':
      return 'collection'
    default:
      return 'teaser'
  }
}

/**
 * Map CMS CTA style to button variant
 */
function mapCTAStyle(
  style: string,
): 'primary' | 'secondary' | 'tertiary' | 'quaternary' {
  if (style.includes('primary')) return 'primary'
  if (style.includes('secondary')) return 'secondary'
  if (style.includes('tertiary')) return 'tertiary'
  if (style.includes('quaternary')) return 'quaternary'
  return 'primary'
}

/**
 * Extract CTA button from item
 */
function extractCTA(item: ApiCarouselItem) {
  const ctaSettings = item.teaserLXCallToActionSettings?.[0]
  if (!ctaSettings || !ctaSettings.callToActionEnabled) return undefined

  return {
    text: ctaSettings.callToActionText,
    link: ctaSettings.target?.formattedUrl || '#',
    variant: mapCTAStyle(ctaSettings.style),
    external: Boolean(ctaSettings.target?.openInNewWindow),
  }
}

/**
 * Process carousel items into standardized format
 */
function processCarouselItems(
  apiItems: ApiCarouselItem[],
): ProcessedCarouselItem[] {
  const allItems = getAllItems(apiItems)

  return allItems.map((item, index) => {
    const processedItem: ProcessedCarouselItem = {
      id: item.id,
      title: extractItemTitle(item),
      subtitle: extractItemSubtitle(item),
      description: extractItemDescription(item),
      imageUrl: extractImageUrl(item),
      link: extractLink(item),
      external: isExternalLink(item),
      type: mapItemType(item.type),
      gridPosition: item.gridPositioning || index + 1,
    }

    // Extract CTA if present
    const cta = extractCTA(item)
    if (cta) {
      processedItem.cta = cta
    }

    return processedItem
  })
}

/**
 * Determine carousel configuration from API data
 */
function determineCarouselConfig(
  apiData: ApiCarouselPlacement,
): CarouselConfig {
  const items = getAllItems(apiData.items)
  const itemCount = items.length

  // Determine view type based on item types
  const itemTypes = items.map((item) => item.type)
  let viewType: CarouselConfig['viewType'] = 'mixed'

  if (itemTypes.every((type) => type === 'CMExternalChannel')) {
    viewType = 'brands'
  } else if (itemTypes.every((type) => type === 'LXTeaser')) {
    viewType = 'teasers'
  } else if (itemTypes.every((type) => type === 'ProductPage')) {
    viewType = 'products'
  }

  // Configure responsive behavior based on view type and item count
  let config: CarouselConfig

  switch (viewType) {
    case 'brands':
      config = {
        viewType,
        title: extractTitle(apiData),
        itemCount,
        mobile: { perView: 2, gap: 16 },
        tablet: { perView: 4, gap: 20 },
        desktop: { perView: Math.min(6, itemCount), gap: 24 },
        keyboard: true,
        autoplay: false,
        type: 'carousel' as const,
        direction: 'ltr' as const,
      }
      break

    case 'teasers':
      config = {
        viewType,
        title: extractTitle(apiData),
        itemCount,
        mobile: { perView: 1, gap: 16 },
        tablet: { perView: 2, gap: 20 },
        desktop: { perView: Math.min(3, itemCount), gap: 24 },
        keyboard: itemCount > 3,
        autoplay: itemCount > 1 ? 3000 : false,
        type: 'carousel' as const,
        direction: 'ltr' as const,
      }
      break

    case 'products':
      config = {
        viewType,
        title: extractTitle(apiData),
        itemCount,
        mobile: { perView: 1.2, gap: 12 },
        tablet: { perView: 3, gap: 16 },
        desktop: { perView: Math.min(4, itemCount), gap: 20 },
        keyboard: itemCount > 4,
        autoplay: false,
        type: 'carousel' as const,
        direction: 'ltr' as const,
      }
      break

    default:
      config = {
        viewType,
        title: extractTitle(apiData),
        itemCount,
        mobile: { perView: 1, gap: 16 },
        tablet: { perView: 2, gap: 20 },
        desktop: { perView: Math.min(3, itemCount), gap: 24 },
        keyboard: itemCount > 3,
        autoplay: false,
        type: 'carousel' as const,
        direction: 'ltr' as const,
      }
  }

  return config
}

/**
 * Transform CMS API placement into Glide carousel props
 */
export function transformCarousel(apiData: ApiCarouselPlacement): GlideConfig {
  // Determine carousel configuration based on API data
  const config = determineCarouselConfig(apiData)

  // Process items
  const processedItems = processCarouselItems(apiData.items)

  // Generate Glide props based on configuration
  const glideProps: GlideConfig = {
    // Basic configuration
    type: config.type,
    perView: config.desktop.perView,
    gap: config.desktop.gap,

    // Animation
    animationDuration: 400,
    animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',

    // Touch interaction
    dragThreshold: 120,
    swipeThreshold: 80,

    // Responsive breakpoints for Glide
    breakpoints: {
      320: {
        perView: config.mobile.perView,
        gap: config.mobile.gap,
      },
      768: {
        perView: config.tablet.perView,
        gap: config.tablet.gap,
      },
      1024: {
        perView: config.desktop.perView,
        gap: config.desktop.gap,
      },
    },

    // Autoplay for promotional content (Glide format: number or false)
    autoplay: config.autoplay ? 4000 : false,
    hoverpause: true,

    // Keyboard navigation
    keyboard: config.keyboard,

    // Items and metadata
    items: processedItems,
  }

  return glideProps
}

/**
 * Transform multiple carousel placements
 */
export const transformMultipleCarousels = (
  apiPlacements: ApiCarouselPlacement[],
): GlideConfig[] => {
  return apiPlacements.map((placement) => transformCarousel(placement))
}

/**
 * Transform with custom overrides
 */
export const transformCarouselWithDefaults = (
  apiData: ApiCarouselPlacement,
  defaults: Partial<GlideConfig> = {},
): GlideConfig => {
  const transformed = transformCarousel(apiData)
  return { ...transformed, ...defaults }
}
