import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ICMCollection } from '@/types/CMCollection'
import type { ICMExternalProduct } from '@/types/CMExternalProduct'
import type { ILXTeaser } from '@/types/LXTeaser'
import type { IPlacement } from '@/types/Placement'
import useCmsTeaserBanner from './useCmsTeaserBanner'
import useMediaByDeviceType from './useMediaByDeviceType'

// Mock dependencies
vi.mock('./useMediaByDeviceType')
vi.mock('@/utils/placements', () => ({
  replaceTextMediaCmsUrl: (text: string) =>
    text.replace('{mediaCmsUrl}', 'https://media.grandvision.it/cmsuat'),
  teaserPropsByView: (_viewType: string) => ({
    teaserTitle: 'teaserTitle1',
    teaserText: 'teaserText1',
    teaserOverlaySettings: 'teaserOverlay1Settings',
    teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
    teaserOverlayStyle: 'teaserOverlay1Style',
  }),
}))
vi.mock('@/types/Placement', () => ({
  isVideoMedia: vi.fn((_media: unknown) => false),
}))

describe('useCmsTeaserBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMediaByDeviceType).mockReturnValue(undefined)
  })

  it('should return default values when no item is provided', () => {
    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: undefined,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserTitleValue).toBe('')
    expect(result.current.teaserTextValue).toBe('')
    expect(result.current.promoteToH1).toBe(false)
    expect(result.current.teaserLXCallToActionSettings).toEqual([])
    expect(result.current.teaserPreTitle).toBe('')
    expect(result.current.toLink).toBe('')
  })

  it('should extract teaser properties from item', () => {
    const mockItem: Partial<ILXTeaser> = {
      teaserTitle1: 'Test Title',
      teaserText1: 'Test Text',
      promoteToH1: true,
      teaserPreTitle: 'Pre Title',
      teaserIcon: 'icon-test',
      teaserBackground: 'bg-primary-main',
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserTitleValue).toBe('Test Title')
    expect(result.current.teaserTextValue).toBe('Test Text')
    expect(result.current.promoteToH1).toBe(true)
    expect(result.current.teaserPreTitle).toBe('Pre Title')
    expect(result.current.teaserIcon).toBe('icon-test')
    expect(result.current.teaserBackground).toBe('bg-primary-main')
  })

  it('should replace media CMS URL in teaser text', () => {
    const mockItem: Partial<ILXTeaser> = {
      teaserText1: 'Text with {mediaCmsUrl}/image.jpg',
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserTextValue).toBe(
      'Text with https://media.grandvision.it/cmsuat/image.jpg',
    )
  })

  // it('should extract call to action settings with link', () => {
  //   const mockItem: Partial<ILXTeaser> = {
  //     teaserLXCallToActionSettings: [
  //       {
  //         target: {
  //           formattedUrl: 'https://example.com',
  //           type: 'CMExternalLink',
  //         },
  //         callToActionText: 'Click Me',
  //         style: 'arn-cta--primary',
  //       },
  //     ],
  //   }

  //   const { result } = renderHook(() =>
  //     useCmsTeaserBanner({
  //       item: mockItem as ILXTeaser,
  //       placement: undefined,
  //       viewType: 'default',
  //     }),
  //   )

  //   expect(result.current.toLink).toBe('https://example.com')
  //   expect(result.current.isExternalLink).toBe(true)
  // })

  // it('should detect frame advisor action type', () => {
  //   const mockItem: Partial<ILXTeaser> = {
  //     teaserLXCallToActionSettings: [
  //       {
  //         target: {
  //           type: 'Action',
  //           idAction: 'frame-advisor',
  //         },
  //         style: 'arn-cta--primary',
  //       },
  //     ],
  //   }

  //   const { result } = renderHook(() =>
  //     useCmsTeaserBanner({
  //       item: mockItem as ILXTeaser,
  //       placement: undefined,
  //       viewType: 'default',
  //     }),
  //   )

  //   expect(result.current.isFrameAdvisor).toBe(true)
  // })

  it('should handle countdown settings', () => {
    const mockItem: Partial<ILXTeaser> = {
      teaserCountdownStart: '2024-01-01',
      teaserCountdownUntil: '2024-12-31',
      teaserHideExpiredCountdown: true,
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserCountdownStart).toBe('2024-01-01')
    expect(result.current.teaserCountdownUntil).toBe('2024-12-31')
    expect(result.current.teaserHideExpiredCountdown).toBe(true)
  })

  it('should extract hot zones from item', () => {
    const mockHotZones = [{ x: 10, y: 20, width: 100, height: 50 }]
    const mockItem: Partial<ILXTeaser> = {
      hotZones: mockHotZones as unknown as ILXTeaser['hotZones'],
      hotZonesSettings: {
        enabled: true,
      } as unknown as ILXTeaser['hotZonesSettings'],
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.placementHotZones).toEqual(mockHotZones)
    expect(result.current.isShoppableImage).toBe(true)
  })

  it('should extract hot zones from placement when not in item', () => {
    const mockHotZones = [{ x: 5, y: 10, width: 50, height: 25 }]
    const mockPlacement = {
      teasableItems: [
        {
          hotZones: mockHotZones,
        },
      ],
    } as unknown as IPlacement

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: {} as ILXTeaser,
        placement: mockPlacement as IPlacement,
        viewType: 'default',
      }),
    )

    expect(result.current.placementHotZones).toEqual(mockHotZones)
  })

  it('should handle ICMCollection placement type with items', () => {
    const mockHotZones = [{ x: 1, y: 2, width: 3, height: 4 }]
    const mockPlacement = {
      items: [
        {
          hotZones: mockHotZones,
        },
      ],
    } as unknown as ICMCollection

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: {} as ILXTeaser,
        placement: mockPlacement as ICMCollection,
        viewType: 'default',
      }),
    )

    expect(result.current.placementHotZones).toEqual(mockHotZones)
  })

  it('should extract related product data', () => {
    const mockProductData = { id: '123', name: 'Test Product' }
    const mockItem = {
      relatedProduct: [
        {
          type: 'CMProductTeaser',
          productData: mockProductData,
        },
      ],
    } as unknown as ILXTeaser

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.filterRelatedProduct?.type).toBe('CMProductTeaser')
    expect(result.current.productData).toEqual(mockProductData)
  })

  it('should handle CMExternalProduct type', () => {
    const mockItem: Partial<ILXTeaser> = {
      relatedProduct: [
        {
          type: 'CMExternalProduct',
          viewtype: 'default',
          teaserTitle1: 'Test',
        } as ICMExternalProduct,
      ],
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.filterRelatedProduct?.type).toBe('CMExternalProduct')
    expect(result.current.productData).toBeNull()
  })

  it('should detect terms and conditions target', () => {
    const mockItem = {
      targetsTermsAndConditions: {
        target: { id: 'terms-123' },
      },
    } as unknown as ILXTeaser

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.itemHasTermsAndCondition).toBe(true)
  })

  it('should call useMediaByDeviceType with item media', () => {
    const mockMedia = [{ url: 'image.jpg', type: 'image' }]
    const mockItem = {
      media: mockMedia,
    } as unknown as ILXTeaser

    renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(useMediaByDeviceType).toHaveBeenCalledWith(mockMedia)
  })

  it('should handle different viewTypes', () => {
    const viewTypes = [
      'text-module',
      'full-width-banner',
      'landscape-banner',
    ] as const

    viewTypes.forEach((viewType) => {
      const { result } = renderHook(() =>
        useCmsTeaserBanner({
          item: { teaserTitle1: 'Title' } as ILXTeaser,
          placement: undefined,
          viewType,
        }),
      )

      expect(result.current.teaserTitleValue).toBe('Title')
    })
  })

  it('should return correct property names from teaserPropsByView', () => {
    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: {} as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserTitle).toBe('teaserTitle1')
    expect(result.current.teaserText).toBe('teaserText1')
  })

  it('should handle empty teaserLXCallToActionSettings', () => {
    const mockItem: Partial<ILXTeaser> = {
      teaserLXCallToActionSettings: [],
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.toLink).toBe('')
    expect(result.current.isExternalLink).toBe(false)
  })

  it('should handle overlay settings', () => {
    const mockItem: Partial<ILXTeaser> = {
      teaserOverlay1Settings: 'block-left-top',
      teaserOverlay1TextAlign: 'center',
      teaserOverlay1Style: 'text-dark-primary',
    }

    const { result } = renderHook(() =>
      useCmsTeaserBanner({
        item: mockItem as ILXTeaser,
        placement: undefined,
        viewType: 'default',
      }),
    )

    expect(result.current.teaserOverlaySettingsValue).toBe('block-left-top')
    expect(result.current.teaserOverlayTextAlignValue).toBe('center')
    expect(result.current.teaserOverlayStyleValue).toBe('text-dark-primary')
  })
})
