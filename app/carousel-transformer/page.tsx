'use client'

import DemoPageWrapper from '@/components/DemoPageWrapper'
import type { ApiCarouselPlacement } from '@/types/carousel'
import {
  transformCarousel,
  transformMultipleCarousels,
} from '@/utils/carousel-transformer'

/**
 * Carousel Transformer Demo Page
 * Demonstrates how the universal carousel transformer works with CMS API data structures
 */
export default function CarouselTransformerPage() {
  // Example 1: CMS Brand Carousel (main_placement_6 structure)
  const brandCarouselPlacement: ApiCarouselPlacement = {
    name: 'main_placement_6',
    viewtype: 'default',
    placementReflect: false,
    marginLateral: false,
    marginVertical: 'X',
    placementCenter: false,
    backgroundColor: '',
    clusterTile: false,
    placementAnimation: '',
    items: [
      {
        id: '42800',
        type: 'CMCollection',
        title: '',
        name: 'WW_Brand_Carousel',
        collectionTitle: 'Scopri tutti i nostri brand:',
        teasableItems: [
          {
            type: 'CMExternalChannel',
            title: 'Ray-Ban',
            id: '42808',
            name: 'Ray-Ban (brand_Ray-Ban)',
            externalId: 'ibm:///catalog/category/brand_Ray-Ban',
            navigationPath: [{ segment: 'ray-ban' }],
            media: [
              {
                type: 'CMPicture',
                uriTemplate:
                  '/caas/v1/media/42810/data/{cropName}/{width}/rayban-logo.png',
              },
            ],
            formattedUrl: '/ray-ban',
          },
          {
            type: 'CMExternalChannel',
            title: 'Oakley',
            id: '42812',
            name: 'Oakley (brand_Oakley)',
            externalId: 'ibm:///catalog/category/brand_Oakley',
            navigationPath: [{ segment: 'oakley' }],
            media: [
              {
                type: 'CMPicture',
                uriTemplate:
                  '/caas/v1/media/42814/data/{cropName}/{width}/oakley-logo.png',
              },
            ],
            formattedUrl: '/oakley',
          },
          {
            type: 'CMExternalChannel',
            title: 'Persol',
            id: '42816',
            name: 'Persol (brand_Persol)',
            externalId: 'ibm:///catalog/category/brand_Persol',
            navigationPath: [{ segment: 'persol' }],
            media: [
              {
                type: 'CMPicture',
                uriTemplate:
                  '/caas/v1/media/42818/data/{cropName}/{width}/persol-logo.png',
              },
            ],
            formattedUrl: '/persol',
          },
          {
            type: 'CMExternalChannel',
            title: 'Gucci',
            id: '42820',
            name: 'Gucci (brand_Gucci)',
            externalId: 'ibm:///catalog/category/brand_Gucci',
            navigationPath: [{ segment: 'gucci' }],
            media: [
              {
                type: 'CMPicture',
                uriTemplate:
                  '/caas/v1/media/42822/data/{cropName}/{width}/gucci-logo.png',
              },
            ],
            formattedUrl: '/gucci',
          },
        ],
      },
    ],
  }

  // Example 2: LXTeaser Carousel (promotional content)
  const teaserCarouselPlacement: ApiCarouselPlacement = {
    name: 'main_placement_hero',
    viewtype: 'hero-carousel',
    placementReflect: false,
    marginLateral: false,
    marginVertical: 'X',
    placementCenter: true,
    backgroundColor: '',
    clusterTile: false,
    placementAnimation: 'fade',
    items: [
      {
        id: '46416',
        type: 'LXTeaser',
        title: 'Nuova Collezione Primavera',
        teaserPreTitle: 'NOVITÀ 2024',
        teaserTitle1: 'Occhiali da Sole',
        teaserTitle2: 'Collezione Primavera',
        teaserText1:
          'Scopri i nuovi modelli della collezione primavera-estate con design esclusivi e protezione UV totale.',
        teaserIcon: 'sun',
        media: [
          {
            type: 'CMPicture',
            uriTemplate:
              '/caas/v1/media/46418/data/{cropName}/{width}/spring-collection-hero.jpg',
          },
        ],
        teaserLXCallToActionSettings: [
          {
            callToActionEnabled: true,
            callToActionText: 'SCOPRI LA COLLEZIONE',
            style: 'cta-fill-primary',
            target: {
              type: 'CMSPage',
              formattedUrl: '/collezioni/primavera-2024',
              title: 'Collezione Primavera 2024',
            },
          },
        ],
        gridPositioning: 1,
        formattedUrl: '/collezioni/primavera-2024',
      },
      {
        id: '46420',
        type: 'LXTeaser',
        title: 'Servizi Professionali',
        teaserPreTitle: 'I NOSTRI SERVIZI',
        teaserTitle1: 'Controllo Vista',
        teaserTitle2: 'Gratuito in Negozio',
        teaserText1:
          'Prenota un controllo della vista gratuito con i nostri ottici specializzati.',
        teaserIcon: 'eye',
        media: [
          {
            type: 'CMPicture',
            uriTemplate:
              '/caas/v1/media/46422/data/{cropName}/{width}/eye-test-service.jpg',
          },
        ],
        teaserLXCallToActionSettings: [
          {
            callToActionEnabled: true,
            callToActionText: 'PRENOTA VISITA',
            style: 'cta-outline-secondary',
            target: {
              type: 'CMExternalPage',
              formattedUrl: '/prenota-visita',
              title: 'Prenota Controllo Vista',
              openInNewWindow: false,
            },
          },
        ],
        gridPositioning: 2,
        formattedUrl: '/servizi/controllo-vista',
      },
    ],
  }

  // Example 3: Product Carousel
  const productCarouselPlacement: ApiCarouselPlacement = {
    name: 'recommended_products',
    viewtype: 'product-grid',
    placementReflect: false,
    marginLateral: false,
    marginVertical: 'M',
    placementCenter: false,
    backgroundColor: '#f8f9fa',
    clusterTile: true,
    placementAnimation: '',
    items: [
      {
        id: 'prod-001',
        type: 'ProductPage',
        title: 'Ray-Ban Aviator Classic',
        name: '0RB3025__001_58',
        formattedUrl: '/prodotti/ray-ban-aviator-classic-rb3025',
        media: [
          {
            type: 'CMPicture',
            uriTemplate:
              '/caas/v1/media/products/{cropName}/{width}/rb3025-aviator-gold.jpg',
          },
        ],
      },
      {
        id: 'prod-002',
        type: 'ProductPage',
        title: 'Oakley Holbrook XL',
        name: '0OO9417__941703',
        formattedUrl: '/prodotti/oakley-holbrook-xl',
        media: [
          {
            type: 'CMPicture',
            uriTemplate:
              '/caas/v1/media/products/{cropName}/{width}/oo9417-holbrook-xl.jpg',
          },
        ],
      },
    ],
  }

  // Transform all carousel examples
  const transformedBrandCarousel = transformCarousel(brandCarouselPlacement)
  const transformedTeaserCarousel = transformCarousel(teaserCarouselPlacement)
  const transformedProductCarousel = transformCarousel(productCarouselPlacement)
  const transformedMultipleCarousels = transformMultipleCarousels([
    brandCarouselPlacement,
    teaserCarouselPlacement,
  ])

  const examples = [
    {
      title: 'Brand Carousel',
      description:
        'Multi-brand carousel from main_placement_6 with CMCollection → teasableItems',
      apiData: brandCarouselPlacement,
      transformed: transformedBrandCarousel,
    },
    {
      title: 'Hero Teaser Carousel',
      description:
        'Promotional LXTeaser carousel with CTA buttons and hero imagery',
      apiData: teaserCarouselPlacement,
      transformed: transformedTeaserCarousel,
    },
    {
      title: 'Product Recommendation',
      description: 'Product carousel for recommended items and bestsellers',
      apiData: productCarouselPlacement,
      transformed: transformedProductCarousel,
    },
  ]

  return (
    <DemoPageWrapper>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px',
          }}
        >
          Carousel Transformer Demo
        </h1>
        <p style={{ color: '#6b7280' }}>
          Transform CMS API carousel structures into optimized Glide.js props
          (50% smaller bundle size)
        </p>
      </div>

      {/* Individual Examples */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          marginBottom: '48px',
        }}
      >
        {examples.map((example) => (
          <div
            key={example.title}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px',
              }}
            >
              {example.title}
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              {example.description}
            </p>

            {/* Data Details (Collapsible) */}
            <details style={{ marginTop: '16px' }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '16px',
                }}
              >
                View API Data & Transformation
              </summary>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '24px',
                  marginTop: '16px',
                }}
              >
                {/* API Input */}
                <div>
                  <h3
                    style={{
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                    }}
                  >
                    API Input
                  </h3>
                  <pre
                    style={{
                      backgroundColor: '#f3f4f6',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      overflowX: 'auto',
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }}
                  >
                    {JSON.stringify(example.apiData, null, 2)}
                  </pre>
                </div>

                {/* Transformed Props */}
                <div>
                  <h3
                    style={{
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                    }}
                  >
                    Glide Config
                  </h3>
                  <pre
                    style={{
                      backgroundColor: '#eff6ff',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      overflowX: 'auto',
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }}
                  >
                    {JSON.stringify(example.transformed, null, 2)}
                  </pre>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      {/* Multiple Carousels Example */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px',
          }}
        >
          Multiple Carousels (Homepage Layout)
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          Transform multiple carousel placements for a complete homepage
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
            marginBottom: '16px',
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
              }}
            >
              API Placements Array
            </h3>
            <pre
              style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '11px',
                overflowX: 'auto',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {JSON.stringify(
                [brandCarouselPlacement, teaserCarouselPlacement],
                null,
                2,
              )}
            </pre>
          </div>

          <div>
            <h3
              style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
              }}
            >
              Transformed Carousels
            </h3>
            <pre
              style={{
                backgroundColor: '#eff6ff',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '11px',
                overflowX: 'auto',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {JSON.stringify(transformedMultipleCarousels, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Transformation Features */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginTop: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '16px',
          }}
        >
          Carousel Transformer Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
              }}
            >
              CMS API Support
            </h3>
            <ul
              style={{
                fontSize: '14px',
                color: '#6b7280',
                paddingLeft: '20px',
                margin: 0,
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '4px' }}>
                <code>contentPlacements</code> - Main placement structure
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>CMCollection → teasableItems</code> - Brand carousels
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>LXTeaser</code> - Hero & promotional carousels
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>ProductPage</code> - Product recommendation carousels
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>teaserLXCallToActionSettings</code> - CTA buttons
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>media.uriTemplate</code> - Responsive images
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>viewtype & placementAnimation</code> - UI hints
              </li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
              }}
            >
              Glide Configuration
            </h3>
            <ul
              style={{
                fontSize: '14px',
                color: '#6b7280',
                paddingLeft: '20px',
                margin: 0,
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '4px' }}>
                <code>perView</code> - Responsive slide counts
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>gap</code> - Adaptive spacing
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>breakpoints</code> - Mobile/tablet/desktop
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>keyboard</code> - Keyboard navigation
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>autoplay</code> - Context-aware timing
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>type</code> - Slider or carousel mode
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>animationDuration</code> - Smooth transitions
              </li>
              <li style={{ marginBottom: '4px' }}>
                <code>items</code> - Processed carousel data
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  )
}
