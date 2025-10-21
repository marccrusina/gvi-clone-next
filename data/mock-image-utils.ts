import type { PictureMedia } from '@/components/image/types/image'
import mockImageResponse from './mockImageResponse.json'

// Interfaces for the JSON structure
interface MediaItem {
  type: string
  uriTemplate: string
}

interface Item {
  type?: string
  id?: string
  name?: string
  teaserTitle1?: string
  teaserText1?: string
  teaserIcon?: string
  media?: MediaItem[]
  teasableItems?: Item[]
}

interface Section {
  name?: string
  viewtype?: string
  items?: Item[]
}

// Type assertion for the JSON import
const data = mockImageResponse as Section[]

export interface ImagePlacement {
  id: string
  cropType: string
  category: string
  sectionName: string
  sectionViewtype: string
  teaserTitle?: string
  teaserText?: string
  teaserIcon?: string
}

export interface ExtractedImageData {
  id: string
  media: PictureMedia
  title: string
  description: string
  imageId: string
  altText: string
  placements: ImagePlacement[]
  allTags: string[]
  allCategories: string[]
}

// Extract image data from the response JSON, grouped by unique images
export const extractImageDataFromResponse = (): ExtractedImageData[] => {
  const imageMap = new Map<string, ExtractedImageData>()

  data.forEach((section: Section, sectionIndex: number) => {
    if (section.items && Array.isArray(section.items)) {
      section.items.forEach((item: Item, itemIndex: number) => {
        // Handle nested CMCollection structure
        const itemsToProcess =
          item.teasableItems && Array.isArray(item.teasableItems)
            ? item.teasableItems
            : [item]

        itemsToProcess.forEach((nestedItem: Item, nestedItemIndex: number) => {
          if (nestedItem.media && Array.isArray(nestedItem.media)) {
            nestedItem.media.forEach(
              (mediaItem: MediaItem, mediaIndex: number) => {
                if (mediaItem.type === 'CMPicture' && mediaItem.uriTemplate) {
                  // Use URI template as unique identifier for the image
                  const uniqueImageKey = mediaItem.uriTemplate

                  // Map viewtype to correct crop type names
                  const viewtypeToCropTypeMap: Record<string, string> = {
                    'full-width-banner': 'FULL_WIDTH_BANNER',
                    'top-page-banner': 'TOP_PAGE_BANNER',
                    'landscape-banner': 'LANDSCAPE_BANNER',
                    'boards-with-fields-below': 'BOARD_WITH_FIELDS_2_ITEMS',
                    'dcw-products': 'PLP_TWO_TILES',
                    'wall-of-brands': 'SQUARE_BOARDS_WITHOUT_SPLIT',
                    default: 'DEFAULT_VIEW', // Default fallback
                  }

                  // Extract crop type from the section viewtype or name
                  const rawCropType =
                    section.viewtype || section.name || 'default'
                  const cropType =
                    viewtypeToCropTypeMap[rawCropType] || 'DEFAULT_VIEW'

                  // Generate placement ID
                  const placementId = `${sectionIndex}-${itemIndex}-${nestedItemIndex}-${mediaIndex}`

                  // Extract image ID from URI template
                  const uriParts = mediaItem.uriTemplate.split('/')
                  const imageId =
                    uriParts[uriParts.length - 1]?.replace('.png', '') ||
                    `image-${placementId}`

                  // Create media object
                  const media: PictureMedia = {
                    type: 'CMPicture',
                    uriTemplate: mediaItem.uriTemplate,
                  }

                  // Generate title and description (use first occurrence)
                  const title =
                    nestedItem.teaserTitle1 ||
                    nestedItem.name ||
                    `Image ${imageId}`
                  const description = nestedItem.teaserText1
                    ? nestedItem.teaserText1.replace(/<[^>]*>/g, '').trim()
                    : `Image from ${section.name}`

                  // Generate alt text
                  const altText =
                    nestedItem.teaserTitle1 ||
                    nestedItem.name ||
                    `Image from ${section.name}`

                  // Create placement data
                  const placement: ImagePlacement = {
                    id: placementId,
                    cropType,
                    category:
                      section.name?.replace(/_/g, ' ').toUpperCase() ||
                      'UNKNOWN',
                    sectionName: section.name || 'Unknown',
                    sectionViewtype: section.viewtype || 'default',
                    teaserTitle: nestedItem.teaserTitle1,
                    teaserText: nestedItem.teaserText1,
                    teaserIcon: nestedItem.teaserIcon,
                  }

                  // Check if this image already exists
                  if (imageMap.has(uniqueImageKey)) {
                    // Add placement to existing image
                    const existingImage = imageMap.get(uniqueImageKey)
                    if (!existingImage) return
                    existingImage.placements.push(placement)

                    // Add new tags and categories
                    const newTags = [
                      section.name?.toLowerCase() || 'unknown',
                      cropType.toLowerCase(),
                      nestedItem.type?.toLowerCase() || 'teaser',
                    ].filter(Boolean)

                    existingImage.allTags = Array.from(
                      new Set([...existingImage.allTags, ...newTags]),
                    )
                    existingImage.allCategories = Array.from(
                      new Set([
                        ...existingImage.allCategories,
                        placement.category,
                      ]),
                    )
                  } else {
                    // Create new image entry
                    const tags = [
                      section.name?.toLowerCase() || 'unknown',
                      cropType.toLowerCase(),
                      nestedItem.type?.toLowerCase() || 'teaser',
                    ].filter(Boolean)

                    const newImage: ExtractedImageData = {
                      id: imageId, // Use imageId as the unique identifier
                      media,
                      title,
                      description,
                      imageId,
                      altText,
                      placements: [placement],
                      allTags: tags,
                      allCategories: [placement.category],
                    }

                    imageMap.set(uniqueImageKey, newImage)
                  }
                }
              },
            )
          }
        })
      })
    }
  })

  return Array.from(imageMap.values())
}

// Get all extracted images
export const getExtractedImages = (): ExtractedImageData[] => {
  return extractImageDataFromResponse()
}

// Get images by category
export const getExtractedImagesByCategory = (
  category: string,
): ExtractedImageData[] => {
  return getExtractedImages().filter((image) =>
    image.allCategories.some((cat) =>
      cat.toLowerCase().includes(category.toLowerCase()),
    ),
  )
}

// Get images by crop type
export const getExtractedImagesByCropType = (
  cropType: string,
): ExtractedImageData[] => {
  return getExtractedImages().filter((image) =>
    image.placements.some((placement) =>
      placement.cropType.toLowerCase().includes(cropType.toLowerCase()),
    ),
  )
}

// Get all unique categories
export const getExtractedCategories = (): string[] => {
  const categories = getExtractedImages().flatMap(
    (image) => image.allCategories,
  )
  return Array.from(new Set(categories))
}

// Get all unique tags
export const getExtractedTags = (): string[] => {
  const tags = getExtractedImages().flatMap((image) => image.allTags)
  return Array.from(new Set(tags))
}

// Get statistics
export const getExtractedImageStats = () => {
  const images = getExtractedImages()
  return {
    totalImages: images.length,
    totalCategories: getExtractedCategories().length,
    totalTags: getExtractedTags().length,
    categories: getExtractedCategories(),
    tags: getExtractedTags(),
  }
}
