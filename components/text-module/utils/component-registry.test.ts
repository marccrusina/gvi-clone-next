import { describe, expect, it } from 'vitest'
import { componentRegistry, getComponentConfig } from './component-registry'

describe('component-registry', () => {
  describe('componentRegistry', () => {
    it('should have LXTeaser configuration', () => {
      expect(componentRegistry).toHaveProperty('LXTeaser')
      expect(componentRegistry.LXTeaser).toHaveProperty('component')
      expect(componentRegistry.LXTeaser).toHaveProperty('transformer')
    })

    it('should have CMArticle configuration', () => {
      expect(componentRegistry).toHaveProperty('CMArticle')
      expect(componentRegistry.CMArticle).toHaveProperty('component')
      expect(componentRegistry.CMArticle).toHaveProperty('transformer')
    })

    it('should have component and transformer for LXTeaser', () => {
      const config = componentRegistry.LXTeaser

      expect(typeof config.component).toBe('function')
      expect(typeof config.transformer).toBe('function')
    })

    it('should have component and transformer for CMArticle', () => {
      const config = componentRegistry.CMArticle

      expect(typeof config.component).toBe('function')
      expect(typeof config.transformer).toBe('function')
    })
  })

  describe('getComponentConfig', () => {
    it('should return LXTeaser configuration', () => {
      const config = getComponentConfig('LXTeaser')

      expect(config).not.toBeNull()
      expect(config).toHaveProperty('component')
      expect(config).toHaveProperty('transformer')
    })

    it('should return CMArticle configuration', () => {
      const config = getComponentConfig('CMArticle')

      expect(config).not.toBeNull()
      expect(config).toHaveProperty('component')
      expect(config).toHaveProperty('transformer')
    })

    it('should return null for unknown component type', () => {
      const config = getComponentConfig('UnknownType')

      expect(config).toBeNull()
    })

    it('should return null when type is undefined', () => {
      const config = getComponentConfig(undefined)

      expect(config).toBeNull()
    })

    it('should return null when type is empty string', () => {
      const config = getComponentConfig('')

      expect(config).toBeNull()
    })

    it('should return null for null type', () => {
      const config = getComponentConfig(null as unknown as string)

      expect(config).toBeNull()
    })
  })

  describe('LXTeaser transformer', () => {
    it('should transform item data correctly', () => {
      const item = {
        icon: 'test-icon',
        teaserTitle1: 'Test Title',
        teaserText2: 'Test Text',
        teaserLXCallToActionSettings: [{ action: 'click' }],
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toEqual({
        center: false,
        icon: 'test-icon',
        isCompact: false,
        light: false,
        preTitle: 'Test Title',
        title: '',
        text: 'Test Text',
        callToActionSettings: [{ action: 'click' }],
      })
    })

    it('should handle missing icon with empty string', () => {
      const item = {
        teaserTitle1: 'Title',
        teaserText2: 'Text',
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toHaveProperty('icon', '')
    })

    it('should handle missing teaserTitle1 with empty string', () => {
      const item = {
        teaserText2: 'Text',
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toHaveProperty('preTitle', '')
    })

    it('should handle missing teaserText2 with empty string', () => {
      const item = {
        teaserTitle1: 'Title',
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toHaveProperty('text', '')
    })

    it('should handle missing callToActionSettings with empty array', () => {
      const item = {
        teaserTitle1: 'Title',
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toHaveProperty('callToActionSettings', [])
    })

    it('should set title to empty string', () => {
      const item = {
        teaserTitle1: 'Test',
      }

      const transformed = componentRegistry.LXTeaser.transformer(item)

      expect(transformed).toHaveProperty('title', '')
    })

    it('should handle context parameter', () => {
      const item = {
        teaserTitle1: 'Test',
      }
      const context = {
        viewType: 'text-module',
        teaserIndex: 1,
      }

      const transformed = componentRegistry.LXTeaser.transformer(item, context)

      expect(transformed).toBeDefined()
    })
  })

  describe('CMArticle transformer', () => {
    it('should transform item data correctly', () => {
      const item = {
        teaserTitle1: 'Article Title',
        teaserText2: 'Article Content',
      }

      const transformed = componentRegistry.CMArticle.transformer(item)

      expect(transformed).toEqual({
        title: 'Article Title',
        content: 'Article Content',
      })
    })

    it('should handle missing teaserTitle1 with empty string', () => {
      const item = {
        teaserText2: 'Content',
      }

      const transformed = componentRegistry.CMArticle.transformer(item)

      expect(transformed).toHaveProperty('title', '')
    })

    it('should handle missing teaserText2 with empty string', () => {
      const item = {
        teaserTitle1: 'Title',
      }

      const transformed = componentRegistry.CMArticle.transformer(item)

      expect(transformed).toHaveProperty('content', '')
    })

    it('should handle empty item object', () => {
      const item = {}

      const transformed = componentRegistry.CMArticle.transformer(item)

      expect(transformed).toEqual({
        title: '',
        content: '',
      })
    })
  })
})
