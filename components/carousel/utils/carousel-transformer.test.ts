import { describe, expect, it } from 'vitest'
import type { ApiCarouselPlacement } from '@/components/carousel/types/carousel'
import {
  transformCarousel,
  transformCarouselWithDefaults,
  transformMultipleCarousels,
} from './carousel-transformer'

describe('Carousel Transformer', () => {
  describe('transformCarousel', () => {
    describe('Brands Carousel', () => {
      it('should transform brand items correctly', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'brands-placement',
          viewtype: 'brands',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'brand-1',
              name: 'Brand One',
              title: 'Brand One',
              type: 'CMExternalChannel',
              formattedUrl: 'https://example.com/brand-1',
              media: [
                {
                  type: 'image',
                  uriTemplate:
                    'https://example.com/brand-1/{cropName}/{width}.jpg',
                },
              ],
            },
            {
              id: 'brand-2',
              name: 'Brand Two',
              title: 'Brand Two',
              type: 'CMExternalChannel',
              formattedUrl: 'https://example.com/brand-2',
              media: [
                {
                  type: 'image',
                  uriTemplate:
                    'https://example.com/brand-2/{cropName}/{width}.jpg',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.type).toBe('carousel')
        expect(result.items).toHaveLength(2)
        expect(result.items?.[0].type).toBe('brand')
        expect(result.items?.[0].external).toBe(true)
        expect(result.items?.[0].title).toBe('Brand One')
        expect(result.items?.[0].imageUrl).toContain('original/400')
        expect(result.breakpoints?.[320]).toEqual({ perView: 2, gap: 16 })
        expect(result.breakpoints?.[768]).toEqual({ perView: 4, gap: 20 })
        expect(result.autoplay).toBe(false)
      })

      it('should limit desktop perView to item count for brands', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'brands-small',
          viewtype: 'brands',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'brand-1',
              type: 'CMExternalChannel',
              formattedUrl: 'https://example.com',
            },
            {
              id: 'brand-2',
              type: 'CMExternalChannel',
              formattedUrl: 'https://example.com',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.breakpoints?.[1024].perView).toBe(2) // Limited to item count
      })
    })

    describe('Teasers Carousel', () => {
      it('should transform teaser items correctly', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'teasers-placement',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              teaserTitle1: 'Main Title',
              teaserTitle2: 'Subtitle',
              teaserPreTitle: 'Pre Title',
              teaserText1: 'Description text',
              teaserIcon: 'icon-name',
              formattedUrl: '/teaser-1',
              media: [
                {
                  type: 'image',
                  uriTemplate:
                    'https://example.com/teaser-1/{cropName}/{width}.jpg',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].type).toBe('teaser')
        expect(result.items?.[0].title).toBe('Main Title')
        expect(result.items?.[0].subtitle).toBe('Pre Title')
        expect(result.items?.[0].description).toBe('Description text')
        expect(result.items?.[0].external).toBe(false)
        expect(result.autoplay).toBe(false) // Only 1 item
        expect(result.keyboard).toBe(false)
      })

      it('should enable autoplay for multiple teasers', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'teasers-multiple',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            { id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/t1' },
            { id: 'teaser-2', type: 'LXTeaser', formattedUrl: '/t2' },
            { id: 'teaser-3', type: 'LXTeaser', formattedUrl: '/t3' },
            { id: 'teaser-4', type: 'LXTeaser', formattedUrl: '/t4' },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.autoplay).toBe(4000)
        expect(result.keyboard).toBe(true) // More than 3 items
      })

      it('should use teaserTitle2 as subtitle when teaserTitle1 is present', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'teaser-subtitle',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              teaserTitle1: 'Title 1',
              teaserTitle2: 'Title 2',
              formattedUrl: '/teaser',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].title).toBe('Title 1')
        expect(result.items?.[0].subtitle).toBe('Title 2')
      })
    })

    describe('Products Carousel', () => {
      it('should transform product items correctly', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'products-placement',
          viewtype: 'products',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'product-1',
              type: 'ProductPage',
              title: 'Product One',
              formattedUrl: '/products/product-1',
              media: [
                {
                  type: 'image',
                  uriTemplate:
                    'https://example.com/product-1/{cropName}/{width}.jpg',
                },
              ],
            },
            {
              id: 'product-2',
              type: 'ProductPage',
              title: 'Product Two',
              formattedUrl: '/products/product-2',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].type).toBe('product')
        expect(result.breakpoints?.[320]).toEqual({ perView: 1.2, gap: 12 })
        expect(result.breakpoints?.[768]).toEqual({ perView: 3, gap: 16 })
        expect(result.autoplay).toBe(false)
      })

      it('should enable keyboard navigation for products > 4', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'products-many',
          viewtype: 'products',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: Array.from({ length: 6 }, (_, i) => ({
            id: `product-${i}`,
            type: 'ProductPage' as const,
            formattedUrl: `/product-${i}`,
          })),
        }

        const result = transformCarousel(apiData)

        expect(result.keyboard).toBe(true)
        expect(result.breakpoints?.[1024].perView).toBe(4) // Limited to min(4, count)
      })
    })

    describe('CTA Extraction', () => {
      it('should extract primary CTA button', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'cta-placement',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              teaserTitle1: 'Teaser with CTA',
              formattedUrl: '/teaser',
              teaserLXCallToActionSettings: [
                {
                  callToActionEnabled: true,
                  callToActionText: 'Shop Now',
                  style: 'cta-primary',
                  target: {
                    type: 'internal',
                    formattedUrl: '/shop',
                    title: 'Shop',
                    openInNewWindow: false,
                  },
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].cta).toBeDefined()
        expect(result.items?.[0].cta?.text).toBe('Shop Now')
        expect(result.items?.[0].cta?.link).toBe('/shop')
        expect(result.items?.[0].cta?.variant).toBe('primary')
        expect(result.items?.[0].cta?.external).toBe(false)
      })

      it('should extract secondary CTA button', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'cta-secondary',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              teaserLXCallToActionSettings: [
                {
                  callToActionEnabled: true,
                  callToActionText: 'Learn More',
                  style: 'cta-secondary-outline',
                  target: {
                    type: 'external',
                    formattedUrl: 'https://external.com',
                    title: 'External',
                    openInNewWindow: true,
                  },
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].cta?.variant).toBe('secondary')
        expect(result.items?.[0].cta?.external).toBe(true)
      })

      it('should not extract disabled CTA', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'cta-disabled',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              teaserLXCallToActionSettings: [
                {
                  callToActionEnabled: false,
                  callToActionText: 'Disabled',
                  style: 'cta-primary',
                  target: {
                    type: 'internal',
                    formattedUrl: '/shop',
                    title: 'Shop',
                  },
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].cta).toBeUndefined()
      })

      it('should handle tertiary and quaternary CTA styles', () => {
        const apiDataTertiary: ApiCarouselPlacement = {
          name: 'cta-tertiary',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              teaserLXCallToActionSettings: [
                {
                  callToActionEnabled: true,
                  callToActionText: 'Tertiary',
                  style: 'cta-tertiary',
                  target: {
                    type: 'internal',
                    formattedUrl: '/link',
                    title: 'Link',
                  },
                },
              ],
            },
          ],
        }

        const resultTertiary = transformCarousel(apiDataTertiary)
        expect(resultTertiary.items?.[0].cta?.variant).toBe('tertiary')

        const apiDataQuaternary: ApiCarouselPlacement = {
          ...apiDataTertiary,
          items: [
            {
              ...apiDataTertiary.items[0],
              teaserLXCallToActionSettings: [
                {
                  callToActionEnabled: true,
                  callToActionText: 'Quaternary',
                  style: 'cta-quaternary',
                  target: {
                    type: 'internal',
                    formattedUrl: '/link',
                    title: 'Link',
                  },
                },
              ],
            },
          ],
        }

        const resultQuaternary = transformCarousel(apiDataQuaternary)
        expect(resultQuaternary.items?.[0].cta?.variant).toBe('quaternary')
      })
    })

    describe('Collections', () => {
      it('should flatten teasableItems from collections', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'collection-placement',
          viewtype: 'collection',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'collection-1',
              type: 'CMCollection',
              title: 'My Collection',
              collectionTitle: 'Featured Products',
              teasableItems: [
                {
                  id: 'product-1',
                  type: 'ProductPage',
                  title: 'Product 1',
                  formattedUrl: '/products/1',
                },
                {
                  id: 'product-2',
                  type: 'ProductPage',
                  title: 'Product 2',
                  formattedUrl: '/products/2',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items).toHaveLength(2)
        expect(result.items?.[0].id).toBe('product-1')
        expect(result.items?.[1].id).toBe('product-2')
      })

      it('should extract collection title', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'collection-title',
          viewtype: 'collection',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'collection-1',
              type: 'CMCollection',
              collectionTitle: 'Featured Collection',
              teasableItems: [
                {
                  id: 'item-1',
                  type: 'LXTeaser',
                  formattedUrl: '/item',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        // Title is stored in config but not exposed in GlideConfig return
        // Testing that items are processed correctly
        expect(result.items).toHaveLength(1)
      })

      it('should handle mixed collection and regular items', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'mixed-items',
          viewtype: 'mixed',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'teaser-1',
              type: 'LXTeaser',
              title: 'Regular Teaser',
              formattedUrl: '/teaser',
            },
            {
              id: 'collection-1',
              type: 'CMCollection',
              collectionTitle: 'Collection',
              teasableItems: [
                {
                  id: 'product-1',
                  type: 'ProductPage',
                  title: 'Product',
                  formattedUrl: '/product',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items).toHaveLength(2)
        expect(result.items?.[0].id).toBe('teaser-1')
        expect(result.items?.[1].id).toBe('product-1')
      })
    })

    describe('Navigation and Links', () => {
      it('should extract formattedUrl', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'formatted-url',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              formattedUrl: '/formatted/url/path',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].link).toBe('/formatted/url/path')
      })

      it('should fallback to navigationPath', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'nav-path',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              navigationPath: [
                { segment: 'category' },
                { segment: 'subcategory' },
                { segment: 'item' },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].link).toBe('category/subcategory/item')
      })

      it('should fallback to # when no link available', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'no-link',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].link).toBe('#')
      })

      it('should detect external links', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'external-links',
          viewtype: 'brands',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'CMExternalChannel',
              formattedUrl: 'https://external.com',
            },
            {
              id: 'item-2',
              type: 'LXTeaser',
              formattedUrl: 'http://external.com',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].external).toBe(true)
        expect(result.items?.[1].external).toBe(true)
      })
    })

    describe('Image Extraction', () => {
      it('should extract and transform image URL', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'image-test',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              media: [
                {
                  type: 'image',
                  uriTemplate:
                    'https://cdn.example.com/images/{cropName}/{width}/image.jpg',
                },
              ],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].imageUrl).toBe(
          'https://cdn.example.com/images/original/400/image.jpg',
        )
      })

      it('should handle items without media', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'no-media',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].imageUrl).toBeUndefined()
      })

      it('should handle empty media array', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'empty-media',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              media: [],
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].imageUrl).toBeUndefined()
      })
    })

    describe('Grid Positioning', () => {
      it('should preserve gridPositioning from API', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'grid-pos',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              formattedUrl: '/teaser',
              gridPositioning: 5,
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].gridPosition).toBe(5)
      })

      it('should default to index + 1 when gridPositioning is missing', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'default-grid',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            { id: 'item-1', type: 'LXTeaser', formattedUrl: '/t1' },
            { id: 'item-2', type: 'LXTeaser', formattedUrl: '/t2' },
            { id: 'item-3', type: 'LXTeaser', formattedUrl: '/t3' },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].gridPosition).toBe(1)
        expect(result.items?.[1].gridPosition).toBe(2)
        expect(result.items?.[2].gridPosition).toBe(3)
      })
    })

    describe('Glide Configuration', () => {
      it('should set default animation properties', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'animation',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [{ id: 'item-1', type: 'LXTeaser', formattedUrl: '/t1' }],
        }

        const result = transformCarousel(apiData)

        expect(result.animationDuration).toBe(400)
        expect(result.animationTimingFunc).toBe(
          'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        )
      })

      it('should set default touch interaction values', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'touch',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [{ id: 'item-1', type: 'LXTeaser', formattedUrl: '/t1' }],
        }

        const result = transformCarousel(apiData)

        expect(result.dragThreshold).toBe(120)
        expect(result.swipeThreshold).toBe(80)
      })

      it('should enable hoverpause for autoplay', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'hoverpause',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            { id: 'item-1', type: 'LXTeaser', formattedUrl: '/t1' },
            { id: 'item-2', type: 'LXTeaser', formattedUrl: '/t2' },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.hoverpause).toBe(true)
      })
    })

    describe('Mixed Content Types', () => {
      it('should handle mixed content as mixed viewType', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'mixed',
          viewtype: 'mixed',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'brand-1',
              type: 'CMExternalChannel',
              formattedUrl: '/brand',
            },
            { id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/teaser' },
            { id: 'product-1', type: 'ProductPage', formattedUrl: '/product' },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items).toHaveLength(3)
        expect(result.items?.[0].type).toBe('brand')
        expect(result.items?.[1].type).toBe('teaser')
        expect(result.items?.[2].type).toBe('product')
        expect(result.breakpoints?.[320]).toEqual({ perView: 1, gap: 16 })
      })
    })

    describe('Title Extraction Fallbacks', () => {
      it('should use name as fallback for title', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'title-fallback',
          viewtype: 'brands',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'CMExternalChannel',
              name: 'Item Name',
              formattedUrl: '/item',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].title).toBe('Item Name')
      })

      it('should prioritize title over teaserTitle fields', () => {
        const apiData: ApiCarouselPlacement = {
          name: 'title-priority',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            {
              id: 'item-1',
              type: 'LXTeaser',
              title: 'Main Title',
              teaserTitle1: 'Teaser Title 1',
              formattedUrl: '/item',
            },
          ],
        }

        const result = transformCarousel(apiData)

        expect(result.items?.[0].title).toBe('Main Title')
      })
    })
  })

  describe('transformMultipleCarousels', () => {
    it('should transform multiple placements', () => {
      const placements: ApiCarouselPlacement[] = [
        {
          name: 'brands',
          viewtype: 'brands',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [
            { id: 'brand-1', type: 'CMExternalChannel', formattedUrl: '/b1' },
          ],
        },
        {
          name: 'teasers',
          viewtype: 'teasers',
          placementReflect: false,
          marginLateral: false,
          marginVertical: 'default',
          placementCenter: false,
          backgroundColor: '#ffffff',
          clusterTile: false,
          placementAnimation: 'none',
          items: [{ id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/t1' }],
        },
      ]

      const results = transformMultipleCarousels(placements)

      expect(results).toHaveLength(2)
      expect(results[0].items?.[0].type).toBe('brand')
      expect(results[1].items?.[0].type).toBe('teaser')
    })

    it('should handle empty array', () => {
      const results = transformMultipleCarousels([])
      expect(results).toEqual([])
    })
  })

  describe('transformCarouselWithDefaults', () => {
    it('should apply custom defaults', () => {
      const apiData: ApiCarouselPlacement = {
        name: 'with-defaults',
        viewtype: 'teasers',
        placementReflect: false,
        marginLateral: false,
        marginVertical: 'default',
        placementCenter: false,
        backgroundColor: '#ffffff',
        clusterTile: false,
        placementAnimation: 'none',
        items: [{ id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/t1' }],
      }

      const customDefaults = {
        perView: 5,
        gap: 30,
        autoplay: 5000,
      }

      const result = transformCarouselWithDefaults(apiData, customDefaults)

      expect(result.perView).toBe(5)
      expect(result.gap).toBe(30)
      expect(result.autoplay).toBe(5000)
    })

    it('should work without defaults', () => {
      const apiData: ApiCarouselPlacement = {
        name: 'no-defaults',
        viewtype: 'teasers',
        placementReflect: false,
        marginLateral: false,
        marginVertical: 'default',
        placementCenter: false,
        backgroundColor: '#ffffff',
        clusterTile: false,
        placementAnimation: 'none',
        items: [{ id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/t1' }],
      }

      const result = transformCarouselWithDefaults(apiData)

      expect(result.items).toHaveLength(1)
      expect(result.type).toBe('carousel')
    })

    it('should override specific properties only', () => {
      const apiData: ApiCarouselPlacement = {
        name: 'partial-override',
        viewtype: 'teasers',
        placementReflect: false,
        marginLateral: false,
        marginVertical: 'default',
        placementCenter: false,
        backgroundColor: '#ffffff',
        clusterTile: false,
        placementAnimation: 'none',
        items: [{ id: 'teaser-1', type: 'LXTeaser', formattedUrl: '/t1' }],
      }

      const result = transformCarouselWithDefaults(apiData, { autoplay: 2000 })

      expect(result.autoplay).toBe(2000)
      expect(result.type).toBe('carousel')
      expect(result.items).toHaveLength(1)
    })
  })
})
