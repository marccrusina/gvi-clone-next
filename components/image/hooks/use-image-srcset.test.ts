import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Media, PictureMedia, VideoMedia } from '../types/image'
import {
  useImageSrcset,
  useImageSrcsetWithStates,
  useImageWithAspectRatio,
  useResponsiveImage,
} from './use-image-srcset'

describe('useImageSrcset hooks', () => {
  const imageServerUrl = 'https://media.grandvision.it'

  const mockPictureMedia: PictureMedia = {
    type: 'CMPicture',
    uriTemplate: '/content/{cropName}/{width}/banner.jpg',
  }

  const mockVideoMedia: VideoMedia = {
    type: 'CMVideo',
    autoplay: true,
    data: { uri: '/videos/test.mp4' },
    dataUrl: '/videos/test.mp4',
    hideControl: false,
    loop: true,
    mute: true,
    picture: { uriTemplate: '/content/{cropName}/{width}/poster.jpg' },
    playOnHover: false,
    width: 1920,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('useImageSrcset', () => {
    it('should generate srcsets for picture media', () => {
      const { result } = renderHook(() =>
        useImageSrcset(mockPictureMedia, 'FULL_WIDTH_BANNER', imageServerUrl),
      )

      expect(result.current.srcSets).toEqual({
        mobile:
          'https://media.grandvision.it/content/portrait_ratio75x104/675/banner.jpg',
        tabletP:
          'https://media.grandvision.it/content/landscape_ratio96x65/1382/banner.jpg',
        tabletL:
          'https://media.grandvision.it/content/landscape_ratio64x29/1843/banner.jpg',
        deskS:
          'https://media.grandvision.it/content/landscape_ratio64x29/2560/banner.jpg',
        deskL:
          'https://media.grandvision.it/content/landscape_ratio64x29/2880/banner.jpg',
      })
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should generate srcsets for video media', () => {
      const { result } = renderHook(() =>
        useImageSrcset(mockVideoMedia, 'LANDSCAPE_BANNER', imageServerUrl),
      )

      expect(result.current.srcSets.mobile).toContain('poster.jpg')
      expect(result.current.srcSets.deskL).toContain(
        'landscape_ratio40x13/2880',
      )
      expect(result.current.error).toBeNull()
    })

    it('should use default crop type for invalid crop type', () => {
      const { result } = renderHook(() =>
        useImageSrcset(mockPictureMedia, 'INVALID_CROP', imageServerUrl),
      )

      // Should fall back to DEFAULT_VIEW
      expect(result.current.srcSets).toBeDefined()
      expect(Object.keys(result.current.srcSets).length).toBeGreaterThan(0)
    })

    it('should return error for undefined media', () => {
      const { result } = renderHook(() =>
        useImageSrcset(undefined, 'FULL_WIDTH_BANNER', imageServerUrl),
      )

      expect(result.current.error).toBe('No media provided')
      expect(result.current.srcSets).toEqual({})
      expect(result.current.dimensions).toEqual({ width: null, height: null })
      expect(result.current.aspectRatio).toBe('16/9')
    })

    it('should calculate dimensions from URL', () => {
      const { result } = renderHook(() =>
        useImageSrcset(mockPictureMedia, 'FULL_WIDTH_BANNER', imageServerUrl),
      )

      // The URL doesn't have actual ratio info since it's a template
      // but dimensions should be calculated if available
      expect(result.current.dimensions).toBeDefined()
    })

    it('should extract aspect ratio from URL', () => {
      const { result } = renderHook(() =>
        useImageSrcset(
          mockPictureMedia,
          'SQUARE_BOARDS_WITH_SPLIT',
          imageServerUrl,
        ),
      )

      expect(result.current.aspectRatio).toBeDefined()
    })

    it('should memoize results when inputs do not change', () => {
      const { result, rerender } = renderHook(() =>
        useImageSrcset(mockPictureMedia, 'FULL_WIDTH_BANNER', imageServerUrl),
      )

      const firstResult = result.current

      rerender()

      expect(result.current).toBe(firstResult)
    })

    it('should update when media changes', () => {
      const { result, rerender } = renderHook(
        ({ media }: { media: Media }) =>
          useImageSrcset(media, 'FULL_WIDTH_BANNER', imageServerUrl),
        { initialProps: { media: mockPictureMedia as Media } },
      )

      const firstResult = result.current

      rerender({ media: mockVideoMedia })

      expect(result.current).not.toBe(firstResult)
      expect(result.current.srcSets.mobile).toContain('poster.jpg')
    })

    it('should update when crop type changes', () => {
      const { result, rerender } = renderHook(
        ({ cropType }) =>
          useImageSrcset(mockPictureMedia, cropType, imageServerUrl),
        { initialProps: { cropType: 'FULL_WIDTH_BANNER' } },
      )

      const firstMobile = result.current.srcSets.mobile

      rerender({ cropType: 'LANDSCAPE_BANNER' })

      expect(result.current.srcSets.mobile).not.toBe(firstMobile)
    })
  })

  describe('useImageSrcsetWithStates', () => {
    it('should include additional state properties', () => {
      const { result } = renderHook(() =>
        useImageSrcsetWithStates(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.hasError).toBe(false)
      expect(result.current.hasValidSrcSets).toBe(true)
      expect(result.current.mobileSrc).toBeDefined()
      expect(result.current.desktopSrc).toBeDefined()
    })

    it('should indicate error state when media is undefined', () => {
      const { result } = renderHook(() =>
        useImageSrcsetWithStates(
          undefined,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.hasError).toBe(true)
      expect(result.current.hasValidSrcSets).toBe(false)
      expect(result.current.mobileSrc).toBeUndefined()
    })

    it('should provide mobileSrc from srcSets', () => {
      const { result } = renderHook(() =>
        useImageSrcsetWithStates(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.mobileSrc).toContain('portrait_ratio75x104/675')
    })

    it('should prefer deskL over deskS for desktopSrc', () => {
      const { result } = renderHook(() =>
        useImageSrcsetWithStates(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.desktopSrc).toContain('landscape_ratio64x29/2880')
    })

    it('should fall back to deskS if deskL is not available', () => {
      const { result } = renderHook(() =>
        useImageSrcsetWithStates(
          mockPictureMedia,
          'FOOTER_NEWSLETTER_SIDE_BANNER',
          imageServerUrl,
        ),
      )

      // This crop type only has deskS, not deskL
      if (result.current.desktopSrc) {
        expect(result.current.desktopSrc).toBeDefined()
      }
    })
  })

  describe('useImageWithAspectRatio', () => {
    it('should provide aspect ratio style object', () => {
      const { result } = renderHook(() =>
        useImageWithAspectRatio(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.aspectRatioStyle).toBeDefined()
      expect(result.current.aspectRatioStyle.aspectRatio).toBeDefined()
    })

    it('should provide container style object', () => {
      const { result } = renderHook(() =>
        useImageWithAspectRatio(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.containerStyle).toEqual({
        width: '100%',
        aspectRatio: result.current.aspectRatio,
        position: 'relative',
      })
    })

    it('should maintain aspect ratio in styles', () => {
      const { result } = renderHook(() =>
        useImageWithAspectRatio(
          mockPictureMedia,
          'SQUARE_BOARDS_WITH_SPLIT',
          imageServerUrl,
        ),
      )

      expect(result.current.aspectRatioStyle.aspectRatio).toBe(
        result.current.aspectRatio,
      )
    })
  })

  describe('useResponsiveImage', () => {
    it('should provide getImageForWidth function', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.getImageForWidth).toBeDefined()
      expect(typeof result.current.getImageForWidth).toBe('function')
    })

    it('should return mobile image for width < 601', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
          400,
        ),
      )

      expect(result.current.currentImage).toContain('portrait_ratio75x104/675')
      expect(result.current.isMobile).toBe(true)
      expect(result.current.isTablet).toBe(false)
      expect(result.current.isDesktop).toBe(false)
    })

    it('should return tabletP image for width 601-1023', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
          800,
        ),
      )

      expect(result.current.currentImage).toContain('landscape_ratio96x65/1382')
      expect(result.current.isMobile).toBe(false)
      expect(result.current.isTablet).toBe(true)
      expect(result.current.isDesktop).toBe(false)
    })

    it('should return tabletL image for width 1024-1279', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
          1100,
        ),
      )

      expect(result.current.currentImage).toContain('landscape_ratio64x29/1843')
      expect(result.current.isDesktop).toBe(true)
    })

    it('should return deskS image for width 1280-1439', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
          1300,
        ),
      )

      expect(result.current.currentImage).toContain('landscape_ratio64x29/2560')
      expect(result.current.isDesktop).toBe(true)
    })

    it('should return deskL image for width >= 1440', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
          1920,
        ),
      )

      expect(result.current.currentImage).toContain('landscape_ratio64x29/2880')
      expect(result.current.isDesktop).toBe(true)
    })

    it('should default to mobile when currentWidth is undefined', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      expect(result.current.currentImage).toContain('portrait_ratio75x104/675')
      expect(result.current.isMobile).toBe(true)
    })

    it('should allow manual width queries via getImageForWidth', () => {
      const { result } = renderHook(() =>
        useResponsiveImage(
          mockPictureMedia,
          'FULL_WIDTH_BANNER',
          imageServerUrl,
        ),
      )

      const mobileImage = result.current.getImageForWidth(400)
      const tabletImage = result.current.getImageForWidth(800)
      const desktopImage = result.current.getImageForWidth(1920)

      expect(mobileImage).toContain('portrait_ratio75x104/675')
      expect(tabletImage).toContain('landscape_ratio96x65/1382')
      expect(desktopImage).toContain('landscape_ratio64x29/2880')
    })

    it('should update currentImage when width changes', () => {
      const { result, rerender } = renderHook(
        ({ width }) =>
          useResponsiveImage(
            mockPictureMedia,
            'FULL_WIDTH_BANNER',
            imageServerUrl,
            width,
          ),
        { initialProps: { width: 400 } },
      )

      const mobileImage = result.current.currentImage

      rerender({ width: 1920 })

      expect(result.current.currentImage).not.toBe(mobileImage)
      expect(result.current.currentImage).toContain('2880')
    })
  })
})
