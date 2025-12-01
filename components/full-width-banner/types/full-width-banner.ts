import type { Media } from '@/components/image/types'
import type { ICMCollection } from '@/types/CMCollection'
import type { ILXTeaser } from '@/types/LXTeaser'
import { IMedia } from '@/types/Media'
import type { IPlacement } from '@/types/Placement'

export interface DynamicBannerProps<_T> {
  data: IPlacement | ICMCollection
  transformData: (
    data: IPlacement | ICMCollection,
    item: ILXTeaser | undefined,
  ) => TransformedBannerData
}

export interface TransformedBannerData {
  toLink?: string
  isExternalLink?: boolean
  bannerIndex?: number
  teaserIndex?: number
  media?: Media
  item?: ILXTeaser | undefined
}
