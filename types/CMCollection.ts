import type {
  IGridPositioning,
  ITeaserCallToAction,
  ITeaserOverlayStyle,
} from './LXTeaser'
import type { IMedia } from './Media'
import type { IBasePlacementItem, IPlacementItem } from './Placement'

export interface ICMCollection extends IBasePlacementItem {
  title: string
  type: 'CMCollection'
  //viewtype: IViewType
  collectionProductStyle?: string
  teasableItems: IPlacementItem[]
  gridPositioning?: IGridPositioning
  collectionTitle: string
  collectionSubTitle: string
  collectionText: string
  collectionMaxElementNumber: number
  collectionTextOverlayStyle: ITeaserOverlayStyle
  teaserLXCallToActionSettings?: ITeaserCallToAction[]
  placementReflect?: boolean
  placementCenter?: boolean
  media: IMedia[]
  idAction?: string
  clusterTile?: boolean
  facetName?: string
  facetValue: string
  maxRecommendations: number
  threshold: number
  teaserIcon?: string
}
