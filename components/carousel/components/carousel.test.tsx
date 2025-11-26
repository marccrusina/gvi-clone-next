import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ProcessedCarouselItem } from '../types/carousel'

// Mock Glide.js
const mockGlideInstance = {
  mount: vi.fn(),
  destroy: vi.fn(),
  go: vi.fn(),
  on: vi.fn(),
  index: 0,
}

const MockGlide = vi.fn(() => mockGlideInstance)

vi.mock('@glidejs/glide', () => ({
  default: MockGlide,
}))

// Mock useBreakpoints hook
const mockUseBreakpoints = vi.fn()

vi.mock('@/hooks/useBreakpoints', () => ({
  useBreakpoints: mockUseBreakpoints,
}))

// Mock CSS imports
vi.mock('@glidejs/glide/dist/css/glide.core.min.css', () => ({}))
vi.mock('@/styles/carousel.scss', () => ({}))

// Import component after mocks are set up
const { default: Carousel } = await import('./carousel')

describe('Carousel Component', () => {
  const mockItems: ProcessedCarouselItem[] = [
    {
      id: '1',
      type: 'product',
      title: 'Item 1',
    },
    {
      id: '2',
      type: 'teaser',
      title: 'Item 2',
    },
    {
      id: '3',
      type: 'brand',
      title: 'Item 3',
    },
    {
      id: '4',
      type: 'collection',
      title: 'Item 4',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockGlideInstance.index = 0

    // Reset to desktop default
    mockUseBreakpoints.mockReturnValue({
      isDesktop: true,
      isMobile: false,
      isTabletPortrait: false,
      isTabletLandscape: false,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render carousel wrapper', () => {
      const { container } = render(<Carousel items={mockItems} />)

      expect(container.querySelector('.carousel-wrapper')).toBeInTheDocument()
    })

    it('should render with title when provided', () => {
      render(<Carousel items={mockItems} title="Featured Products" />)

      expect(screen.getByText('Featured Products')).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'Featured Products' }),
      ).toBeInTheDocument()
    })

    it('should not render title when not provided', () => {
      const { container } = render(<Carousel items={mockItems} />)

      expect(container.querySelector('.carousel-title')).not.toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Carousel items={mockItems} className="custom-carousel" />,
      )

      expect(container.querySelector('.custom-carousel')).toBeInTheDocument()
    })

    it('should apply carousel type classes', () => {
      const { container } = render(
        <Carousel items={mockItems} carouselType="gallery" />,
      )

      expect(container.querySelector('.carousel-gallery')).toBeInTheDocument()
    })
  })

  describe('Custom Renderer', () => {
    it('should use custom renderItem function when provided', () => {
      const customRenderer = (item: ProcessedCarouselItem) => (
        <div data-testid={`custom-${item.id}`}>Custom: {item.title}</div>
      )

      render(<Carousel items={mockItems} renderItem={customRenderer} />)

      expect(screen.getByTestId('custom-1')).toBeInTheDocument()
      expect(screen.getByText('Custom: Item 1')).toBeInTheDocument()
    })

    it('should pass item and index to custom renderer', () => {
      const renderSpy = vi.fn((item: ProcessedCarouselItem, index: number) => (
        <div key={item.id}>
          {item.title} - Index: {index}
        </div>
      ))

      render(<Carousel items={mockItems} renderItem={renderSpy} />)

      expect(renderSpy).toHaveBeenCalled()
      expect(renderSpy).toHaveBeenCalledWith(mockItems[0], 0)
      expect(renderSpy).toHaveBeenCalledWith(mockItems[1], 1)
    })
  })

  describe('Navigation Controls', () => {
    it('should render navigation buttons by default on desktop', () => {
      render(<Carousel items={mockItems} />)

      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('should hide navigation buttons when showNavigation is false', () => {
      render(<Carousel items={mockItems} showNavigation={false} />)

      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
    })

    it('should hide navigation on mobile', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: false,
        isMobile: true,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      render(<Carousel items={mockItems} />)

      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
    })

    it('should call glide.go("<") when previous button clicked', async () => {
      const user = userEvent.setup()
      render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(mockGlideInstance.mount).toHaveBeenCalled()
      })

      const prevButton = screen.getByLabelText('Previous slide')
      await user.click(prevButton)

      expect(mockGlideInstance.go).toHaveBeenCalledWith('<')
    })

    it('should call glide.go(">") when next button clicked', async () => {
      const user = userEvent.setup()
      render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(mockGlideInstance.mount).toHaveBeenCalled()
      })

      const nextButton = screen.getByLabelText('Next slide')
      await user.click(nextButton)

      expect(mockGlideInstance.go).toHaveBeenCalledWith('>')
    })
  })

  describe('Scrollbar', () => {
    it('should not render scrollbar by default', () => {
      const { container } = render(<Carousel items={mockItems} />)

      expect(
        container.querySelector('.carousel-custom-scrollbar'),
      ).not.toBeInTheDocument()
    })

    it('should render scrollbar when showScrollbar is true', () => {
      const { container } = render(<Carousel items={mockItems} showScrollbar />)

      expect(
        container.querySelector('.carousel-custom-scrollbar'),
      ).toBeInTheDocument()
    })

    it('should render progress bar when showScrollbar is true', () => {
      const { container } = render(<Carousel items={mockItems} showScrollbar />)

      expect(
        container.querySelector('.carousel-custom-progressbar'),
      ).toBeInTheDocument()
    })

    it('should apply scrollbar class to wrapper', () => {
      const { container } = render(<Carousel items={mockItems} showScrollbar />)

      expect(
        container.querySelector('.carousel-glide-with-scrollbar'),
      ).toBeInTheDocument()
    })
  })

  describe('Glide Integration', () => {
    it('should initialize Glide with correct configuration', async () => {
      render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(MockGlide).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          expect.objectContaining({
            type: 'carousel',
            perView: 3,
            gap: 8,
            autoplay: false,
            animationDuration: 400,
          }),
        )
      })
    })

    it('should mount Glide instance', async () => {
      render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(mockGlideInstance.mount).toHaveBeenCalled()
      })
    })

    it('should destroy Glide instance on unmount', async () => {
      const { unmount } = render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(mockGlideInstance.mount).toHaveBeenCalled()
      })

      unmount()

      expect(mockGlideInstance.destroy).toHaveBeenCalled()
    })

    it('should register run event listener', async () => {
      render(<Carousel items={mockItems} />)

      await waitFor(() => {
        expect(mockGlideInstance.on).toHaveBeenCalledWith(
          'run',
          expect.any(Function),
        )
      })
    })

    it('should pass custom autoplay value to Glide', async () => {
      render(<Carousel items={mockItems} autoplay={3000} />)

      await waitFor(() => {
        expect(MockGlide).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          expect.objectContaining({
            autoplay: 3000,
          }),
        )
      })
    })

    it('should pass custom perView value to Glide', async () => {
      render(<Carousel items={mockItems} perView={4} />)

      await waitFor(() => {
        expect(MockGlide).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          expect.objectContaining({
            perView: 4,
          }),
        )
      })
    })

    it('should pass custom gap value to Glide', async () => {
      render(<Carousel items={mockItems} gap={16} />)

      await waitFor(() => {
        expect(MockGlide).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          expect.objectContaining({
            gap: 16,
          }),
        )
      })
    })
  })

  describe('Static Grid (Insufficient Items)', () => {
    it('should render static grid when items count is below threshold on desktop', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: true,
        isMobile: false,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      const fewItems = mockItems.slice(0, 3) // 3 items < 4 threshold for desktop
      const { container } = render(<Carousel items={fewItems} />)

      expect(
        container.querySelector('.carousel-static-grid'),
      ).toBeInTheDocument()
      expect(container.querySelector('.glide__track')).not.toBeInTheDocument()
    })

    it('should render carousel when items count meets threshold', () => {
      const { container } = render(<Carousel items={mockItems} />)

      expect(
        container.querySelector('.carousel-static-grid'),
      ).not.toBeInTheDocument()
      expect(container.querySelector('.glide__track')).toBeInTheDocument()
    })

    it('should render empty static grid when no items provided', () => {
      const { container } = render(<Carousel items={[]} />)

      const staticGrid = container.querySelector('.carousel-static-grid')
      expect(staticGrid).toBeInTheDocument()
      expect(staticGrid).toBeEmptyDOMElement()
    })
  })

  describe('Responsive Behavior', () => {
    it('should show pagination bullets on mobile', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: false,
        isMobile: true,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      const { container } = render(<Carousel items={mockItems} />)

      expect(container.querySelector('.glide__bullets')).toBeInTheDocument()
    })

    it('should hide pagination bullets on desktop', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: true,
        isMobile: false,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      const { container } = render(<Carousel items={mockItems} />)

      expect(container.querySelector('.glide__bullets')).not.toBeInTheDocument()
    })

    it('should render correct number of bullet buttons', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: false,
        isMobile: true,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      const { container } = render(<Carousel items={mockItems} />)

      const bullets = container.querySelectorAll('.glide__bullet')
      expect(bullets).toHaveLength(mockItems.length)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels on navigation buttons', () => {
      render(<Carousel items={mockItems} />)

      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('should have screen reader text for navigation', () => {
      render(<Carousel items={mockItems} />)

      const prevButton = screen.getByLabelText('Previous slide')
      const nextButton = screen.getByLabelText('Next slide')

      expect(prevButton.querySelector('.sr-only')).toHaveTextContent('Previous')
      expect(nextButton.querySelector('.sr-only')).toHaveTextContent('Next')
    })

    it('should have ARIA labels on pagination bullets', () => {
      mockUseBreakpoints.mockReturnValue({
        isDesktop: false,
        isMobile: true,
        isTabletPortrait: false,
        isTabletLandscape: false,
      })

      render(<Carousel items={mockItems} />)

      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 4')).toBeInTheDocument()
    })
  })

  describe('Carousel Types', () => {
    it('should apply basic carousel type class', () => {
      const { container } = render(
        <Carousel items={mockItems} carouselType="basic" />,
      )

      expect(container.querySelector('.carousel-basic')).toBeInTheDocument()
    })

    it('should apply product-tile carousel type class', () => {
      const { container } = render(
        <Carousel items={mockItems} carouselType="product-tile" />,
      )

      expect(
        container.querySelector('.carousel-product-tile-glide'),
      ).toBeInTheDocument()
    })

    it('should apply mobile-only carousel type class', () => {
      const { container } = render(
        <Carousel items={mockItems} carouselType="mobile-only" />,
      )

      expect(
        container.querySelector('.carousel-mobile-only-glide'),
      ).toBeInTheDocument()
    })
  })
})
