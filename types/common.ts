// Define the IPlacement interface
export interface IPlacement {
  items: Array<{
    type: string
    id: string
    teaserPreTitle?: string
    teaserTitleValue?: string
    teaserTitle1?: string
    teaserTextValue?: string
    teaserIcon?: string
    teaserText?: string
    teaserText2?: string
    teaserTitle?: string
    teaserLXCallToActionSettings?: Array<{
      callToActionEnabled: boolean
      callToActionText: string
      callToActionHash: string
      style: string
      target: {
        type: string
        url: string
      }
    }>
    teaserOverlay2Settings?: string
    teaserOverlay2Style?: string
    teaserOverlay2TextAlign?: string
    title?: string
    name?: string
  }>
  viewtype: string
}

// Define the ICMCollection interface
export interface ICMCollection {
  teasableItems: Array<{
    type: string
    id: string
    teaserPreTitle?: string
    teaserTitleValue?: string
    teaserTextValue?: string
    teaserIcon?: string
    teaserText?: string
    teaserTitle?: string
    teaserLXCallToActionSettings?: Array<{
      callToActionEnabled: boolean
      callToActionText: string
      callToActionHash: string
      style: string
      target: {
        type: string
        url: string
      }
    }>
    teaserOverlay2Settings?: string
    teaserOverlay2Style?: string
    teaserOverlay2TextAlign?: string
  }>
  viewtype: string
}
