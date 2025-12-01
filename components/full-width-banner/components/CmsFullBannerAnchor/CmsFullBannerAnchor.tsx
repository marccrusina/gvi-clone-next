import Link from 'next/link'
import type React from 'react'

const CmsFullBannerAnchor: React.FC<{
  children: React.ReactNode
  toLink?: string
  isExternalLink?: boolean
  bannerIndex?: number
  teaserIndex?: number
}> = ({ children, toLink = '', isExternalLink, bannerIndex, teaserIndex }) => {
  const basePath = process.env.IMAGE_SERVER_URL
  const AnchorImageBannerProps = {
    'aria-label': `Placement_Banner${bannerIndex}_IMG link. Teaser №${teaserIndex}`,
    'data-element-id': `${teaserIndex}Placement_Banner${bannerIndex}_IMG`,
  }

  const targetLink = isExternalLink ? toLink : `${basePath}${toLink}`
  return (
    <>
      {toLink ? (
        <Link {...AnchorImageBannerProps} href={targetLink}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
export default CmsFullBannerAnchor
