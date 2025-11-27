import useMediaByDeviceType from '@/hooks/useMediaByDeviceType'
import type { ICMCollection } from '@/types/CMCollection'
import type { ICMExternalProduct } from '@/types/CMExternalProduct'
import type { ICMProductTeaser } from '@/types/CMProductTeaser'
import type {
  IHotzone,
  IHotzoneSettings,
  ILXTeaser,
  ITeaserCallToAction,
  ITeaserOverlaySettings,
  ITeaserOverlayStyle,
  ITeaserOverlayTextAlign,
} from '@/types/LXTeaser'
import type { IMedia } from '@/types/Media'
import { type IPlacement, isVideoMedia } from '@/types/Placement'
import type { ServerProduct } from '@/types/product'
import type { IViewType } from '@/types/ViewType'
import { replaceTextMediaCmsUrl, teaserPropsByView } from '@/utils/placements'

const useCmsTeaserBanner = ({
  item,
  placement,
  viewType,
}: {
  item?: ILXTeaser
  placement?: IPlacement | ICMCollection
  viewType?: IViewType
}): {
  teaserText: string
  teaserTitle: string
  teaserTitleValue: string
  teaserTextValue: string
  teaserOverlaySettingsValue: ITeaserOverlaySettings | undefined
  teaserOverlayTextAlignValue: ITeaserOverlayTextAlign | undefined
  teaserOverlayStyleValue: ITeaserOverlayStyle | undefined
  promoteToH1: boolean
  teaserLXCallToActionSettings: ITeaserCallToAction[]
  teaserPreTitle: string
  teaserIcon: string
  teaserCountdownStart: string
  teaserCountdownUntil: string
  teaserHideExpiredCountdown: boolean
  placementHotZones: [IHotzone] | undefined
  placementHotZonesSettings: IHotzoneSettings | undefined
  isShoppableImage: boolean
  toLink: string
  isExternalLink?: boolean
  filterRelatedProduct: ICMExternalProduct | ICMProductTeaser | undefined
  productData: ServerProduct | null
  itemHasTermsAndCondition: boolean | undefined | false
  isVideo?: boolean
  isFrameAdvisor?: boolean | undefined | false
  teaserBackground: string
  media: IMedia | undefined
} => {
  const {
    teaserTitle,
    teaserText,
    teaserOverlaySettings,
    teaserOverlayTextAlign,
    teaserOverlayStyle,
  } = teaserPropsByView(viewType || 'default')

  const {
    promoteToH1 = false,
    teaserLXCallToActionSettings = [],
    teaserPreTitle = '',
    teaserIcon = '',
    teaserCountdownStart = '',
    teaserCountdownUntil = '',
    teaserHideExpiredCountdown = false,
  } = item || {}

  const teaserTitleValue = item?.[teaserTitle] || ''
  const teaserTextValue = replaceTextMediaCmsUrl(item?.[teaserText] || '')
  const teaserOverlaySettingsValue = item?.[teaserOverlaySettings]
  const teaserOverlayTextAlignValue = item?.[teaserOverlayTextAlign]
  const teaserOverlayStyleValue = item?.[teaserOverlayStyle]
  const areItemsInPlacement = placement && 'items' in placement
  const teaserCms = areItemsInPlacement
    ? placement?.items[0]
    : placement?.teasableItems[0]
  const teasersHotZones = item?.hotZones
  const placementHotZones = teasersHotZones
    ? teasersHotZones
    : (teaserCms as unknown as ILXTeaser)?.hotZones
  const teasersHotZonesSettings = item?.hotZonesSettings
  const placementHotZonesSettings = teasersHotZonesSettings
    ? teasersHotZonesSettings
    : (teaserCms as unknown as ILXTeaser)?.hotZonesSettings

  const teaserBackground = item?.teaserBackground || ''
  const isShoppableImage = teasersHotZones
    ? (teasersHotZones?.length && teasersHotZones?.length >= 0) || false
    : (placementHotZones?.length && placementHotZones?.length >= 0) || false

  const toLink = `${
    (
      item?.teaserLXCallToActionSettings?.[0]?.target as {
        formattedUrl: string
      }
    )?.formattedUrl ?? ''
  }`
  const isExternalLink =
    (item?.teaserLXCallToActionSettings?.[0]?.target as { type: string })
      ?.type === 'CMExternalLink'
  const isVideo = isVideoMedia(item?.media?.[0])
  const media = useMediaByDeviceType(item?.media!)

  const filterRelatedProduct = (item as ILXTeaser)?.relatedProduct?.find(
    (relatedProduct) =>
      ['CMProductTeaser', 'CMExternalProduct'].includes(relatedProduct.type),
  )
  const productData = filterRelatedProduct?.productData || null
  const itemHasTermsAndCondition = !!(item as ILXTeaser)
    ?.targetsTermsAndConditions?.target

  const isFrameAdvisor =
    (item?.teaserLXCallToActionSettings?.[0]?.target as { type?: string })
      ?.type === 'Action' &&
    (item?.teaserLXCallToActionSettings?.[0]?.target as { idAction?: string })
      ?.idAction === 'frame-advisor'

  return {
    teaserText,
    teaserTitle,
    teaserTitleValue,
    teaserTextValue,
    teaserOverlaySettingsValue,
    teaserOverlayTextAlignValue,
    teaserOverlayStyleValue,
    promoteToH1,
    teaserLXCallToActionSettings,
    teaserPreTitle,
    teaserIcon,
    teaserCountdownStart,
    teaserCountdownUntil,
    teaserHideExpiredCountdown,
    teaserBackground,
    placementHotZones,
    placementHotZonesSettings,
    isShoppableImage,
    toLink,
    isExternalLink,
    filterRelatedProduct,
    productData,
    itemHasTermsAndCondition,
    isVideo,
    isFrameAdvisor,
    media,
  }
}

export default useCmsTeaserBanner
