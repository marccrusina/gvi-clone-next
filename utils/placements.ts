// import {
//   ILXTeaser,
//   ITeaserOverlayStyle,
//   ITeaserOverlaySettings,
//   ITeaserOverlayTextAlign,
// } from '../types/cmsPlacement/LXTeaser'
// import React from 'react'
// import { Theme } from '@mui/material'
// import config from '../configs'
// import { IViewType } from '../types/cmsPlacement/ViewType'

import type { IViewType } from '@/types/ViewType'

// type IPosition =
//   | 'left-top'
//   | 'left-middle'
//   | 'left-bottom'
//   | 'right-top'
//   | 'right-middle'
//   | 'right-bottom'
//   | 'center-top'
//   | 'center-middle'
//   | 'center-bottom'

// const normalizeOverlaySettings = (
//   value: IPosition,
//   halfWidth?: string,
//   fullWidth?: string,
//   margin?: string
// ) => {
//   const defaultStyle = {
//     width: `${fullWidth}`,
//     margin: `${margin}`,
//     padding: 'unset',
//   }
//   switch (value) {
//     case 'left-top':
//       return { ...defaultStyle, left: '0', top: '0', bottom: 'unset' }
//     case 'left-middle':
//       return { ...defaultStyle, left: '0', top: 'unset', bottom: 'unset' }
//     case 'left-bottom':
//       return { ...defaultStyle, left: '0', bottom: '0' }
//     case 'center-top':
//       return {
//         ...defaultStyle,
//         left: `calc(50% - ${halfWidth} - ${margin})`,
//         top: '0',
//         bottom: 'unset',
//         width: '100%',
//       }
//     case 'center-middle':
//       return {
//         ...defaultStyle,
//         left: `calc(50% - ${halfWidth} - ${margin})`,
//         top: 'unset',
//         bottom: 'unset',
//         margin: `${margin}`,
//         width: '100%',
//       }
//     case 'center-bottom':
//       return {
//         ...defaultStyle,
//         left: `calc(50% - ${halfWidth} - ${margin})`,
//         bottom: '0',
//         width: '100%',
//       }
//     case 'right-top':
//       return { ...defaultStyle, right: '0', top: '0', bottom: 'unset' }
//     case 'right-middle':
//       return { ...defaultStyle, right: '0', top: 'unset', bottom: 'unset' }
//     case 'right-bottom':
//       return { ...defaultStyle, right: '0', bottom: '0' }
//   }
// }

// export const teaserOverlaySettingsToCss = (
//   value: ILXTeaser['teaserOverlay1Settings'] | ''
// ) => {
//   const defaultStyle = {
//     width: 'unset',
//   }
//   const split = value.replace('block-', '') as IPosition
//   switch (split) {
//     case 'left-top':
//       return { ...defaultStyle, left: '0', top: '0' }
//     case 'left-middle':
//       return {
//         ...defaultStyle,
//         left: '0',
//         top: '50%',
//         transform: 'translate(0, -50%)',
//       }
//     case 'left-bottom':
//       return { ...defaultStyle, left: '0', bottom: '0', top: 'unset' }
//     case 'center-top':
//       return {
//         ...defaultStyle,
//         left: '50%',
//         top: '0',
//         transform: 'translate(-50%, 0)',
//       }
//     case 'center-middle':
//       return {
//         ...defaultStyle,
//         left: '50%',
//         top: '50%',
//         transform: 'translate(-50%, -50%)',
//       }
//     case 'center-bottom':
//       return {
//         ...defaultStyle,
//         left: '50%',
//         bottom: '0',
//         top: 'unset',
//         transform: 'translate(-50%, 0)',
//       }
//     case 'right-top':
//       return { ...defaultStyle, right: '0', top: '0' }
//     case 'right-middle':
//       return {
//         ...defaultStyle,
//         top: '50%',
//         right: '0',
//         transform: 'translate(0, -50%)',
//       }
//     case 'right-bottom':
//       return { ...defaultStyle, right: '0', bottom: '0', top: 'unset' }
//   }
// }
// /**
//  * this utility handle the horizontal positioning for text module inside broad banners
//  */
// export const overLaySettingsToHorizontalCSS = (
//   value: ILXTeaser['teaserOverlay1Settings'] | ''
// ): {
//   justifyContent: string
//   textAlign: ITeaserOverlayTextAlign
// } => {
//   const splitValue = value.replace('block-', '') as IPosition
//   switch (splitValue) {
//     case 'left-top':
//     case 'left-middle':
//     case 'left-bottom':
//       return {
//         justifyContent: 'flex-start',
//         textAlign: 'left',
//       }
//     case 'center-top':
//     case 'center-middle':
//     case 'center-bottom':
//       return { justifyContent: 'center', textAlign: 'center' }
//     case 'right-top':
//     case 'right-middle':
//     case 'right-bottom':
//       return {
//         justifyContent: 'flex-end',
//         textAlign: 'right',
//       }
//     default:
//       return { justifyContent: 'center', textAlign: 'center' }
//   }
// }

