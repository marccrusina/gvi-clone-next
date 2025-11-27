import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IMedia } from '@/types/Media'
import useBreakpoints from './useBreakpoints'
import useMediaByDeviceType, {
  getMediaByDeviceType,
} from './useMediaByDeviceType'

// Mock dependencies
vi.mock('./useBreakpoints')

const mockBreakpoints = (
  overrides: Partial<ReturnType<typeof useBreakpoints>> = {},
): ReturnType<typeof useBreakpoints> => ({
  isViewportWidthUnder375: false,
  isMobile: false,
  isTablet: false,
  isTabletPortrait: false,
  isTabletLandscape: false,
  isDesktop: false,
  isDesktopS: false,
  isDesktopL: false,
  ...overrides,
})

describe('useMediaByDeviceType', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return first media when desktop (not mobile)', () => {
    vi.mocked(useBreakpoints).mockReturnValue(
      mockBreakpoints({
        isDesktop: true,
        isDesktopS: true,
      }),
    )

    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
    ]

    const { result } = renderHook(() => useMediaByDeviceType(medias))

    expect(result.current).toEqual(medias[0])
  })

  it('should return second media when mobile and multiple medias exist', () => {
    vi.mocked(useBreakpoints).mockReturnValue(
      mockBreakpoints({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }),
    )

    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
    ]

    const { result } = renderHook(() => useMediaByDeviceType(medias))

    expect(result.current).toEqual(medias[1])
  })

  it('should return first media when mobile but only one media exists', () => {
    vi.mocked(useBreakpoints).mockReturnValue(
      mockBreakpoints({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }),
    )

    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
    ]

    const { result } = renderHook(() => useMediaByDeviceType(medias))

    expect(result.current).toEqual(medias[0])
  })

  it('should return undefined when no medias provided', () => {
    vi.mocked(useBreakpoints).mockReturnValue(
      mockBreakpoints({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }),
    )

    const medias: IMedia[] = []

    const { result } = renderHook(() => useMediaByDeviceType(medias))

    expect(result.current).toBeUndefined()
  })

  it('should call useBreakpoints hook', () => {
    vi.mocked(useBreakpoints).mockReturnValue(
      mockBreakpoints({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }),
    )

    const medias: IMedia[] = [
      { url: 'test.jpg', type: 'image' } as unknown as IMedia,
    ]

    renderHook(() => useMediaByDeviceType(medias))

    expect(useBreakpoints).toHaveBeenCalled()
  })
})

describe('getMediaByDeviceType', () => {
  it('should return first media when not mobile', () => {
    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
    ]

    const result = getMediaByDeviceType(false, medias)

    expect(result).toEqual(medias[0])
  })

  it('should return second media when mobile and multiple medias exist', () => {
    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
    ]

    const result = getMediaByDeviceType(true, medias)

    expect(result).toEqual(medias[1])
  })

  it('should return first media when mobile but only one media', () => {
    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
    ]

    const result = getMediaByDeviceType(true, medias)

    expect(result).toEqual(medias[0])
  })

  it('should return undefined when medias is undefined', () => {
    const result = getMediaByDeviceType(false, undefined)

    expect(result).toBeUndefined()
  })

  it('should return undefined when medias is empty array', () => {
    const result = getMediaByDeviceType(false, [])

    expect(result).toBeUndefined()
  })

  it('should handle three or more medias correctly on desktop', () => {
    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
      { url: 'tablet.jpg', type: 'image' } as unknown as IMedia,
    ]

    const result = getMediaByDeviceType(false, medias)

    expect(result).toEqual(medias[0])
  })

  it('should handle three or more medias correctly on mobile', () => {
    const medias: IMedia[] = [
      { url: 'desktop.jpg', type: 'image' } as unknown as IMedia,
      { url: 'mobile.jpg', type: 'image' } as unknown as IMedia,
      { url: 'tablet.jpg', type: 'image' } as unknown as IMedia,
    ]

    const result = getMediaByDeviceType(true, medias)

    expect(result).toEqual(medias[1])
  })
})
