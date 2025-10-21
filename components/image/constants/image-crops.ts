import type { ImageCrops } from '../types/image'

export const imageCrops: ImageCrops = {
  FULL_WIDTH_BANNER: {
    deskL: {
      crop: 'landscape_ratio64x29',
      width: 2880,
    },
    deskS: {
      crop: 'landscape_ratio64x29',
      width: 2560,
    },
    tabletL: {
      crop: 'landscape_ratio64x29',
      width: 1843,
    },
    tabletP: {
      crop: 'landscape_ratio96x65',
      width: 1382,
    },
    mobile: {
      crop: 'portrait_ratio75x104',
      width: 675,
    },
  },

  LANDSCAPE_BANNER: {
    deskL: {
      crop: 'landscape_ratio40x13',
      width: 2880,
    },
    deskS: {
      crop: 'landscape_ratio40x13',
      width: 2560,
    },
    tabletL: {
      crop: 'landscape_ratio32x13',
      width: 1843,
    },
    tabletP: {
      crop: 'landscape_ratio192x71',
      width: 1382,
    },
    mobile: {
      crop: 'landscape_ratio375x284',
      width: 675,
    },
  },

  TOP_PAGE_BANNER: {
    deskL: {
      crop: 'landscape_ratio9x2',
      width: 2880,
    },
    deskS: {
      crop: 'landscape_ratio320x71',
      width: 2560,
    },
    tabletL: {
      crop: 'landscape_ratio64x29',
      width: 1843,
    },
    tabletP: {
      crop: 'landscape_ratio192x71',
      width: 1382,
    },
    mobile: {
      crop: 'landscape_ratio374x284',
      width: 675,
    },
  },

  SQUAT_BANNER: {
    deskL: {
      crop: 'landscape_ratio6x1',
      width: 2880,
    },
    deskS: {
      crop: 'landscape_ratio16x3',
      width: 2560,
    },
    tabletL: {
      crop: 'landscape_ratio16x5',
      width: 1382,
    },
    tabletP: {
      crop: 'landscape_ratio64x15',
      width: 1843,
    },
    mobile: {
      crop: 'portrait_ratio125x126',
      width: 675,
    },
  },

  BOX_WITH_MARGIN_BANNER: {
    deskL: {
      crop: 'landscape_ratio1x1',
      width: 1376,
    },
    deskS: {
      crop: 'landscape_ratio1x1',
      width: 1376,
    },
    tabletL: {
      crop: 'landscape_ratio1x1',
      width: 749,
    },
    tabletP: {
      crop: 'landscape_ratio176x163',
      width: 1267,
    },
    mobile: {
      crop: 'landscape_ratio1x1',
      width: 617,
    },
  },

  BOARD_WITH_FIELDS_2_ITEMS: {
    deskL: {
      crop: 'landscape_ratio326x181',
      width: 1304,
    },
    deskS: {
      crop: 'landscape_ratio286x181',
      width: 1144,
    },
    tabletL: {
      crop: 'landscape_ratio238x181',
      width: 857,
    },
    tabletP: {
      crop: 'landscape_ratio352x181',
      width: 1267,
    },
    mobile: {
      crop: 'portrait_ratio343x362',
      width: 617,
    },
  },

  BOARD_WITH_FIELDS_3_ITEMS: {
    deskL: {
      crop: 'landscape_ratio216x181',
      width: 864,
    },
    deskS: {
      crop: 'landscape_ratio379x362',
      width: 758,
    },
    tabletL: {
      crop: 'portrait_ratio315x362',
      width: 567,
    },
    tabletP: {
      crop: 'landscape_ratio352x181',
      width: 1267,
    },
    mobile: {
      crop: 'portrait_ratio327x362',
      width: 589,
    },
  },

  BOARD_WITH_FIELDS_4_ITEMS: {
    deskL: {
      crop: 'landscape_ratio200x181',
      width: 800,
    },
    deskS: {
      crop: 'landscape_ratio200x181',
      width: 800,
    },
    tabletL: {
      crop: 'landscape_ratio204x181',
      width: 734,
    },
    tabletP: {
      crop: 'landscape_ratio352x181',
      width: 1267,
    },
    mobile: {
      crop: 'portrait_ratio327x362',
      width: 589,
    },
  },

  SQUARE_BOARDS_WITH_SPLIT: {
    deskL: {
      crop: 'landscape_ratio1x1',
      width: 1280,
    },
    deskS: {
      crop: 'landscape_ratio1x1',
      width: 1120,
    },
    tabletL: {
      crop: 'landscape_ratio1x1',
      width: 835,
    },
    tabletP: {
      crop: 'landscape_ratio1x1',
      width: 605,
    },
    mobile: {
      crop: 'landscape_ratio1x1',
      width: 675,
    },
  },

  SQUARE_BOARDS_WITHOUT_SPLIT: {
    deskL: {
      crop: 'landscape_ratio1x1',
      width: 1440,
    },
    deskS: {
      crop: 'landscape_ratio1x1',
      width: 1280,
    },
    tabletL: {
      crop: 'landscape_ratio1x1',
      width: 922,
    },
    tabletP: {
      crop: 'landscape_ratio1x1',
      width: 691,
    },
    mobile: {
      crop: 'landscape_ratio1x1',
      width: 675,
    },
  },

  COMBO_MINI_SLIDER_SMALL: {
    deskL: {
      crop: 'portrait_ratio18x19',
      width: 720,
    },
    deskS: {
      crop: 'portrait_ratio18x19',
      width: 720,
    },
    tabletL: {
      crop: 'portrait_ratio187x197',
      width: 337,
    },
    tabletP: {
      crop: 'landscape_ratio352x181',
      width: 1267,
    },
    mobile: {
      crop: 'landscape_ratio1x1',
      width: 675,
    },
  },

  COMBO_MINI_SLIDER_BIG: {
    deskL: {
      crop: 'portrait_ratio43x44',
      width: 1376,
    },
    deskS: {
      crop: 'landscape_ratio1x1',
      width: 1216,
    },
    tabletL: {
      crop: 'portrait_ratio56x61',
      width: 806,
    },
    tabletP: {
      crop: 'landscape_ratio128x127',
      width: 1382,
    },
    mobile: {
      crop: 'portrait_ratio327x362',
      width: 589,
    },
  },

  PLP_TWO_TILES: {
    deskL: {
      crop: 'landscape_ratio863x416',
      width: 1726,
    },
    deskS: {
      crop: 'landscape_ratio755x361',
      width: 1510,
    },
    tabletL: {
      crop: 'landscape_ratio317x149',
      width: 1141,
    },
    tabletP: {
      crop: 'portrait_ratio343x359',
      width: 617,
    },
    mobile: {
      crop: 'portrait_ratio343x345',
      width: 617,
    },
  },

  CART_PROMO_BANNER: {
    deskL: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
    deskS: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
    tabletL: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
    tabletP: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
    mobile: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
  },

  AVATAR_MEGA_MENU: {
    deskL: {
      crop: 'portrait_ratio1x1',
      width: 96,
    },
    deskS: {
      crop: 'portrait_ratio1x1',
      width: 96,
    },
    tabletL: {
      crop: 'portrait_ratio1x1',
      width: 96,
    },
    tabletP: {
      crop: 'portrait_ratio1x1',
      width: 96,
    },
    mobile: {
      crop: 'portrait_ratio1x1',
      width: 96,
    },
  },

  BIG_MENU_BANNER: {
    deskL: {
      crop: 'portrait_ratio1x1',
      width: 1296,
    },
    deskS: {
      crop: 'portrait_ratio1x1',
      width: 1296,
    },
    tabletL: {
      crop: 'portrait_ratio1x1',
      width: 1296,
    },
    tabletP: {
      crop: 'portrait_ratio1x1',
      width: 1296,
    },
    mobile: {
      crop: 'portrait_ratio1x1',
      width: 740,
    },
  },

  QUERY_LIST: {
    deskL: {
      crop: 'portrait_ratio1x1',
      width: 832,
    },
    deskS: {
      crop: 'portrait_ratio1x1',
      width: 416,
    },
    tabletL: {
      crop: 'portrait_ratio1x1',
      width: 416,
    },
    tabletP: {
      crop: 'portrait_ratio1x1',
      width: 416,
    },
    mobile: {
      crop: 'portrait_ratio11x12',
      width: 327,
    },
  },

  FOOTER_NEWSLETTER_SIDE_BANNER: {
    deskS: {
      crop: 'portrait_ratio111x128',
      width: 222,
    },
    tabletP: {
      crop: 'portrait_ratio111x128',
      width: 222,
    },
    mobile: {
      crop: 'portrait_ratio111x128',
      width: 200,
    },
  },

  FOOTER_NEWSLETTER_DRAWER: {
    deskS: {
      crop: 'portrait_ratio233x396',
      width: 466,
    },
    tabletP: {
      crop: 'portrait_ratio233x396',
      width: 466,
    },
    mobile: {
      crop: 'landscape_ratio358x179',
      width: 618,
    },
  },

  DEFAULT_VIEW: {
    deskL: {
      crop: 'landscape_ratio216x181',
      width: 864,
    },
    deskS: {
      crop: 'landscape_ratio379x362',
      width: 758,
    },
    tabletL: {
      crop: 'portrait_ratio315x362',
      width: 567,
    },
    tabletP: {
      crop: 'landscape_ratio352x181',
      width: 1267,
    },
    mobile: {
      crop: 'portrait_ratio327x362',
      width: 589,
    },
  },
}
