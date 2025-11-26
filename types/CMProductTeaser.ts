import type { IMedia } from './Media'
import type { IBasePlacementItem } from './Placement'
import type { ServerProduct } from './product'

export interface ICMProductTeaser extends IBasePlacementItem {
  type: 'CMProductTeaser'
  externalId: string
  formattedUrl: string
  fullyQualifiedUrl?: string
  url: string
  media: IMedia[]
  teaserTitle: string
  teaserText: string | null
  productData: ServerProduct
  hiddenInFooterNavigation: boolean
  hiddenInMobileNavigation: boolean
  isHighlightedInNav: boolean
}
