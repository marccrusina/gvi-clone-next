export const API_ENDPOINTS = {
  CONTENT:
    'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4',
} as const

export const QUERY_KEYS = {
  CONTENT: ['content'] as const,
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
