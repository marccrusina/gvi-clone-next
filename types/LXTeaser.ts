import type React from 'react'
import type { ICMExternalProduct } from './CMExternalProduct'
import type { ICMProductTeaser } from './CMProductTeaser'
// import { ICMArticle } from './CMArticle'
// import { ICMExternalPage } from './CMExternalPage'
// import { ICMDownload } from './CMDownload'
import type { IMedia } from './Media'
// import { ICMExternalLink } from './CMExternalLink'
// import { ICMExternalChannel } from './CMExternalChannel'
// import { ICMChannel } from './CMChannel'
// import { ICMAction } from './CMAction'
import type { IBasePlacementItem } from './Placement'
import type { ServerProduct } from './product'

export interface ILXTeaser extends IBasePlacementItem {
  type: 'LXTeaser'
  promoteToH1?: boolean
  gridPositioning?: IGridPositioning
  media: IMedia[]
  teaserIcon: string
  teaserPreTitle: string
  teaserTitle1: string
  teaserTitle2: string
  teaserTitle3: string
  teaserTitle4: string
  teaserText1: string
  teaserOverlay1TextAlign: ITeaserOverlayTextAlign
  teaserOverlay1Settings: ITeaserOverlaySettings // Text alignment
  teaserOverlay1Style: ITeaserOverlayStyle // Text Color
  teaserText2: string
  teaserOverlay2TextAlign: ITeaserOverlayTextAlign
  teaserOverlay2Settings: ITeaserOverlaySettings // Text alignment
  teaserOverlay2Style: ITeaserOverlayStyle // Text Color
  teaserLabelVisible: boolean
  teaserLabelText: string
  teaserLabelPosition: ITeaserLabelPositions
  teaserLabelStyle:
    | 'col-primary'
    | 'col-secondary'
    | 'col-tertiary'
    | 'col-white'
    | '' // label color
  teaserBackground: ITeaserBackGround
  teaserCountdownStart: string
  teaserCountdownUntil: string
  teaserHideExpiredCountdown: boolean
  teaserLXCallToActionSettings: ITeaserCallToAction[]
  teaserTargets?: ITeaserTargets[]
  teaserOverlayVideo?: []
  formattedUrl?: string
  title?: string
  targetsTermsAndConditions?: ITermsAndConditions
  hotZones?: [IHotzone]
  hotZonesSettings?: IHotzoneSettings
  relatedProduct?: (ICMProductTeaser | ICMExternalProduct)[]
}

export type IGridPositioning = 1 | 2 | 3 | 4

export interface ITeaserCallToAction {
  callToActionEnabled?: boolean
  callToActionText?: string
  callToActionHash?: string
  style: 'arn-cta--primary' | 'arn-cta--secondary' | 'arn-cta--tertiary'
  target: // | ICMChannel
  // | ICMExternalPage
    | ICMProductTeaser
    // | ICMExternalChannel
    | ICMExternalProduct
  // | ICMDownload
  // | ICMExternalLink
  // | ICMArticle
  // | ICMAction
}

type ITeaserLabelPositions =
  | 'left-top'
  | 'center-top'
  | 'right-top'
  | 'left-center'
  | 'center-center'
  | 'right-center'
  | 'left-bottom'
  | 'center-bottom'
  | 'right-bottom'
  | 'top-left'
  | ''

export type ITeaserOverlayTextAlign = React.CSSProperties['textAlign']

export type ITeaserOverlaySettings =
  | 'block-left-top'
  | 'block-left-middle'
  | 'block-left-bottom'
  | 'block-center-top'
  | 'block-center-middle'
  | 'block-center-bottom'
  | 'block-right-top'
  | 'block-right-middle'
  | 'block-right-bottom'

export type ITeaserOverlayStyle =
  | 'text-dark-primary'
  | 'text-dark-primary-shadow'
  | 'text-dark-secondary'
  | 'text-dark-secondary-shadow'
  | 'text-light-primary'
  | 'text-light-primary-shadow'
  | 'text-light-secondary'
  | 'text-light-secondary-shadow'
  | ''

export type ITeaserBackGround =
  | 'bg-primary-main'
  | 'bg-secondary-main'
  | 'bg-white'
  | 'bg-grey-main'
  | 'bg-grey-lightest'
  | 'bg-grey-light'
  | 'bg-grey-dark'
  | 'bg-primary-light'
  | 'bg-black'
  | ''

export interface ITermsAndConditions {
  style: 'cta-fill-primary'
  text: string
  target?: {
    title: string
    detailText: string
    media: IMedia[]
  }
}

export interface IHotzone {
  linkedContent?: {
    externalId?: string
    teaserTitle?: string
    name?: string
    teaserText?: string
  }
  alt?: string
  coords?: string
  displayAsInlineOverlay?: boolean
  inlineOverlayTheme?: string
  shape?: string
  target?: string
  productData?: ServerProduct[]
}

export interface IHotzoneSettings {
  lightContrast?: boolean
}

export interface ITeaserTargets {
  callToActionHash?: string
  target: unknown
  // | ICMChannel
  // | ICMExternalPage
  // | ICMProductTeaser
  // | ICMExternalChannel
  // | ICMExternalProduct
  // | ICMExternalLink
  // | ICMDownload
}
