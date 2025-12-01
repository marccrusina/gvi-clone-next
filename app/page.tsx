import FullWidthBanner from '@/components/full-width-banner'
import { Media } from '@/components/image/types'
import type { ICMCollection } from '@/types/CMCollection'
import type { ILXTeaser } from '@/types/LXTeaser'
import type { IPlacement } from '@/types/Placement'

export default function Home() {
  // Example transformer for your data structure

  const transformBannerData = (
    data: IPlacement | ICMCollection,
    item: ILXTeaser | undefined,
  ) => {
    // Map your data to TransformedBannerData shape
    if ('marginLateral' in data) {
      return {
        ...data,
        toLink:
          item?.teaserLXCallToActionSettings?.[0]?.target.formattedUrl ?? '',
        media: item?.media?.[0] ?? undefined,
        // Add any computed or derived props here
      }
    }
    // Handle ICMCollection case if needed
    return {
      ...data,
      toLink: '',
      media: undefined,
    }
  }

  // const media: Media = {
  //   type: 'CMPicture',
  //   uriTemplate: '/content/image/{cropName}/{width}',
  // }

  //https://www-gviuatlive.luxgroup.net/caas/v1/media/46462/data/286f637c38438a3c7f99248ea89851c1/landscape_ratio64x29/1843/gvi-hp-supernova-hero-d.png
  // Example mock data
  const mockBannerDataVariants = [
    {
      name: 'main_placement_1',
      viewtype: 'full-width-banner',
      placementReflect: false,
      marginLateral: false,
      marginVertical: 'X',
      placementCenter: false,
      backgroundColor: '',
      clusterTile: false,
      placementAnimation: '',
      collectionTitle: '',
      teaserLXCallToActionSettings: [],
      items: [
        {
          // id: '46416',
          type: 'LXTeaser',
          title: '',
          name: 'Supernova_Hero_Full Width Banner_L size',
          promoteToH1: false,
          gridPositioning: 1,
          teaserIcon: 'gvi-icon--rayban_meta',
          teaserPreTitle: '',
          teaserTitle1: 'La nuova generazione di smart-glasses è arrivata',
          teaserTitle2: '',
          teaserTitle3: '',
          teaserTitle4: '',
          teaserText2:
            '<div><p>Ascolta. Chiama. Fai una diretta. Vieni a scoprire la Ray-Ban Meta collection in negozio.</p></div>',
          teaserOverlay1TextAlign: 'center',
          teaserOverlay1Settings: 'block-left-middle',
          teaserOverlay1Style: 'text-light-primary',
          teaserText1: '',
          teaserOverlay2TextAlign: 'center',
          teaserOverlay2Settings: 'block-center-middle',
          teaserOverlay2Style: '',
          teaserLabelVisible: false,
          teaserLabelText: '',
          teaserLabelPosition: '',
          teaserLabelStyle: '',
          teaserBackground: '',
          teaserCountdownStart: '',
          teaserCountdownUntil: '',
          teaserHideExpiredCountdown: true,
          teaserLXCallToActionSettings: [
            {
              callToActionHash: '',
              callToActionEnabled: true,
              callToActionText: 'ACQUISTA LA COLLEZIONE',
              style: 'cta-fill-primary',
              target: {
                type: 'CMExternalChannel',
                title: 'Ray-Ban | Meta',
                // id: '46408',
                name: 'Ray-Ban Meta Smart Glasses (wearable_meta)',
                externalId: 'ibm:///catalog/category/wearable_meta',
                navigationPath: [
                  {
                    segment: 'grand-vision-it-it',
                  },
                  {
                    segment: 'accesso-rapido',
                  },
                  {
                    segment: 'ray-ban-meta-smart-glasses',
                  },
                ],
                teaserText: null,
                media: [],
                formattedUrl: '/ray-ban-meta',
              },
            },
            {
              callToActionHash: '',
              callToActionEnabled: true,
              callToActionText: 'trova un negozio',
              style: 'cta-fill-primary',
              target: {
                type: 'CMExternalPage',
                title: 'Store Locator',
                // id: '46468',
                name: 'Supernova_Augmented_Store_Locator',
                externalId: 'trova-negozi?appType=SUPEREX',
                navigationPath: [
                  {
                    segment: 'grand-vision-it-it',
                  },
                  {
                    segment: 'ray-ban-meta-smart-glasses',
                  },
                  {
                    segment: 'store-locator',
                  },
                ],
                teaserText: null,
                media: [],
                formattedUrl: '/trova-negozi?appType=SUPEREX',
              },
            },
          ],
          targetsTermsAndConditions: {
            style: '',
            text: '',
            target: null,
          },
          hotZones: null,
          hotZonesSettings: {
            lightContrast: false,
          },
          relatedProduct: [],
          media: [
            {
              type: 'CMPicture',
              uriTemplate:
                '/caas/v1/media/46462/data/286f637c38438a3c7f99248ea89851c1/{cropName}/{width}/gvi-hp-supernova-hero-d.png',
            },
            {
              type: 'CMVideo',
              loop: true,
              mute: false,
              hideControl: true,
              autoplay: false,
              playOnHover: false,
              width: 1920,
              data: {
                uri: '/caas/v1/media/46660/data/a78b1e563ce2c06f523c164a9e060d49/gvi-lp-rbmeta-01-video-d.mp4',
              },
              dataUrl: '',
              picture: {
                uriTemplate:
                  '/caas/v1/media/46462/data/286f637c38438a3c7f99248ea89851c1/{cropName}/{width}/gvi-hp-supernova-hero-d.png',
              },
            },
            {
              type: 'CMVideo',
              loop: true,
              mute: false,
              hideControl: true,
              autoplay: false,
              playOnHover: false,
              width: 774,
              data: {
                uri: '/caas/v1/media/46658/data/93b7ff1197eecb3982ae73d48b6c6e67/gvi-lp-rbmeta-01-video-m.mp4',
              },
              dataUrl: '',
              picture: {
                uriTemplate:
                  '/caas/v1/media/46472/data/f378ebd6f36291e5d45f90c9e47d4492/{cropName}/{width}/gvi-hp-supernova-hero-m.png',
              },
            },
          ],
        },
      ],
    },
  ] as unknown as IPlacement[]

  return (
    <>
      <FullWidthBanner
        data={mockBannerDataVariants[0] as IPlacement}
        transformData={transformBannerData}
      />
    </>
  )
}
