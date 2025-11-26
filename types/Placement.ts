// import { ICMTeaser } from './CMTeaser'
// import { LXDynamicContent } from './LXDynamicContent'
import type { ICMCollection } from './CMCollection'
// import { ICMArticle } from './CMArticle'
// import { ICMExternalLink } from './CMExternalLink'
// import { ICMExternalPage } from './CMExternalPage'
import type { ICMExternalProduct } from './CMExternalProduct'
import type { ICMProductTeaser } from './CMProductTeaser'
import { ILXTeaser, type ITeaserCallToAction } from './LXTeaser'
// import { ICMHtml } from './CMHtml'
// import { ICMExternalChannel } from './CMExternalChannel'
import { type IMedia, IPictureMedia, type IVideoMedia } from './Media'
import type { ServerProduct } from './product'
// import { ICMChannel } from './CMChannel'
import type { IViewType } from './ViewType'
// import { ICMPlaceholder } from './CMPlaceholder'
// import { ICMProductList } from './CMProductList'
// import { ICMQueryList } from './CMQueryList'
// import { ICMAlgolia } from './CMAlgolia'

export interface IPlacement<ItemType = IPlacementItem> {
  collectionTitle: string
  viewtype: IViewType
  name: string
  marginLateral: boolean
  teaserLXCallToActionSettings: ITeaserCallToAction[]
  placementReflect: boolean
  placementCenter?: boolean
  marginVertical: 'X' | 'S' | 'M' | 'L'
  backgroundColor: React.CSSProperties['backgroundColor']
  clusterTile: boolean
  placementAnimation: string
  cta?: string
  items: ItemType[]
  currentProduct?: ServerProduct
  contentPlacements?: IPlacement[]
  title?: string
}

export interface IBasePlacementItem {
  id?: string
  name?: string
  viewtype: IViewType
  teaserTitle1: string
}

export type IPlacementItem =
  //   | ICMArticle
  //   | ICMChannel
  | ICMCollection
  //   | ICMExternalLink
  //   | ICMExternalPage
  | ICMExternalProduct
  | ICMProductTeaser
//   | ILXTeaser
//   | LXDynamicContent
//   | ICMTeaser
//   | ICMHtml
//   | ICMExternalChannel
//   | ICMProductList
//   | ICMQueryList
//   | ICMPlaceholder
//   | ICMAlgolia

// export const isLXTeaser = (item: IPlacementItem): item is ILXTeaser =>
//   (item as ILXTeaser).type === 'LXTeaser'

// export const isCMCollection = (item: IPlacementItem): item is ICMCollection =>
//   item.type === 'CMCollection'

// export const isCMExternalProduct = (
//   item: IPlacementItem
// ): item is ICMExternalProduct => item.type === 'CMExternalProduct'

// export const isCMProductTeaser = (
//   item: IPlacementItem
// ): item is ICMProductTeaser => item.type === 'CMProductTeaser'

// export const isCMArticle = (item: IPlacementItem): item is ICMArticle =>
//   item.type === 'CMArticle'

// export const isCMChannel = (item: IPlacementItem): item is ICMChannel =>
//   item.type === 'CMChannel'

// export const isPictureMedia = (
//   item: IMedia | undefined
// ): item is IPictureMedia => item?.type === 'CMPicture' ?? false

export const isVideoMedia = (item?: IMedia): item is IVideoMedia =>
  item?.type === 'CMVideo'

// export const isDynamicContent = (
//   item: IPlacementItem
// ): item is LXDynamicContent =>
//   (item as LXDynamicContent).type === 'LXDynamicContent'

// export const isCMExternalPage = (
//   item: IPlacementItem
// ): item is ICMExternalPage => item.type === 'CMExternalPage'

// export const isCMExternalChannel = (
//   item: IPlacementItem
// ): item is ICMExternalChannel => item.type === 'CMExternalChannel'

// export const isCMProductList = (item: IPlacementItem): item is ICMProductList =>
//   item.type === 'CMProductList'

// export const isCMQueryList = (item: IPlacementItem): item is ICMQueryList =>
//   item.type === 'CMQueryList'

// export const isCMPlaceholder = (item: IPlacementItem): item is ICMPlaceholder =>
//   item.type === 'CMPlaceholder'

// export const isCMHtml = (item: IPlacementItem): item is ICMHtml =>
//   item.type === 'CMHTML'

// export const isCMTeaser = (item: IPlacementItem): item is ICMTeaser =>
//   item.type === 'CMTeaser'

// export const isCMAlgolia = (item: IPlacementItem): item is ICMAlgolia =>
//   item.type === 'Algolia'
