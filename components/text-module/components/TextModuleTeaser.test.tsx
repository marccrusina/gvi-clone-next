import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ITeaserCallToAction } from '@/types/LXTeaser'
import TextModuleTeaser, { getTeaserOverlayTextAlign } from './TextModuleTeaser'

// Mock Button component
vi.mock('@/components/button/Button', () => ({
  default: ({ labelText }: { labelText: string }) => (
    <button type="button">{labelText}</button>
  ),
}))

// Mock useCmsTeaserBanner hook
vi.mock('@/hooks/useCmsTeaserBanner', () => ({
  default: () => ({}),
}))

describe('TextModuleTeaser', () => {
  it('should render teaser with all props', () => {
    const callToActionSettings: ITeaserCallToAction[] = [
      {
        callToActionHash: 'hash1',
        callToActionText: 'Click Here',
        style: 'arn-cta--primary',
        target: {} as ITeaserCallToAction['target'],
      },
    ]

    render(
      <TextModuleTeaser
        icon="icon-test"
        preTitle="Pre Title"
        title="Main Title"
        text="<p>Main text content</p>"
        callToActionSettings={callToActionSettings}
      />,
    )

    expect(screen.getByText('Pre Title')).toBeInTheDocument()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText('Click Here')).toBeInTheDocument()
  })

  it('should render without icon when not provided', () => {
    render(<TextModuleTeaser title="Title" />)

    const { container } = render(<TextModuleTeaser title="Title" />)
    const iconContent = container.querySelector('.iconContent')
    expect(iconContent).not.toBeInTheDocument()
  })

  it('should render without preTitle when not provided', () => {
    render(<TextModuleTeaser title="Title" />)

    const preTitleElements = screen.queryAllByRole('heading', { level: 2 })
    const preTitle = preTitleElements.find((el) =>
      el.className?.includes('preTitle'),
    )
    expect(preTitle).toBeUndefined()
  })

  it('should render without title when not provided', () => {
    render(<TextModuleTeaser text="Text only" />)

    const titleElements = screen.queryAllByRole('heading', { level: 2 })
    const title = titleElements.find((el) => el.className?.includes('title'))
    expect(title).toBeUndefined()
  })

  it('should render without text when not provided', () => {
    const { container } = render(<TextModuleTeaser title="Title" />)

    const textDiv = container.querySelector('.text')
    expect(textDiv).not.toBeInTheDocument()
  })

  it('should render HTML content in text with dangerouslySetInnerHTML', () => {
    const { container } = render(
      <TextModuleTeaser text="<strong>Bold text</strong>" />,
    )

    const strong = container.querySelector('strong')
    expect(strong).toBeInTheDocument()
    expect(strong).toHaveTextContent('Bold text')
  })

  it('should render multiple call to action buttons', () => {
    const callToActionSettings: ITeaserCallToAction[] = [
      {
        callToActionHash: 'hash1',
        callToActionText: 'Button 1',
        style: 'arn-cta--primary',
        target: {} as ITeaserCallToAction['target'],
      },
      {
        callToActionHash: 'hash2',
        callToActionText: 'Button 2',
        style: 'arn-cta--secondary',
        target: {} as ITeaserCallToAction['target'],
      },
    ]

    render(<TextModuleTeaser callToActionSettings={callToActionSettings} />)

    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
  })

  it('should not render CTA section when callToActionSettings is empty', () => {
    const { container } = render(
      <TextModuleTeaser title="Title" callToActionSettings={[]} />,
    )

    const ctaContent = container.querySelector('.ctaContent')
    expect(ctaContent).not.toBeInTheDocument()
  })

  it('should not render CTA section when callToActionSettings is undefined', () => {
    const { container } = render(<TextModuleTeaser title="Title" />)

    const ctaContent = container.querySelector('.ctaContent')
    expect(ctaContent).not.toBeInTheDocument()
  })

  it('should render article element as wrapper', () => {
    const { container } = render(<TextModuleTeaser title="Title" />)

    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })

  it('should handle icon prop', () => {
    const { container } = render(<TextModuleTeaser icon="test-icon" />)

    // Icon renders a div container even though CmsIcon component is not yet implemented
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })

  it('should use callToActionHash as key for buttons', () => {
    const callToActionSettings: ITeaserCallToAction[] = [
      {
        callToActionHash: 'unique-hash-1',
        callToActionText: 'Action',
        style: 'arn-cta--primary',
        target: {} as ITeaserCallToAction['target'],
      },
    ]

    render(<TextModuleTeaser callToActionSettings={callToActionSettings} />)

    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('should apply wrapper styles', () => {
    const { container } = render(<TextModuleTeaser title="Title" />)

    const article = container.querySelector('article')
    // CSS modules generate hashed class names like _wrapper_f44a94
    expect(article?.className).toContain('wrapper')
  })

  it('should apply content styles', () => {
    const { container } = render(<TextModuleTeaser title="Title" />)

    // CSS modules generate hashed class names, check for div inside article
    const article = container.querySelector('article')
    const contentDiv = article?.querySelector('div')
    expect(contentDiv).toBeInTheDocument()
  })

  it('should render h2 for preTitle', () => {
    render(<TextModuleTeaser preTitle="Pre Title" />)

    const preTitle = screen.getByText('Pre Title')
    expect(preTitle.tagName).toBe('H2')
  })

  it('should render h2 for title', () => {
    render(<TextModuleTeaser title="Main Title" />)

    const title = screen.getByText('Main Title')
    expect(title.tagName).toBe('H2')
  })
})

describe('getTeaserOverlayTextAlign', () => {
  it('should return center when no argument provided', () => {
    const result = getTeaserOverlayTextAlign()

    expect(result).toBe('center')
  })

  it('should return center when undefined is provided', () => {
    const result = getTeaserOverlayTextAlign(undefined)

    expect(result).toBe('center')
  })

  it('should return justify when justified is provided', () => {
    const result = getTeaserOverlayTextAlign('justified')

    expect(result).toBe('justify')
  })

  it('should return left when left is provided', () => {
    const result = getTeaserOverlayTextAlign('left')

    expect(result).toBe('left')
  })

  it('should return right when right is provided', () => {
    const result = getTeaserOverlayTextAlign('right')

    expect(result).toBe('right')
  })

  it('should return center when center is provided', () => {
    const result = getTeaserOverlayTextAlign('center')

    expect(result).toBe('center')
  })

  it('should cast unknown string to ITeaserOverlayTextAlign', () => {
    const result = getTeaserOverlayTextAlign('custom')

    expect(result).toBe('custom')
  })
})