// /**
//  * this utility handle the vertical positioning for text module inside broad banners
//  */
// export const overLaySettingsToVerticalCSS = (
//   value: ILXTeaser['teaserOverlay1Settings'] | ''
// ): {
//   justifyContent: string
// } => {
//   const splitValue = value.replace('block-', '') as IPosition
//   switch (splitValue) {
//     case 'left-top':
//     case 'center-top':
//     case 'right-top':
//       return {
//         justifyContent: 'flex-start',
//       }
//     case 'left-middle':
//     case 'center-middle':
//     case 'right-middle':
//       return { justifyContent: 'center' }
//     case 'left-bottom':
//     case 'center-bottom':
//     case 'right-bottom':
//       return {
//         justifyContent: 'flex-end',
//       }
//     default:
//       return { justifyContent: 'center' }
//   }
// }

// export const overLayTextAlignToCSS = (
//   value?: ITeaserOverlayTextAlign
// ): {
//   justifyContent: string
//   textAlign: ITeaserOverlayTextAlign
//   alignItems: React.CSSProperties['alignItems']
// } => {
//   switch (value) {
//     case 'left':
//       return {
//         justifyContent: 'flex-start',
//         textAlign: 'left',
//         alignItems: 'flex-start',
//       }
//     case 'center':
//       return {
//         justifyContent: 'center',
//         textAlign: 'center',
//         alignItems: 'center',
//       }
//     case 'right':
//       return {
//         justifyContent: 'flex-end',
//         textAlign: 'right',
//         alignItems: 'flex-end',
//       }
//     default:
//       return {
//         justifyContent: 'center',
//         textAlign: 'center',
//         alignItems: 'center',
//       }
//   }
// }

// export const teaserOverlaySettingsToCSS = (
//   value: ILXTeaser['teaserOverlay1Settings'] | '',
//   istextoverlay?: 1 | 0,
//   halfWidth?: string,
//   fullWidth?: string,
//   margin?: string
// ) => {
//   if (istextoverlay === 0) {
//     return {
//       left: 'unset',
//       top: 'unset',
//     }
//   } else {
//     if (value.length === 0 || value === '') {
//       return {
//         left: '0',
//         right: '0',
//         top: 'unset',
//         width: `${fullWidth}`,
//         margin: `${margin}`,
//       }
//     }
//   }

//   const split = value.replace('block-', '') as IPosition

//   return normalizeOverlaySettings(split, halfWidth, fullWidth, margin)
// }

// export const teaserAlignToFlex = (value: React.CSSProperties['textAlign']) => {
//   switch (value) {
//     case 'left':
//       return 'flex-start'
//     case 'right':
//       return 'flex-end'
//     case 'center':
//       return 'center'
//     default:
//       return 'flex-start'
//   }
// }

// export const teaserBackGroundColorToBg = (
//   value: ILXTeaser['teaserBackground'] | React.CSSProperties['backgroundColor'],
//   theme: Theme
// ) => {
//   switch (value) {
//     case 'bg-primary-main':
//       return { backgroundColor: theme.palette.primary.main }
//     case 'bg-primary-light':
//       return { backgroundColor: theme.palette.primary.light }
//     case 'bg-secondary-main':
//       return { backgroundColor: theme.palette.primary.dark }
//     case 'bg-white':
//       return { backgroundColor: theme.palette.color.white.main }
//     case 'bg-grey-main':
//       return { backgroundColor: theme.palette.color.grey.main }
//     case 'bg-grey-lightest':
//       return { backgroundColor: theme.palette.color.grey.lightest }
//     case 'bg-grey-light':
//       return { backgroundColor: theme.palette.color.grey.light }
//     case 'bg-grey-dark':
//       return { backgroundColor: theme.palette.color.grey.dark }
//     case 'bg-black':
//       return { backgroundColor: theme.palette.color.black.main }
//     case '':
//       return { backgroundColor: 'transparent' }
//     default:
//       return { backgroundColor: value }
//   }
// }

