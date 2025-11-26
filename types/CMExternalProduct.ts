import type { IMedia } from './Media'
import type { IBasePlacementItem } from './Placement'
import type { ServerProduct } from './product'

export interface ICMExternalProduct extends IBasePlacementItem {
  externalId: string
  formattedUrl: string
  fullyQualifiedUrl?: string
  url: string
  media: IMedia[]
  productData: ServerProduct
  title: string
  teaserTitle: string
  teaserText: string | null
  type: 'CMExternalProduct'
  hiddenInFooterNavigation: boolean
  hiddenInMobileNavigation: boolean
  isHighlightedInNav: boolean
}
