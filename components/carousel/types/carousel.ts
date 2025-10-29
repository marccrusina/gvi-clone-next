// Base carousel item
export interface ApiCarouselItem {
  // Core identifiers
  id: string
  name?: string
  title?: string
  type:
    | 'CMExternalChannel'
    | 'CMSPage'
    | 'LXTeaser'
    | 'CMCollection'
    | 'ProductPage'

  // Navigation data
  formattedUrl?: string
  navigationPath?: Array<{ segment: string }>
  externalId?: string

  // Media content
  media?: Array<{
    type: string
    uriTemplate?: string
  }>

  // Teaser-specific fields (for LXTeaser items)
  teaserTitle1?: string
  teaserTitle2?: string
  teaserTitle3?: string
  teaserTitle4?: string
  teaserText1?: string
  teaserText2?: string
  teaserIcon?: string
  teaserPreTitle?: string

  // Collection-specific fields
  collectionTitle?: string
  teasableItems?: ApiCarouselItem[]

  // CTA buttons in carousel items
  teaserLXCallToActionSettings?: Array<{
    callToActionEnabled: boolean
    callToActionText: string
    style: string
    target: {
      type: string
      formattedUrl: string
      title: string
      openInNewWindow?: boolean
    }
  }>

  // Additional fields for various content types
  gridPositioning?: number
}

// CMS API placement structure
export interface ApiCarouselPlacement {
  name: string
  viewtype: string
  placementReflect: boolean
  marginLateral: boolean
  marginVertical: string
  placementCenter: boolean
  backgroundColor: string
  clusterTile: boolean
  placementAnimation: string
  items: ApiCarouselItem[]
}

export interface GlideConfig {
  // Basic Configuration
  type?: 'slider' | 'carousel'
  perView?: number
  gap?: number
  startAt?: number

  // Navigation
  keyboard?: boolean
  mousewheel?: boolean

  // Touch/Swipe
  swipeThreshold?: number | false
  dragThreshold?: number | false
  touchRatio?: number

  // Animation
  animationDuration?: number
  animationTimingFunc?: string

  // Autoplay
  autoplay?: number | false
  hoverpause?: boolean

  // Direction & Alignment
  direction?: 'ltr' | 'rtl'

  // Responsive breakpoints
  breakpoints?: Record<number, Partial<GlideConfig>>

  // Processing results
  items?: ProcessedCarouselItem[]
}

// Responsive configuration helper
export interface ResponsiveConfig {
  mobile: {
    perView: number
    gap: number
  }
  tablet: {
    perView: number
    gap: number
  }
  desktop: {
    perView: number
    gap: number
  }
}

export interface GlideCarouselProps extends GlideConfig {
  className?: string
  renderItem?: (item: ProcessedCarouselItem, index: number) => React.ReactNode
}

// Processed item after transformation
export interface ProcessedCarouselItem {
  id: string
  title?: string
  subtitle?: string
  description?: string
  imageUrl?: string
  link?: string
  linkText?: string
  external?: boolean
  type: 'brand' | 'teaser' | 'product' | 'collection'

  // CTA button if present
  cta?: {
    text: string
    link: string
    variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
    external: boolean
  }

  // Layout hints
  featured?: boolean
  gridPosition?: number
}

// Internal configuration for determining Glide settings
export interface CarouselConfig {
  // Derived from placement data
  viewType: 'brands' | 'teasers' | 'products' | 'mixed'
  title?: string
  itemCount: number

  // Responsive behavior for Glide
  mobile: {
    perView: number
    gap: number
  }
  tablet: {
    perView: number
    gap: number
  }
  desktop: {
    perView: number
    gap: number
  }

  // UI features
  keyboard: boolean
  autoplay: number | false

  // Layout
  type: 'slider' | 'carousel'
  direction: 'ltr' | 'rtl'
}
