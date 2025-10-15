'use client'

import Carousel from '@/components/Carousel'
import DemoPageWrapper from '@/components/DemoPageWrapper'
import type { ProcessedCarouselItem } from '@/types/carousel'

/**
 * Carousel Demo Page
 * Demonstrates the common Carousel component with various configurations
 */
export default function CarouselDemoPage() {
  // Sample hero carousel data
  const heroItems: ProcessedCarouselItem[] = [
    {
      id: 'summer-collection',
      title: 'Summer 2024 Collection',
      subtitle: 'New arrivals',
      description:
        'Discover our latest summer eyewear collection with UV protection and style',
      imageUrl: 'https://example.com/collections/summer-2024.jpg',
      cta: {
        text: 'Shop Collection',
        link: '/collections/summer-2024',
        variant: 'primary',
        external: false,
      },
      type: 'teaser' as const,
    },
    {
      id: 'prescription-special',
      title: 'Prescription Glasses Sale',
      subtitle: 'Up to 50% off',
      description: 'Save big on prescription eyewear from top brands',
      imageUrl: 'https://example.com/promotions/prescription-sale.jpg',
      cta: {
        text: 'Shop Sale',
        link: '/promotions/prescription-sale',
        variant: 'primary',
        external: false,
      },
      type: 'teaser' as const,
    },
    {
      id: 'kids-eyewear',
      title: 'Kids Eyewear',
      subtitle: 'Durable & fun designs',
      description:
        'Colorful and durable eyewear designed specifically for children',
      imageUrl: 'https://example.com/collections/kids.jpg',
      cta: {
        text: 'Browse Kids',
        link: '/collections/kids',
        variant: 'secondary',
        external: false,
      },
      type: 'collection' as const,
    },
  ]

  const productItems: ProcessedCarouselItem[] = [
    {
      id: 'product-rb3025',
      title: 'Ray-Ban Aviator Classic',
      subtitle: '€149.99',
      description: 'The original pilot sunglasses that started it all',
      imageUrl: 'https://example.com/products/rb3025.jpg',
      cta: {
        text: 'Add to Cart',
        link: '/products/ray-ban-aviator-rb3025',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-ok9102',
      title: 'Oakley Holbrook',
      subtitle: '€129.99',
      description: 'Classic lifestyle sunglasses with a timeless design',
      imageUrl: 'https://example.com/products/ok9102.jpg',
      cta: {
        text: 'Buy Now',
        link: '/products/oakley-holbrook-ok9102',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-gg0061s',
      title: 'Gucci GG0061S',
      subtitle: '€295.00',
      description: 'Elegant cat-eye sunglasses with signature Gucci details',
      imageUrl: 'https://example.com/products/gucci-gg0061s.jpg',
      cta: {
        text: 'View Details',
        link: '/products/gucci-gg0061s',
        variant: 'secondary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-pr01os',
      title: 'Prada PR 01OS',
      subtitle: '€220.00',
      description:
        'Sophisticated round-frame sunglasses with premium materials',
      imageUrl: 'https://example.com/products/prada-pr01os.jpg',
      cta: {
        text: 'Shop Now',
        link: '/products/prada-pr01os',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-tf5178',
      title: 'Tom Ford FT5178',
      subtitle: '€285.00',
      description: 'Bold acetate frames with modern sophistication',
      imageUrl: 'https://example.com/products/tom-ford-ft5178.jpg',
      cta: {
        text: 'Add to Cart',
        link: '/products/tom-ford-ft5178',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-rb2132',
      title: 'Ray-Ban Wayfarer',
      subtitle: '€139.99',
      description: 'Iconic style that defined a generation',
      imageUrl: 'https://example.com/products/rb2132.jpg',
      cta: {
        text: 'Buy Now',
        link: '/products/ray-ban-wayfarer-rb2132',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-ok0009',
      title: 'Oakley Frogskins',
      subtitle: '€119.99',
      description: 'Retro sport sunglasses with modern lens technology',
      imageUrl: 'https://example.com/products/oakley-frogskins.jpg',
      cta: {
        text: 'View Details',
        link: '/products/oakley-frogskins-ok0009',
        variant: 'secondary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-gg0034s',
      title: 'Gucci GG0034S',
      subtitle: '€310.00',
      description: 'Oversized frames with iconic double G logo',
      imageUrl: 'https://example.com/products/gucci-gg0034s.jpg',
      cta: {
        text: 'Shop Now',
        link: '/products/gucci-gg0034s',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-pr17ws',
      title: 'Prada PR 17WS',
      subtitle: '€265.00',
      description: 'Square silhouette with contemporary edge',
      imageUrl: 'https://example.com/products/prada-pr17ws.jpg',
      cta: {
        text: 'Add to Cart',
        link: '/products/prada-pr17ws',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-tf0752',
      title: 'Tom Ford Henry',
      subtitle: '€295.00',
      description: 'Timeless aviator design with luxury details',
      imageUrl: 'https://example.com/products/tom-ford-henry.jpg',
      cta: {
        text: 'Buy Now',
        link: '/products/tom-ford-henry-tf0752',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-rb3548n',
      title: 'Ray-Ban Hexagonal',
      subtitle: '€159.99',
      description: 'Geometric flat lenses in a six-sided frame',
      imageUrl: 'https://example.com/products/rb3548n.jpg',
      cta: {
        text: 'View Details',
        link: '/products/ray-ban-hexagonal-rb3548n',
        variant: 'secondary',
        external: false,
      },
      type: 'product' as const,
    },
    {
      id: 'product-ok0010',
      title: 'Oakley Radar EV',
      subtitle: '€179.99',
      description: 'Performance eyewear for athletes and active lifestyles',
      imageUrl: 'https://example.com/products/oakley-radar-ev.jpg',
      cta: {
        text: 'Shop Now',
        link: '/products/oakley-radar-ev-ok0010',
        variant: 'primary',
        external: false,
      },
      type: 'product' as const,
    },
  ]

  // Custom render function for improved product cards (demo-specific)
  const renderProductCard = (item: ProcessedCarouselItem, _index: number) => (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        minHeight: '280px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      {item.imageUrl && (
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '28px' }}>🏷️</span>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        {item.title && (
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.3',
            }}
          >
            {item.title}
          </h3>
        )}

        {item.subtitle && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.4',
            }}
          >
            {item.subtitle}
          </p>
        )}

        {item.description && (
          <p
            style={{
              fontSize: '13px',
              color: '#9ca3af',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.5',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      {item.cta && (
        <button
          type="button"
          style={{
            backgroundColor:
              item.cta.variant === 'primary'
                ? '#3b82f6'
                : item.cta.variant === 'secondary'
                  ? 'transparent'
                  : '#6b7280',
            color: item.cta.variant === 'secondary' ? '#3b82f6' : 'white',
            border:
              item.cta.variant === 'secondary' ? '1px solid #3b82f6' : 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        >
          {item.cta.text}
        </button>
      )}
    </div>
  )

  // Custom render function for hero carousel
  const renderHeroItem = (item: ProcessedCarouselItem, _index: number) => (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl h-64 flex flex-col justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
        <p className="text-lg mb-4 opacity-90">{item.subtitle}</p>
        <p className="text-sm mb-6 opacity-80 line-clamp-2">
          {item.description}
        </p>
        {item.cta && (
          <button
            type="button"
            className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            {item.cta.text}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <DemoPageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carousel Demo</h1>
        <p className="text-lg text-gray-600">
          Common Carousel component powered by Glide.js with responsive design
        </p>
      </div>

      <div className="space-y-12">
        {/* Carousel Component Examples */}
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎠 Base Carousel Examples
          </h2>
          <p className="text-gray-600 mb-8">
            Universal Carousel component with Design system patterns -
            responsive mobile/desktop behavior
          </p>

          {/* 1. Default Renderer Example */}
          <div className="mb-12">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                1. Product Carousel with Default Renderer
              </h3>
              <p className="text-gray-600">
                Mobile: 1 slide, 8px gap, no loop. Desktop: 3 slides, 8px gap,
                loop enabled
              </p>
            </div>
            <Carousel
              items={productItems.slice(0, 6)}
              title="PRODUCTS"
              showNavigation={true}
              perView={3}
              className="mb-4"
              renderItem={renderProductCard}
            />
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Custom product card renderer:</strong> Improved layout
                with flexible height (min 280px), proper text overflow handling
                with line-clamp-2, and Tailwind CSS styling. Shows 3 slides on
                desktop, 1 on mobile.
              </p>
            </div>
          </div>

          {/* 2. Single Slide Hero */}
          <div className="mb-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                2. Hero Carousel (Single Slide with Custom Renderer)
              </h3>
              <p className="text-gray-600">
                Full-width single slide with autoplay
              </p>
            </div>
            <Carousel
              items={heroItems}
              title="CAMPAIGNS"
              showNavigation={true}
              showScrollbar={true}
              perView={1}
              autoplay={5000}
              renderItem={renderHeroItem}
            />
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Config:</strong> perView: 1 (always single slide),
                autoplay: 5000ms, focusAt: 'center', rewind on desktop only
              </p>
            </div>
          </div>
        </section>
      </div>
    </DemoPageWrapper>
  )
}