// export const cmsModuleVerticalMargin = (
//   marginVertical: string,
//   theme: Theme
// ) => {
//   switch (marginVertical) {
//     case 'X':
//       return { marginBottom: theme.spacing(0) }
//     case 'S':
//       return { marginBottom: theme.spacing(6) }
//     case 'M':
//       return { marginBottom: theme.spacing(10) }
//     case 'L':
//       return { marginBottom: theme.spacing(16) }
//     default:
//       return { marginBottom: theme.spacing(4) }
//   }
// }

// export const cmsModuleLateralMargin = (
//   marginLateral: boolean,
//   theme: Theme
// ) => {
//   return {
//     marginLeft: theme.spacing(marginLateral ? 4 : 0),
//     marginRight: theme.spacing(marginLateral ? 4 : 0),
//     [theme.breakpoints.up('md')]: {
//       marginLeft: theme.spacing(marginLateral ? 8 : 0),
//       marginRight: theme.spacing(marginLateral ? 8 : 0),
//     },
//     [theme.breakpoints.up('lg')]: {
//       marginLeft: theme.spacing(marginLateral ? 8 : 0),
//       marginRight: theme.spacing(marginLateral ? 8 : 0),
//     },
//     [theme.breakpoints.up('xl')]: {
//       marginLeft: theme.spacing(marginLateral ? 16 : 0),
//       marginRight: theme.spacing(marginLateral ? 16 : 0),
//     },
//   }
// }
// export const teaserOverlayStyleToColor = (
//   theme: Theme,
//   value?: ITeaserOverlayStyle
// ) => {
//   switch (value) {
//     case 'text-dark-primary':
//       return {
//         color: theme.palette.text.dark,
//       }
//     case 'text-dark-secondary':
//       return { color: theme.palette.text.dark }
//     case 'text-light-primary':
//       return {
//         color: theme.palette.text.light,
//         // strong: { color: theme.palette.text.light },
//       }
//     case 'text-light-secondary':
//       return { color: theme.palette.text.light }
//     case 'text-dark-primary-shadow':
//       return {
//         color: theme.palette.text.dark,
//       }
//     case 'text-dark-secondary-shadow':
//       return { color: theme.palette.text.dark }
//     case 'text-light-primary-shadow':
//       return { color: theme.palette.text.light }
//     case 'text-light-secondary-shadow':
//       return { color: theme.palette.text.light }
//     default:
//       return { color: theme.palette.text.dark }
//   }
// }

// export const teaserOverlayBackgroundGradient = ({
//   color,
//   settings,
// }: {
//   color?: ITeaserOverlayStyle
//   settings?: ITeaserOverlaySettings
// }) => {
//   if (!color || !settings || !color?.includes('shadow'))
//     return { background: 'transparent' }

//   const backgroundColor = color.includes('light')
//     ? 'rgba(0, 0, 0, 0.5)'
//     : 'rgba(255,255,255, 0.5)'

//   switch (settings) {
//     case 'block-left-top':
//     case 'block-left-middle':
//       return {
//         background: `linear-gradient(90deg, ${backgroundColor} 25%, rgba(255,255,255,0) 50%);`,
//       }
//     case 'block-left-bottom':
//     case 'block-right-bottom':
//     case 'block-center-bottom':
//       return {
//         background: `linear-gradient(0deg, ${backgroundColor} 25%, rgba(255,255,255,0) 50%);`,
//       }
//     case 'block-right-top':
//     case 'block-right-middle':
//       return {
//         background: `linear-gradient(270deg, ${backgroundColor} 25%, rgba(255,255,255,0) 50%);`,
//       }
//     case 'block-center-middle':
//       return {
//         background: `linear-gradient(0deg, ${backgroundColor} 25%, rgba(255,255,255,0) 50%);`,
//       }
//     default:
//       return {
//         background: 'transparent',
//       }
//   }
// }

export const teaserPropsByView = (
  type: IViewType,
): {
  teaserTitle: 'teaserTitle1' | 'teaserTitle2' | 'teaserTitle3' | 'teaserTitle4'
  teaserText: 'teaserText1' | 'teaserText2'
  teaserOverlaySettings: 'teaserOverlay1Settings' | 'teaserOverlay2Settings'
  teaserOverlayTextAlign: 'teaserOverlay1TextAlign' | 'teaserOverlay2TextAlign'
  teaserOverlayStyle: 'teaserOverlay1Style' | 'teaserOverlay2Style'
} => {
  switch (type) {
    case 'text-module':
    case 'square-boards-with-split':
    case 'square-boards-without-split':
    case 'grid-of-boards-two-columns':
    case 'grid-of-boards-three-columns':
    case 'faqs':
      return {
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      }
    case 'full-width-banner':
    case 'landscape-banner':
    case 'squat-banner':
    case 'top-page-banner':
    case 'box-with-margin':
      return {
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      }
    case 'boards-with-fields-below':
      return {
        teaserTitle: 'teaserTitle3',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      }
    case 'combo-mini-slider-plus-box-all-fields':
      return {
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      }
    case 'plp-two-tiles':
      return {
        teaserTitle: 'teaserTitle3',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      }
    default:
      return {
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      }
  }
}

