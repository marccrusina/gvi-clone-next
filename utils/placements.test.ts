import { describe, expect, it } from 'vitest'
import type { IViewType } from '@/types/ViewType'
import { replaceTextMediaCmsUrl, teaserPropsByView } from './placements'

describe('placements utils', () => {
  describe('teaserPropsByView', () => {
    it('should return overlay2 settings for text-module view', () => {
      const result = teaserPropsByView('text-module')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay2 settings for square-boards-with-split view', () => {
      const result = teaserPropsByView('square-boards-with-split')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay2 settings for square-boards-without-split view', () => {
      const result = teaserPropsByView('square-boards-without-split')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay2 settings for grid-of-boards-two-columns view', () => {
      const result = teaserPropsByView('grid-of-boards-two-columns')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay2 settings for grid-of-boards-three-columns view', () => {
      const result = teaserPropsByView('grid-of-boards-three-columns')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay2 settings for faqs view', () => {
      const result = teaserPropsByView('faqs')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle4',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return overlay1 settings for full-width-banner view', () => {
      const result = teaserPropsByView('full-width-banner')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return overlay1 settings for landscape-banner view', () => {
      const result = teaserPropsByView('landscape-banner')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return overlay1 settings for squat-banner view', () => {
      const result = teaserPropsByView('squat-banner')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return overlay1 settings for top-page-banner view', () => {
      const result = teaserPropsByView('top-page-banner')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return overlay1 settings for box-with-margin view', () => {
      const result = teaserPropsByView('box-with-margin')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return teaserTitle3 for boards-with-fields-below view', () => {
      const result = teaserPropsByView('boards-with-fields-below')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle3',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return mixed settings for combo-mini-slider-plus-box-all-fields view', () => {
      const result = teaserPropsByView('combo-mini-slider-plus-box-all-fields')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText2',
        teaserOverlaySettings: 'teaserOverlay2Settings',
        teaserOverlayTextAlign: 'teaserOverlay2TextAlign',
        teaserOverlayStyle: 'teaserOverlay2Style',
      })
    })

    it('should return teaserTitle3 with overlay1 for plp-two-tiles view', () => {
      const result = teaserPropsByView('plp-two-tiles')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle3',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return default overlay1 settings for unknown view type', () => {
      const result = teaserPropsByView('unknown-view-type' as IViewType)

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })

    it('should return default settings for default view', () => {
      const result = teaserPropsByView('default')

      expect(result).toEqual({
        teaserTitle: 'teaserTitle1',
        teaserText: 'teaserText1',
        teaserOverlaySettings: 'teaserOverlay1Settings',
        teaserOverlayTextAlign: 'teaserOverlay1TextAlign',
        teaserOverlayStyle: 'teaserOverlay1Style',
      })
    })
  })

  describe('replaceTextMediaCmsUrl', () => {
    it('should replace {mediaCmsUrl} with actual URL', () => {
      const input = 'Check out {mediaCmsUrl}/image.jpg'
      const result = replaceTextMediaCmsUrl(input)

      expect(result).toBe(
        'Check out https://media.grandvision.it/cmsuat/image.jpg',
      )
    })

    it('should replace multiple occurrences of {mediaCmsUrl}', () => {
      const input = '{mediaCmsUrl}/image1.jpg and {mediaCmsUrl}/image2.jpg'
      const result = replaceTextMediaCmsUrl(input)

      expect(result).toBe(
        'https://media.grandvision.it/cmsuat/image1.jpg and https://media.grandvision.it/cmsuat/image2.jpg',
      )
    })

    it('should return original text when no {mediaCmsUrl} is present', () => {
      const input = 'No media URL here'
      const result = replaceTextMediaCmsUrl(input)

      expect(result).toBe('No media URL here')
    })

    it('should return empty string when input is empty', () => {
      const result = replaceTextMediaCmsUrl('')

      expect(result).toBe('')
    })

    it('should handle text with only {mediaCmsUrl}', () => {
      const input = '{mediaCmsUrl}'
      const result = replaceTextMediaCmsUrl(input)

      expect(result).toBe('https://media.grandvision.it/cmsuat')
    })

    it('should handle undefined input gracefully', () => {
      const result = replaceTextMediaCmsUrl(undefined as unknown as string)

      expect(result).toBeUndefined()
    })

    it('should handle null input gracefully', () => {
      const result = replaceTextMediaCmsUrl(null as unknown as string)

      expect(result).toBeNull()
    })

    it('should preserve surrounding text when replacing', () => {
      const input = 'Start {mediaCmsUrl}/path End'
      const result = replaceTextMediaCmsUrl(input)

      expect(result).toBe('Start https://media.grandvision.it/cmsuat/path End')
    })
  })
})
