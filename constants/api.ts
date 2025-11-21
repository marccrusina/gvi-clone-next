export const API_ENDPOINTS = {
  CONTENT: '/api/proxy-gv?type=content',
  HEADER: '/api/proxy-gv?type=header',
  FOOTER: '/api/proxy-gv?type=footer',
} as const

export const QUERY_KEYS = {
  CONTENT: ['content'] as const,
  HEADER: ['header'] as const,
  FOOTER: ['footer'] as const,
} as const

export const FALLBACK_DATA = {
  contentPlacements: {
    hero: {
      type: 'CMPicture',
      uriTemplate: '/{cropName}/{width}/hero-banner.jpg',
      cropName: 'FULL_WIDTH_BANNER',
      alt: 'Hero banner image',
    },
    featured: {
      type: 'CMPicture',
      uriTemplate: '/{cropName}/{width}/featured-image.jpg',
      cropName: 'FEATURED_IMAGE',
      alt: 'Featured image',
    },
  },
  metadata: {
    timestamp: Date.now(),
    source: 'fallback-data',
  },
} as const
