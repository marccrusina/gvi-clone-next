import type { PictureMedia } from '@/components/image/types/image'

export interface ImageData {
  id: string
  cropType: string
  media: PictureMedia
  title: string
  description: string
  category: string
  tags: string[]
  imageId: string
  altText: string
}

// Generate unique image IDs for each crop type
const generateImageId = (cropType: string): string => {
  const baseId = cropType.toLowerCase().replace(/_/g, '-')
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `${baseId}-${randomSuffix}`
}

// Create dynamic URI templates that use the image ID
const createUriTemplate = (imageId: string): string => {
  return `/{cropName}/{width}/${imageId}.jpg`
}

export const images: ImageData[] = [
  {
    id: '1',
    cropType: 'FULL_WIDTH_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('FULL_WIDTH_BANNER')),
    },
    title: 'Full Width Banner',
    description: 'Full-width hero banners for main sections',
    category: 'Hero',
    tags: ['banner', 'hero', 'full-width'],
    imageId: generateImageId('FULL_WIDTH_BANNER'),
    altText: 'Full width hero banner showcasing main content',
  },
  {
    id: '2',
    cropType: 'LANDSCAPE_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('LANDSCAPE_BANNER')),
    },
    title: 'Landscape Banner',
    description: 'Wide landscape banners for promotional content',
    category: 'Promotional',
    tags: ['banner', 'landscape', 'promotional'],
    imageId: generateImageId('LANDSCAPE_BANNER'),
    altText: 'Landscape promotional banner for featured content',
  },
  {
    id: '3',
    cropType: 'TOP_PAGE_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('TOP_PAGE_BANNER')),
    },
    title: 'Top Page Banner',
    description: 'Banners for top of page sections',
    category: 'Navigation',
    tags: ['banner', 'top', 'navigation'],
    imageId: generateImageId('TOP_PAGE_BANNER'),
    altText: 'Top page banner for navigation sections',
  },
  {
    id: '4',
    cropType: 'SQUAT_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('SQUAT_BANNER')),
    },
    title: 'Squat Banner',
    description: 'Short, wide banners for compact spaces',
    category: 'Compact',
    tags: ['banner', 'squat', 'compact'],
    imageId: generateImageId('SQUAT_BANNER'),
    altText: 'Compact squat banner for tight spaces',
  },
  {
    id: '5',
    cropType: 'BOX_WITH_MARGIN_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('BOX_WITH_MARGIN_BANNER')),
    },
    title: 'Box with Margin Banner',
    description: 'Square banners with margins for featured content',
    category: 'Featured',
    tags: ['banner', 'box', 'featured'],
    imageId: generateImageId('BOX_WITH_MARGIN_BANNER'),
    altText: 'Box banner with margins for featured content',
  },
  {
    id: '6',
    cropType: 'BOARD_WITH_FIELDS_2_ITEMS',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('BOARD_WITH_FIELDS_2_ITEMS'),
      ),
    },
    title: 'Board with 2 Items',
    description: 'Grid layout for 2-item displays',
    category: 'Grid',
    tags: ['board', 'grid', '2-items'],
    imageId: generateImageId('BOARD_WITH_FIELDS_2_ITEMS'),
    altText: 'Board layout displaying 2 items in grid format',
  },
  {
    id: '7',
    cropType: 'BOARD_WITH_FIELDS_3_ITEMS',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('BOARD_WITH_FIELDS_3_ITEMS'),
      ),
    },
    title: 'Board with 3 Items',
    description: 'Grid layout for 3-item displays',
    category: 'Grid',
    tags: ['board', 'grid', '3-items'],
    imageId: generateImageId('BOARD_WITH_FIELDS_3_ITEMS'),
    altText: 'Board layout displaying 3 items in grid format',
  },
  {
    id: '8',
    cropType: 'BOARD_WITH_FIELDS_4_ITEMS',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('BOARD_WITH_FIELDS_4_ITEMS'),
      ),
    },
    title: 'Board with 4 Items',
    description: 'Grid layout for 4-item displays',
    category: 'Grid',
    tags: ['board', 'grid', '4-items'],
    imageId: generateImageId('BOARD_WITH_FIELDS_4_ITEMS'),
    altText: 'Board layout displaying 4 items in grid format',
  },
  {
    id: '9',
    cropType: 'SQUARE_BOARDS_WITH_SPLIT',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('SQUARE_BOARDS_WITH_SPLIT'),
      ),
    },
    title: 'Square Boards with Split',
    description: 'Square boards with split layout design',
    category: 'Layout',
    tags: ['square', 'boards', 'split'],
    imageId: generateImageId('SQUARE_BOARDS_WITH_SPLIT'),
    altText: 'Square board layout with split design',
  },
  {
    id: '10',
    cropType: 'SQUARE_BOARDS_WITHOUT_SPLIT',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('SQUARE_BOARDS_WITHOUT_SPLIT'),
      ),
    },
    title: 'Square Boards without Split',
    description: 'Square boards without split layout',
    category: 'Layout',
    tags: ['square', 'boards', 'no-split'],
    imageId: generateImageId('SQUARE_BOARDS_WITHOUT_SPLIT'),
    altText: 'Square board layout without split design',
  },
  {
    id: '11',
    cropType: 'COMBO_MINI_SLIDER_SMALL',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('COMBO_MINI_SLIDER_SMALL'),
      ),
    },
    title: 'Combo Mini Slider Small',
    description: 'Small slider items for compact displays',
    category: 'Slider',
    tags: ['slider', 'mini', 'small'],
    imageId: generateImageId('COMBO_MINI_SLIDER_SMALL'),
    altText: 'Small mini slider item for compact displays',
  },
  {
    id: '12',
    cropType: 'COMBO_MINI_SLIDER_BIG',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('COMBO_MINI_SLIDER_BIG')),
    },
    title: 'Combo Mini Slider Big',
    description: 'Large slider items for prominent displays',
    category: 'Slider',
    tags: ['slider', 'mini', 'big'],
    imageId: generateImageId('COMBO_MINI_SLIDER_BIG'),
    altText: 'Large mini slider item for prominent displays',
  },
  {
    id: '13',
    cropType: 'PLP_TWO_TILES',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('PLP_TWO_TILES')),
    },
    title: 'PLP Two Tiles',
    description: 'Product listing page tiles layout',
    category: 'Product',
    tags: ['plp', 'tiles', 'product'],
    imageId: generateImageId('PLP_TWO_TILES'),
    altText: 'Product listing page with two tile layout',
  },
  {
    id: '14',
    cropType: 'CART_PROMO_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('CART_PROMO_BANNER')),
    },
    title: 'Cart Promo Banner',
    description: 'Promotional banners for cart pages',
    category: 'E-commerce',
    tags: ['cart', 'promo', 'banner'],
    imageId: generateImageId('CART_PROMO_BANNER'),
    altText: 'Promotional banner for shopping cart page',
  },
  {
    id: '15',
    cropType: 'AVATAR_MEGA_MENU',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('AVATAR_MEGA_MENU')),
    },
    title: 'Avatar Mega Menu',
    description: 'Avatar images for mega menu displays',
    category: 'Navigation',
    tags: ['avatar', 'mega-menu', 'navigation'],
    imageId: generateImageId('AVATAR_MEGA_MENU'),
    altText: 'Avatar image for mega menu navigation',
  },
  {
    id: '16',
    cropType: 'BIG_MENU_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('BIG_MENU_BANNER')),
    },
    title: 'Big Menu Banner',
    description: 'Large banners for menu sections',
    category: 'Navigation',
    tags: ['menu', 'banner', 'big'],
    imageId: generateImageId('BIG_MENU_BANNER'),
    altText: 'Large banner for menu sections',
  },
  {
    id: '17',
    cropType: 'QUERY_LIST',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(generateImageId('QUERY_LIST')),
    },
    title: 'Query List',
    description: 'Images for query result listings',
    category: 'Search',
    tags: ['query', 'list', 'search'],
    imageId: generateImageId('QUERY_LIST'),
    altText: 'Image for query result listings',
  },
  {
    id: '18',
    cropType: 'FOOTER_NEWSLETTER_SIDE_BANNER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('FOOTER_NEWSLETTER_SIDE_BANNER'),
      ),
    },
    title: 'Footer Newsletter Side Banner',
    description: 'Side banners for footer newsletter sections',
    category: 'Footer',
    tags: ['footer', 'newsletter', 'side'],
    imageId: generateImageId('FOOTER_NEWSLETTER_SIDE_BANNER'),
    altText: 'Side banner for footer newsletter section',
  },
  {
    id: '19',
    cropType: 'FOOTER_NEWSLETTER_DRAWER',
    media: {
      type: 'CMPicture',
      uriTemplate: createUriTemplate(
        generateImageId('FOOTER_NEWSLETTER_DRAWER'),
      ),
    },
    title: 'Footer Newsletter Drawer',
    description: 'Banners for footer newsletter drawer',
    category: 'Footer',
    tags: ['footer', 'newsletter', 'drawer'],
    imageId: generateImageId('FOOTER_NEWSLETTER_DRAWER'),
    altText: 'Banner for footer newsletter drawer',
  },
]

// Helper functions for working with data
export const getImageById = (id: string): ImageData | undefined => {
  return images.find((image) => image.id === id)
}

export const getImagesByCategory = (category: string): ImageData[] => {
  return images.filter((image) => image.category === category)
}

export const getImagesByCropType = (
  cropType: string,
): ImageData | undefined => {
  return images.find((image) => image.cropType === cropType)
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(images.map((image) => image.category)))
}

export const getAllTags = (): string[] => {
  return Array.from(new Set(images.flatMap((image) => image.tags)))
}

// Statistics
export const imageStats = {
  totalImages: images.length,
  totalCategories: getAllCategories().length,
  totalTags: getAllTags().length,
  categories: getAllCategories(),
  tags: getAllTags(),
}