export const replaceTextMediaCmsUrl = (text: string) => {
  if (text) {
    const mediaUrlValue = '{mediaCmsUrl}'
    const re = new RegExp(mediaUrlValue, 'g')

    if (text.indexOf(mediaUrlValue) >= 0) {
      return text.replace(re, 'https://media.grandvision.it/cmsuat')
    }
  }
  return text
}

// export const placementHasTextShadow = ({
//   teaser,
//   viewType,
// }: {
//   teaser?: ILXTeaser
//   viewType?: IViewType
// }): boolean => {
//   try {
//     const moduleTeaser = teaser

//     const { teaserOverlaySettings, teaserOverlayStyle } = teaserPropsByView(
//       viewType || 'default'
//     )

//     const settings: ITeaserOverlaySettings | undefined =
//       moduleTeaser?.[teaserOverlaySettings]
//     const color: ITeaserOverlayStyle | undefined =
//       moduleTeaser?.[teaserOverlayStyle]

//     return (!!color && !!settings && color?.includes('-shadow')) || false
//   } catch (e) {
//     return false
//   }
// }

// export const getBackgroundBasedOnPlacement = (
//   type: string,
//   defaultBackground: string
// ): string => {
//   switch (type) {
//     case 'dcw-products':
//     case 'grid-of-products':
//       return '#F6F6F6'
//     default:
//       return defaultBackground
//   }
// }

// export const getTeaserOverlayTextAlign = (
//   teaserOverlay1TextAlign?: string
// ): ITeaserOverlayTextAlign => {
//   if (!teaserOverlay1TextAlign) {
//     return 'center'
//   }

//   return teaserOverlay1TextAlign === 'justified'
//     ? 'justify'
//     : (teaserOverlay1TextAlign as ITeaserOverlayTextAlign)
// }

// export const getRatioBanner = (
//   type: IViewType,
//   theme: Theme,
//   countItems?: number
// ) => {
//   switch (type) {
//     case 'full-width-banner':
//       return {
//         aspectRatio: '75/104',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '96/65',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '64/29',
//         },
//       }
//     case 'landscape-banner':
//       return {
//         aspectRatio: '375/284',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '192/71',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '32/13',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio: '40/13',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio: '40/13',
//         },
//       }
//     case 'squat-banner':
//       return {
//         aspectRatio: '125/126',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '16/5',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '64/15',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio: '16/3',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio: '6/1',
//         },
//       }
//     case 'top-page-banner':
//       return {
//         aspectRatio: '374/284',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '192/71',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '64/20',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio: '320/71',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio: '9/2',
//         },
//       }
//     case 'box-with-margin':
//       return {
//         aspectRatio: '1/1',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '176/163',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '1/1',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio: '1/1',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio: '1/1',
//         },
//       }
//     case 'combo-mini-slider-plus-box-all-fields':
//       return {
//         aspectRatio: '327/362',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '128/127',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio: '56/61',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio: '1/1',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio: '43/44',
//         },
//       }
//     case 'square-boards-without-split':
//     case 'square-boards-with-split':
//       return {
//         aspectRatio: '1/1',
//       }
//     case 'boards-with-fields-below':
//       return {
//         aspectRatio: countItems === 2 ? '343/362' : '327/362',
//         [theme.breakpoints.up('sm')]: {
//           aspectRatio: '352/181',
//         },
//         [theme.breakpoints.up('md')]: {
//           aspectRatio:
//             countItems === 2
//               ? '238/181'
//               : countItems === 3
//               ? '315/362'
//               : '204/181',
//         },
//         [theme.breakpoints.up('lg')]: {
//           aspectRatio:
//             countItems === 2
//               ? '286/181'
//               : countItems === 3
//               ? '379/362'
//               : '200/181',
//         },
//         [theme.breakpoints.up('xl')]: {
//           aspectRatio:
//             countItems === 2
//               ? '326/181'
//               : countItems === 3
//               ? '216/181'
//               : '200/181',
//         },
//       }
//     default:
//       return null
//   }
// }
