import clsx from 'clsx'
import type React from 'react'
import Button from '@/components/button/Button'
import useCmsTeaserBanner from '@/hooks/useCmsTeaserBanner'
import {
  ILXTeaser,
  type ITeaserCallToAction,
  type ITeaserOverlayTextAlign,
} from '@/types/LXTeaser'
// import CmsIcon from '../../../../CmsComponents/CmsIcon'
// import CmsCta from '../../../../CmsComponents/CmsCta'
import { IViewType } from '@/types/ViewType'
import styles from './styles/TextModuleTeaser.module.scss'

export const getTeaserOverlayTextAlign = (
  teaserOverlay1TextAlign?: string,
): ITeaserOverlayTextAlign => {
  if (!teaserOverlay1TextAlign) {
    return 'center'
  }

  return teaserOverlay1TextAlign === 'justified'
    ? 'justify'
    : (teaserOverlay1TextAlign as ITeaserOverlayTextAlign)
}

const TextModuleTeaser: React.FC<{
  icon?: string
  preTitle?: string
  title?: string
  text?: string
  callToActionSettings?: ITeaserCallToAction[]
  isCompact?: boolean
  light?: boolean
  center?: boolean
}> = ({
  icon,
  preTitle,
  title,
  text,
  callToActionSettings,
  isCompact,
  center = false,
  light,
}) => {
  return (
    <article className={clsx(styles.wrapper)}>
      <div className={clsx(styles.content, { [styles.compact]: isCompact })}>
        {icon && (
          <div className={styles.iconContent}>
            {/* <CmsIcon teaserIcon={teaserIcon} /> */}
          </div>
        )}
        {preTitle && (
          <h2
            className={clsx(styles.preTitle, {
              [styles.preTitleUppercased]: false,
              [styles.light]: light,
              [styles.center]: center,
            })}
          >
            {preTitle}
          </h2>
        )}
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && (
          <div
            className={clsx(styles.text, {
              [styles.light]: light,
              [styles.center]: center,
            })}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {callToActionSettings && callToActionSettings.length > 0 && (
          <div
            className={clsx(styles.ctaContent, {
              [styles.center]: center,
            })}
          >
            {callToActionSettings.map((actionSetting: ITeaserCallToAction) => (
              <Button
                key={actionSetting.callToActionHash}
                variant={'primary'}
                fillType={'fill'}
                size={'big'}
                fullwidth={false}
                labelText={actionSetting.callToActionText}
              />
              // TODO: Re-enable once CmsCta component is available
              //   <CmsCta
              //     actionSettings={actionSettings}
              //     dataElementId={`${teaserIndex}Placement_Banner${bannerIndex}_CTA${
              //       index + 1
              //     }`}
              //     key={`cms-content__text-module--cta-${index}`}
              //   />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default TextModuleTeaser
