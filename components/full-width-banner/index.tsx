import type { IPlacement } from '@/types/common'
import { isLXTeaser } from '@/types/Placement'
import ResponsiveImage from '../image/components/responsive-image'
import TextModule from '../text-module'
import CmsFullBannerAnchor from './components/CmsFullBannerAnchor'
import styles from './styles/full-width-banner.module.scss'
import type { DynamicBannerProps } from './types/full-width-banner'

const FullWidthBanner = <T,>({
  data,
  transformData,
}: DynamicBannerProps<T>) => {
  const _BASE_URL = 'https://www-gviuatlive.luxgroup.net/'
  const imageServerUrl = 'https://media.grandvision.it/cmsuat'
  const item =
    'items' in data
      ? data?.items?.find(isLXTeaser)
      : data?.teasableItems?.find(isLXTeaser)
  // const viewType = data.viewtype

  const props = transformData(data, item)

  return (
    <>
      <CmsFullBannerAnchor
        toLink={props.toLink}
        isExternalLink={props.isExternalLink}
        bannerIndex={props.bannerIndex}
        teaserIndex={props.teaserIndex}
      >
        <ResponsiveImage
          media={props.media!}
          cropType="FULL_WIDTH_BANNER"
          alt="Full width banner"
          imageServerUrl={imageServerUrl || ''}
          priority
        />
      </CmsFullBannerAnchor>
      <div className={styles.wrapper}>
        <div className={styles.article}>
          <TextModule
            placement={data as IPlacement}
            teaserIndex={0}
            isCompact={true}
            light={true}
            center={true}
          />
        </div>
      </div>
      {/* <StyledFullWidthBannerWrapper
        overlaysettings={props.teaserOverlaySettingsValue}
        istextoverlay={true}
      >
        <StyledFullWidthBannerArticle
          overlaysettings={props.teaserOverlaySettingsValue}
          overlaytxtalign={props.teaserOverlayTextAlignValue}
          teaseroverlaystyle={props.teaserOverlayStyleValue}
        >
          {content}
        </StyledFullWidthBannerArticle>
      </StyledFullWidthBannerWrapper>
      {props.isVideo && <CmsVideoController playerBanner={props.media} />}
      {props.isShoppableImage && (
        <CmsShoppable
          hotZones={props.placementHotZones}
          hotZonesSettings={props.placementHotZonesSettings}
        />
      )}
      {props.itemHasTermsAndCondition && (
        <FullWidthTermsAndCondition item={props.item} />
      )} */}
    </>
  )
}

export default FullWidthBanner
