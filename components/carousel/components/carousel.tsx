'use client'

import Glide from '@glidejs/glide'
import { useEffect, useMemo, useRef, useState } from 'react'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@/styles/carousel.scss'

import type {
  GlideCarouselProps,
  ProcessedCarouselItem,
} from '@/components/carousel/types/carousel'
import { useBreakpoints } from '@/hooks/useBreakpoints'

interface CarouselComponentProps extends Omit<GlideCarouselProps, 'items'> {
  items?: ProcessedCarouselItem[]
  renderItem?: (item: ProcessedCarouselItem, index: number) => React.ReactNode
  title?: string
  showNavigation?: boolean
  showScrollbar?: boolean
  carouselType?: 'basic' | 'gallery' | 'product-tile' | 'mobile-only'
}

/**
 * Universal Carousel Component
 * Renders a Glide carousel with responsive design patterns
 */
export default function Carousel({
  items = [],
  renderItem,
  className = '',
  title,
  showNavigation = true,
  showScrollbar = false,
  carouselType = 'basic',
  ...glideProps
}: CarouselComponentProps) {
  const glideRef = useRef<HTMLDivElement>(null)
  const [glideInstance, setGlideInstance] = useState<Glide | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Responsive breakpoint logic
  const { isDesktop, isMobile, isTabletPortrait, isTabletLandscape } =
    useBreakpoints()
  // Default item renderer
  const defaultRenderItem = (item: ProcessedCarouselItem, _index: number) => {
    return (
      <div
        key={item.id}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {item.imageUrl && (
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontSize: '24px' }}>🏷️</span>
          </div>
        )}

        {item.title && (
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: '0',
              textAlign: 'center',
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
            }}
          >
            {item.subtitle}
          </p>
        )}

        {item.description && (
          <p
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              margin: '0',
              textAlign: 'center',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.description}
          </p>
        )}

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
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '8px',
            }}
            onClick={() =>
              item.cta &&
              window.open(item.cta.link, item.cta.external ? '_blank' : '_self')
            }
          >
            {item.cta.text}
          </button>
        )}
      </div>
    )
  }

  // Responsive logic for dynamic behavior
  const deviceBreakpoint = isMobile ? 2 : isTabletPortrait ? 4 : 3
  const isTabletLandscapeOrDesktop = isDesktop || isTabletLandscape
  const carouselTeasersCount = !isDesktop ? 3 : 4
  const isWithCarousel = items?.length >= carouselTeasersCount

  const glideConfig = useMemo(() => {
    const autoplayValue: number | false =
      glideProps.autoplay === false || glideProps.autoplay === undefined
        ? false
        : typeof glideProps.autoplay === 'number'
          ? glideProps.autoplay
          : 4000

    const basePerView = isMobile ? 1 : glideProps.perView || 3

    return {
      type: glideProps.type || 'carousel',
      perView: basePerView,
      gap: glideProps.gap !== undefined ? glideProps.gap : 8,
      autoplay: autoplayValue,
      animationDuration: glideProps.animationDuration || 400,
      focusAt: 0,
      rewind: !isMobile,

      // Responsive breakpoint configuration
      breakpoints: glideProps.breakpoints || {
        600: {
          perView: 1,
          gap: glideProps.gap !== undefined ? glideProps.gap : 8,
        },
        1024: {
          perView: glideProps.perView || 3,
          gap: glideProps.gap !== undefined ? glideProps.gap : 8,
        },
      },

      // Design system uses keyboard: isTabletLandscapeOrDesktop
      keyboard: isTabletLandscapeOrDesktop,

      // Touch interaction
      touchRatio: 0.5,
      dragThreshold: 120,
      swipeThreshold: 80,

      // Bound slides
      bound: true,
    }
  }, [
    glideProps.type,
    glideProps.perView,
    glideProps.gap,
    glideProps.autoplay,
    glideProps.animationDuration,
    glideProps.breakpoints,
    isMobile,
    isTabletLandscapeOrDesktop,
  ])

  useEffect(() => {
    if (glideRef.current && items.length > 0 && isWithCarousel) {
      // Initialize Glide with responsive configuration
      const glide = new Glide(glideRef.current, glideConfig)

      // Add event listeners for tracking slide changes
      glide.on('run', () => {
        setCurrentSlide(glide.index || 0)
      })

      glide.mount()
      setGlideInstance(glide)

      return () => {
        glide.destroy()
        setGlideInstance(null)
      }
    }
  }, [items, glideConfig, isWithCarousel])

  // Navigation handlers (Design system pattern: direct method calls on instance)
  const handlePrevSlide = () => {
    glideInstance?.go('<')
  }

  const handleNextSlide = () => {
    glideInstance?.go('>')
  }

  // Custom scrollbar progress calculation
  const scrollProgress =
    items.length > 0 ? ((currentSlide + 1) / items.length) * 100 : 0

  const itemRenderer = renderItem || defaultRenderItem

  // Determine CSS classes based on carousel type and props
  const carouselClasses = [
    'carousel-wrapper',
    className,
    `carousel-${carouselType}`,
    showScrollbar && 'carousel-glide-with-scrollbar',
    'carousel-responsive',
  ]
    .filter(Boolean)
    .join(' ')

  // Show static grid for fewer items instead of carousel
  if (!isWithCarousel) {
    return (
      <section className={carouselClasses}>
        {title && <h2 className="carousel-title">{title}</h2>}
        <div
          className="carousel-static-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(items.length, deviceBreakpoint)}, 1fr)`,
            gap: '20px',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="carousel-grid-item">
              {itemRenderer(item, index)}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={carouselClasses}>
      {title && <h2 className="carousel-title">{title}</h2>}

      <div className="carousel-slider-container">
        {/* Navigation - left arrow */}
        {showNavigation && isTabletLandscapeOrDesktop && (
          <div className="carousel-slider-navigation-container">
            <button
              type="button"
              className="carousel-slider-navigation-button"
              onClick={handlePrevSlide}
              aria-label="Previous slide"
            >
              <span className="sr-only">Previous</span>←
            </button>
          </div>
        )}

        {/* Main Glide Carousel */}
        <div
          className={`carousel-glide ${carouselType === 'basic' ? 'carousel-basic' : ''} ${carouselType === 'product-tile' ? 'carousel-product-tile-glide' : ''} ${carouselType === 'mobile-only' ? 'carousel-mobile-only-glide' : ''}`}
          ref={glideRef}
        >
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {items.map((item, index) => (
                <li key={item.id} className="glide__slide">
                  <div className="carousel-slide-content">
                    {itemRenderer(item, index)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation - Right arrow */}
        {showNavigation && isTabletLandscapeOrDesktop && (
          <div className="carousel-slider-navigation-container">
            <button
              type="button"
              className="carousel-slider-navigation-button"
              onClick={handleNextSlide}
              aria-label="Next slide"
            >
              <span className="sr-only">Next</span>→
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar */}
      {showScrollbar && (
        <div className="carousel-custom-scrollbar">
          <div
            className="scrollbar-progress"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Pagination bullets - Mobile/Tablet only */}
      {!isTabletLandscapeOrDesktop && (
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`glide__bullet ${index === currentSlide ? 'glide__bullet--active' : ''}`}
              data-glide-dir={`=${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Custom Progress Bar */}
      {showScrollbar && (
        <div className="carousel-custom-progressbar">
          <span style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        </div>
      )}
    </section>
  )
}
