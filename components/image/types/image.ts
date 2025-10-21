export interface PictureMedia {
  type: 'CMPicture'
  uriTemplate: string
}

export interface VideoMedia {
  type: 'CMVideo'
  autoplay: boolean
  data: { uri: string }
  dataUrl: string
  hideControl: boolean
  loop: boolean
  mute: boolean
  picture: { uriTemplate: string }
  playOnHover: boolean
  width: number
}

export type Media = PictureMedia | VideoMedia

// Helper type guard functions
export function isPictureMedia(media: Media): media is PictureMedia {
  return media.type === 'CMPicture'
}

export function isVideoMedia(media: Media): media is VideoMedia {
  return media.type === 'CMVideo'
}

// Helper function to get image URL from media
export function getImageUrlFromMedia(media: Media): string {
  if (isPictureMedia(media)) {
    return media.uriTemplate
  }
  if (isVideoMedia(media)) {
    return media.picture.uriTemplate
  }
  return ''
}

export interface ImageCrops {
  [key: string]: {
    mobile?: { crop: string; width: number }
    tabletP?: { crop: string; width: number }
    tabletL?: { crop: string; width: number }
    deskS?: { crop: string; width: number }
    deskL?: { crop: string; width: number }
  }
}

export interface ResponsiveImageProps {
  media: Media
  cropType: string
  alt: string
  imageServerUrl: string
  priority?: boolean
  className?: string
  sizes?: string
}

export interface ResponsiveImageLazyProps extends ResponsiveImageProps {
  onLoad?: () => void
  showSkeleton?: boolean
}

export interface ResponsivePictureProps {
  media: Media
  cropType: string
  alt: string
  imageServerUrl: string
  loading?: 'lazy' | 'eager'
  className?: string
}

export interface SrcSetResult {
  mobile?: string
  tabletP?: string
  tabletL?: string
  deskS?: string
  deskL?: string
}

export interface ImageDimensions {
  width: number | null
  height: number | null
}

export interface ImageRatio {
  ratio: number[]
  width: number
}
