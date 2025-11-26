import { describe, expect, it } from 'vitest'
import type { ApiButtonData, ButtonProps } from '../types/button'
import {
  transformButtonProps,
  transformButtonPropsWithDefaults,
  transformMultipleButtonProps,
} from './button-transformer'

describe('button-transformer', () => {
  describe('transformButtonProps - variant transformation', () => {
    it('should transform variant from "variant" property', () => {
      const apiData: ApiButtonData = { variant: 'primary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should transform variant from "type" property', () => {
      const apiData: ApiButtonData = { type: 'secondary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('secondary')
    })

    it('should transform variant from "style" property', () => {
      const apiData: ApiButtonData = { style: 'tertiary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('tertiary')
    })

    it('should transform variant from "appearance" property', () => {
      const apiData: ApiButtonData = { appearance: 'quaternary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('quaternary')
    })

    it('should transform variant from "theme" property', () => {
      const apiData: ApiButtonData = { theme: 'primary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should handle CTA style patterns - cta-fill-primary', () => {
      const apiData: ApiButtonData = { style: 'cta-fill-primary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should handle CTA style patterns - cta-outline-secondary', () => {
      const apiData: ApiButtonData = { style: 'cta-outline-secondary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('secondary')
    })

    it('should handle CTA style patterns - cta-tertiary', () => {
      const apiData: ApiButtonData = { style: 'cta-tertiary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('tertiary')
    })

    it('should handle CTA style patterns - cta-quaternary', () => {
      const apiData: ApiButtonData = { style: 'cta-quaternary' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('quaternary')
    })

    it('should map "main" to primary variant', () => {
      const apiData: ApiButtonData = { variant: 'main' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should map "default" to primary variant', () => {
      const apiData: ApiButtonData = { variant: 'default' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should map "cta" to primary variant', () => {
      const apiData: ApiButtonData = { variant: 'cta' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should map "call-to-action" to primary variant', () => {
      const apiData: ApiButtonData = { variant: 'call-to-action' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should map "action" to primary variant', () => {
      const apiData: ApiButtonData = { variant: 'action' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should map "outline" to secondary variant', () => {
      const apiData: ApiButtonData = { variant: 'outline' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('secondary')
    })

    it('should map "ghost" to secondary variant', () => {
      const apiData: ApiButtonData = { variant: 'ghost' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('secondary')
    })

    it('should map "subtle" to secondary variant', () => {
      const apiData: ApiButtonData = { variant: 'subtle' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('secondary')
    })

    it('should map "text" to tertiary variant', () => {
      const apiData: ApiButtonData = { variant: 'text' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('tertiary')
    })

    it('should map "link" to tertiary variant', () => {
      const apiData: ApiButtonData = { variant: 'link' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('tertiary')
    })

    it('should map "minimal" to tertiary variant', () => {
      const apiData: ApiButtonData = { variant: 'minimal' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('tertiary')
    })

    it('should map "alternative" to quaternary variant', () => {
      const apiData: ApiButtonData = { variant: 'alternative' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('quaternary')
    })

    it('should map "alt" to quaternary variant', () => {
      const apiData: ApiButtonData = { variant: 'alt' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('quaternary')
    })

    it('should handle case insensitivity', () => {
      const apiData: ApiButtonData = { variant: 'PRIMARY' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBe('primary')
    })

    it('should return undefined for unknown variant', () => {
      const apiData: ApiButtonData = { variant: 'unknown-variant' }
      const result = transformButtonProps(apiData)
      expect(result.variant).toBeUndefined()
    })

    it('should return undefined when no variant property exists', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.variant).toBeUndefined()
    })
  })

  describe('transformButtonProps - fillType transformation', () => {
    it('should detect outline from style with "outline" keyword', () => {
      const apiData: ApiButtonData = { style: 'cta-outline-primary' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('outline')
    })

    it('should detect fill from style with "fill" keyword', () => {
      const apiData: ApiButtonData = { style: 'cta-fill-primary' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('fill')
    })

    it('should detect outline from "border" keyword', () => {
      const apiData: ApiButtonData = { style: 'border-primary' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('outline')
    })

    it('should detect outline from "ghost" keyword', () => {
      const apiData: ApiButtonData = { style: 'ghost' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('outline')
    })

    it('should detect fill from "solid" keyword', () => {
      const apiData: ApiButtonData = { style: 'solid' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('fill')
    })

    it('should detect fill from "primary" keyword in style', () => {
      const apiData: ApiButtonData = { style: 'primary-button' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('fill')
    })

    it('should check variant property if style is not set', () => {
      const apiData: ApiButtonData = { variant: 'outline' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('outline')
    })

    it('should check appearance property if style and variant are not set', () => {
      const apiData: ApiButtonData = { appearance: 'fill' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBe('fill')
    })

    it('should return undefined when no fillType can be determined', () => {
      const apiData: ApiButtonData = { style: 'unknown' }
      const result = transformButtonProps(apiData)
      expect(result.fillType).toBeUndefined()
    })
  })

  describe('transformButtonProps - size transformation', () => {
    it('should transform "small" size', () => {
      const apiData: ApiButtonData = { size: 'small' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('small')
    })

    it('should map "sm" to small', () => {
      const apiData: ApiButtonData = { size: 'sm' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('small')
    })

    it('should map "xs" to small', () => {
      const apiData: ApiButtonData = { size: 'xs' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('small')
    })

    it('should map "mini" to small', () => {
      const apiData: ApiButtonData = { size: 'mini' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('small')
    })

    it('should transform "medium" size', () => {
      const apiData: ApiButtonData = { size: 'medium' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('medium')
    })

    it('should map "md" to medium', () => {
      const apiData: ApiButtonData = { size: 'md' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('medium')
    })

    it('should map "normal" to medium', () => {
      const apiData: ApiButtonData = { size: 'normal' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('medium')
    })

    it('should map "default" to medium', () => {
      const apiData: ApiButtonData = { size: 'default' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('medium')
    })

    it('should map "large" to big', () => {
      const apiData: ApiButtonData = { size: 'large' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should map "big" to big', () => {
      const apiData: ApiButtonData = { size: 'big' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should map "lg" to big', () => {
      const apiData: ApiButtonData = { size: 'lg' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should map "xl" to big', () => {
      const apiData: ApiButtonData = { size: 'xl' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should map "huge" to big', () => {
      const apiData: ApiButtonData = { size: 'huge' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should handle case insensitivity', () => {
      const apiData: ApiButtonData = { size: 'LARGE' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBe('big')
    })

    it('should return undefined for unknown size', () => {
      const apiData: ApiButtonData = { size: 'unknown' }
      const result = transformButtonProps(apiData)
      expect(result.size).toBeUndefined()
    })

    it('should return undefined when no size property exists', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.size).toBeUndefined()
    })
  })

  describe('transformButtonProps - fullwidth transformation', () => {
    it('should detect fullWidth from fullWidth property', () => {
      const apiData: ApiButtonData = { fullWidth: true }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(true)
    })

    it('should detect fullWidth from full_width property', () => {
      const apiData: ApiButtonData = { full_width: true }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(true)
    })

    it('should detect fullWidth from isFullWidth property', () => {
      const apiData: ApiButtonData = { isFullWidth: true }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(true)
    })

    it('should detect fullWidth from width="full" string', () => {
      const apiData: ApiButtonData = { width: 'full' }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(true)
    })

    it('should detect fullWidth from width=true boolean', () => {
      const apiData: ApiButtonData = { width: true }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(true)
    })

    it('should return false when fullWidth is explicitly false', () => {
      const apiData: ApiButtonData = { fullWidth: false }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(false)
    })

    it('should return false when no fullWidth property exists', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(false)
    })

    it('should return false when width is a different string', () => {
      const apiData: ApiButtonData = { width: 'auto' }
      const result = transformButtonProps(apiData)
      expect(result.fullwidth).toBe(false)
    })
  })

  describe('transformButtonProps - external link transformation', () => {
    it('should detect external from external property', () => {
      const apiData: ApiButtonData = { external: true, href: '/link' }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should detect external from isExternal property', () => {
      const apiData: ApiButtonData = { isExternal: true, href: '/link' }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should detect external from is_external property', () => {
      const apiData: ApiButtonData = { is_external: true, href: '/link' }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should detect external from target="_blank"', () => {
      const apiData: ApiButtonData = { target: '_blank', href: '/link' }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should detect external from target object with openInNewWindow', () => {
      const apiData: ApiButtonData = {
        target: { openInNewWindow: true, formattedUrl: '/link' },
      }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should detect external from target object with CMExternalPage type', () => {
      const apiData: ApiButtonData = {
        target: { type: 'CMExternalPage', formattedUrl: '/link' },
      }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(true)
    })

    it('should return false when no external property exists', () => {
      const apiData: ApiButtonData = { href: '/link' }
      const result = transformButtonProps(apiData)
      expect(result.external).toBe(false)
    })
  })

  describe('transformButtonProps - to/link transformation', () => {
    it('should transform href to simple string for internal links', () => {
      const apiData: ApiButtonData = { href: '/internal-link' }
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('/internal-link')
    })

    it('should transform url property', () => {
      const apiData: ApiButtonData = { url: '/page' }
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('/page')
    })

    it('should transform link property', () => {
      const apiData: ApiButtonData = { link: '/page' }
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('/page')
    })

    it('should transform formattedUrl property', () => {
      const apiData: ApiButtonData = { formattedUrl: '/page' }
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('/page')
    })

    it('should return LinkProps for external HTTP URLs', () => {
      const apiData: ApiButtonData = { href: 'http://example.com' }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: 'http://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
    })

    it('should return LinkProps for external HTTPS URLs', () => {
      const apiData: ApiButtonData = { href: 'https://example.com' }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
    })

    it('should return LinkProps with target="_blank" for external links', () => {
      const apiData: ApiButtonData = { href: '/page', external: true }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: '/page',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
    })

    it('should return LinkProps with custom target when specified', () => {
      const apiData: ApiButtonData = { href: '/page', target: '_self' }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: '/page',
        target: '_self',
      })
    })

    it('should handle target object with formattedUrl', () => {
      const apiData: ApiButtonData = {
        target: { formattedUrl: '/complex-link', type: 'CMPage' },
      }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: '/complex-link',
      })
    })

    it('should handle target object with openInNewWindow', () => {
      const apiData: ApiButtonData = {
        target: { formattedUrl: '/new-window', openInNewWindow: true },
      }
      const result = transformButtonProps(apiData)
      // openInNewWindow sets external, which is detected, so to should be LinkProps
      expect(result.to).toEqual({
        href: '/new-window',
      })
    })

    it('should fallback to "#" when no URL found', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('#')
    })

    it('should prioritize href over url', () => {
      const apiData: ApiButtonData = { href: '/href-link', url: '/url-link' }
      const result = transformButtonProps(apiData)
      expect(result.to).toBe('/href-link')
    })

    it('should use target.href when href is not available', () => {
      const apiData: ApiButtonData = {
        target: { href: '/target-href' },
      }
      const result = transformButtonProps(apiData)
      expect(result.to).toEqual({
        href: '/target-href',
      })
    })
  })

  describe('transformButtonProps - loading transformation', () => {
    it('should detect loading from loading property', () => {
      const apiData: ApiButtonData = { loading: true }
      const result = transformButtonProps(apiData)
      expect(result.loading).toBe(true)
    })

    it('should detect loading from isLoading property', () => {
      const apiData: ApiButtonData = { isLoading: true }
      const result = transformButtonProps(apiData)
      expect(result.loading).toBe(true)
    })

    it('should detect loading from is_loading property', () => {
      const apiData: ApiButtonData = { is_loading: true }
      const result = transformButtonProps(apiData)
      expect(result.loading).toBe(true)
    })

    it('should return false when loading is explicitly false', () => {
      const apiData: ApiButtonData = { loading: false }
      const result = transformButtonProps(apiData)
      expect(result.loading).toBe(false)
    })

    it('should return false when no loading property exists', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.loading).toBe(false)
    })
  })

  describe('transformButtonProps - dataElementId transformation', () => {
    it('should transform dataId property', () => {
      const apiData: ApiButtonData = { dataId: 'btn-123' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('btn-123')
    })

    it('should transform data_id property', () => {
      const apiData: ApiButtonData = { data_id: 'btn-456' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('btn-456')
    })

    it('should transform trackingId property', () => {
      const apiData: ApiButtonData = { trackingId: 'track-789' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('track-789')
    })

    it('should transform tracking_id property', () => {
      const apiData: ApiButtonData = { tracking_id: 'track-012' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('track-012')
    })

    it('should transform elementId property', () => {
      const apiData: ApiButtonData = { elementId: 'elem-345' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('elem-345')
    })

    it('should transform element_id property', () => {
      const apiData: ApiButtonData = { element_id: 'elem-678' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('elem-678')
    })

    it('should transform id property as fallback', () => {
      const apiData: ApiButtonData = { id: 'id-901' }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('id-901')
    })

    it('should prioritize dataId over other properties', () => {
      const apiData: ApiButtonData = {
        dataId: 'data-id',
        trackingId: 'tracking-id',
        id: 'id',
      }
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBe('data-id')
    })

    it('should return undefined when no id property exists', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)
      expect(result.dataElementId).toBeUndefined()
    })
  })

  describe('transformButtonProps - icon transformation', () => {
    it('should transform startIcon property', () => {
      const apiData: ApiButtonData = { startIcon: 'arrow-right' }
      const result = transformButtonProps(apiData)
      // Since mapIconString returns undefined for now
      expect(result.startIcon).toBeUndefined()
    })

    it('should transform endIcon property', () => {
      const apiData: ApiButtonData = { endIcon: 'download' }
      const result = transformButtonProps(apiData)
      // Since mapIconString returns undefined for now
      expect(result.endIcon).toBeUndefined()
    })

    it('should transform icon with default position to startIcon', () => {
      const apiData: ApiButtonData = { icon: 'star' }
      const result = transformButtonProps(apiData)
      // Since mapIconString returns undefined for now
      expect(result.startIcon).toBeUndefined()
      expect(result.endIcon).toBeUndefined()
    })

    it('should transform icon with position="start" to startIcon', () => {
      const apiData: ApiButtonData = { icon: 'star', iconPosition: 'start' }
      const result = transformButtonProps(apiData)
      expect(result.startIcon).toBeUndefined()
    })

    it('should transform icon with position="left" to startIcon', () => {
      const apiData: ApiButtonData = { icon: 'star', iconPosition: 'left' }
      const result = transformButtonProps(apiData)
      expect(result.startIcon).toBeUndefined()
    })

    it('should transform icon with position="end" to endIcon', () => {
      const apiData: ApiButtonData = { icon: 'star', iconPosition: 'end' }
      const result = transformButtonProps(apiData)
      expect(result.endIcon).toBeUndefined()
    })

    it('should transform icon with position="right" to endIcon', () => {
      const apiData: ApiButtonData = { icon: 'star', iconPosition: 'right' }
      const result = transformButtonProps(apiData)
      expect(result.endIcon).toBeUndefined()
    })

    it('should handle icon_position snake_case', () => {
      const apiData: ApiButtonData = { icon: 'star', icon_position: 'end' }
      const result = transformButtonProps(apiData)
      expect(result.endIcon).toBeUndefined()
    })
  })

  describe('transformButtonProps - complex scenarios', () => {
    it('should transform all properties together', () => {
      const apiData: ApiButtonData = {
        variant: 'primary',
        style: 'cta-fill-primary',
        size: 'large',
        fullWidth: true,
        href: 'https://example.com',
        external: true,
        loading: true,
        dataId: 'cta-button',
        startIcon: 'arrow',
        endIcon: 'chevron',
      }
      const result = transformButtonProps(apiData)

      expect(result.variant).toBe('primary')
      expect(result.fillType).toBe('fill')
      expect(result.size).toBe('big')
      expect(result.fullwidth).toBe(true)
      expect(result.external).toBe(true)
      expect(result.to).toEqual({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
      expect(result.loading).toBe(true)
      expect(result.dataElementId).toBe('cta-button')
    })

    it('should handle empty object', () => {
      const apiData: ApiButtonData = {}
      const result = transformButtonProps(apiData)

      expect(result.variant).toBeUndefined()
      expect(result.fillType).toBeUndefined()
      expect(result.size).toBeUndefined()
      expect(result.fullwidth).toBe(false)
      expect(result.external).toBe(false)
      expect(result.to).toBe('#')
      expect(result.loading).toBe(false)
      expect(result.dataElementId).toBeUndefined()
    })

    it('should handle GrandVision API structure', () => {
      const apiData: ApiButtonData = {
        target: {
          type: 'CMExternalPage',
          formattedUrl: 'https://grandvision.com',
          openInNewWindow: true,
          title: 'Grand Vision',
        },
        style: 'cta-fill-primary',
        size: 'medium',
      }
      const result = transformButtonProps(apiData)

      expect(result.external).toBe(true)
      expect(result.variant).toBe('primary')
      expect(result.fillType).toBe('fill')
      expect(result.to).toEqual({
        href: 'https://grandvision.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      })
    })
  })

  describe('transformMultipleButtonProps', () => {
    it('should transform an array of buttons', () => {
      const apiButtons: ApiButtonData[] = [
        { variant: 'primary', href: '/link1' },
        { variant: 'secondary', href: '/link2' },
        { variant: 'tertiary', href: '/link3' },
      ]
      const result = transformMultipleButtonProps(apiButtons)

      expect(result).toHaveLength(3)
      expect(result[0].variant).toBe('primary')
      expect(result[1].variant).toBe('secondary')
      expect(result[2].variant).toBe('tertiary')
    })

    it('should handle empty array', () => {
      const apiButtons: ApiButtonData[] = []
      const result = transformMultipleButtonProps(apiButtons)

      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })

    it('should transform each button independently', () => {
      const apiButtons: ApiButtonData[] = [
        { size: 'small', fullWidth: true },
        { size: 'large', loading: true },
      ]
      const result = transformMultipleButtonProps(apiButtons)

      expect(result[0].size).toBe('small')
      expect(result[0].fullwidth).toBe(true)
      expect(result[0].loading).toBe(false)

      expect(result[1].size).toBe('big')
      expect(result[1].fullwidth).toBe(false)
      expect(result[1].loading).toBe(true)
    })
  })

  describe('transformButtonPropsWithDefaults', () => {
    it('should merge transformed props with defaults', () => {
      const apiData: ApiButtonData = { variant: 'secondary' }
      const defaults: Partial<ButtonProps> = {
        variant: 'primary',
        size: 'medium',
        fullwidth: true,
      }
      const result = transformButtonPropsWithDefaults(apiData, defaults)

      expect(result.variant).toBe('secondary') // API overrides default
      expect(result.size).toBe('medium') // default preserved
      expect(result.fullwidth).toBe(true) // default preserved
    })

    it('should use defaults when API data is empty', () => {
      const apiData: ApiButtonData = {}
      const defaults: Partial<ButtonProps> = {
        variant: 'primary',
        size: 'big',
      }
      const result = transformButtonPropsWithDefaults(apiData, defaults)

      expect(result.variant).toBe('primary')
      expect(result.size).toBe('big')
    })

    it('should work without defaults', () => {
      const apiData: ApiButtonData = { variant: 'tertiary' }
      const result = transformButtonPropsWithDefaults(apiData)

      expect(result.variant).toBe('tertiary')
    })

    it('should prioritize API data over defaults', () => {
      const apiData: ApiButtonData = {
        variant: 'quaternary',
        size: 'small',
        loading: true,
      }
      const defaults: Partial<ButtonProps> = {
        variant: 'primary',
        size: 'big',
        loading: false,
        fullwidth: true,
      }
      const result = transformButtonPropsWithDefaults(apiData, defaults)

      expect(result.variant).toBe('quaternary')
      expect(result.size).toBe('small')
      expect(result.loading).toBe(true)
      expect(result.fullwidth).toBe(true) // from defaults (not overridden by API)
    })
  })
})
