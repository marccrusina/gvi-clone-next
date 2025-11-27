import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ICMCollection, IPlacement } from '@/types/common'
import TextModule from './index'

// Mock the component registry
vi.mock('./utils/component-registry', () => ({
  getComponentConfig: vi.fn((type: string) => {
    if (type === 'LXTeaser') {
      return {
        component: ({ title }: { title: string }) => (
          <div data-testid="teaser">{title}</div>
        ),
        transformer: (item: Record<string, unknown>) => ({
          title: item.teaserTitle1 || 'Default Title',
        }),
      }
    }
    if (type === 'CMArticle') {
      return {
        component: ({ content }: { content: string }) => (
          <div data-testid="article">{content}</div>
        ),
        transformer: (item: Record<string, unknown>) => ({
          content: item.teaserText || 'Default Content',
        }),
      }
    }
    return null
  }),
}))

describe('TextModule', () => {
  it('should render nothing when component type is not found', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const placement: Partial<IPlacement> = {
      items: [{ type: 'UnknownType', id: 'test-id' }],
      viewtype: 'text-module',
    }

    const { container } = render(
      <TextModule placement={placement as IPlacement} />,
    )

    expect(container).toBeEmptyDOMElement()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component type "UnknownType" not found in registry',
    )

    consoleSpy.mockRestore()
  })

  it('should render LXTeaser component for IPlacement with items', () => {
    const placement: Partial<IPlacement> = {
      items: [
        {
          type: 'LXTeaser',
          id: 'teaser-1',
          teaserTitle1: 'Test Teaser',
        },
      ],
      viewtype: 'text-module',
    }

    render(<TextModule placement={placement as IPlacement} />)

    expect(screen.getByTestId('teaser')).toHaveTextContent('Test Teaser')
  })

  it('should render CMArticle component for ICMCollection', () => {
    const placement: Partial<ICMCollection> = {
      teasableItems: [
        {
          type: 'CMArticle',
          id: 'article-1',
          teaserText: 'Article Content',
        },
      ],
      viewtype: 'faqs',
    }

    render(<TextModule placement={placement as ICMCollection} />)

    expect(screen.getByTestId('article')).toHaveTextContent('Article Content')
  })

  it('should use transformer function to prepare props', () => {
    const placement: Partial<IPlacement> = {
      items: [
        {
          type: 'LXTeaser',
          id: 'teaser-2',
          teaserTitle1: 'Transformed Title',
        },
      ],
      viewtype: 'text-module',
    }

    render(<TextModule placement={placement as IPlacement} />)

    expect(screen.getByTestId('teaser')).toHaveTextContent('Transformed Title')
  })

  it('should pass teaserIndex prop to transformer', () => {
    const placement: Partial<IPlacement> = {
      items: [
        {
          type: 'LXTeaser',
          id: 'teaser-3',
          teaserTitle1: 'Test',
        },
      ],
      viewtype: 'text-module',
    }

    render(<TextModule placement={placement as IPlacement} teaserIndex={5} />)

    expect(screen.getByTestId('teaser')).toBeInTheDocument()
  })

  it('should handle placement with teasableItems', () => {
    const placement: Partial<ICMCollection> = {
      teasableItems: [
        {
          type: 'CMArticle',
          id: 'article-2',
          teaserText: 'Some content',
        },
      ],
      viewtype: 'square-boards-with-split',
    }

    render(<TextModule placement={placement as ICMCollection} />)

    expect(screen.getByTestId('article')).toHaveTextContent('Some content')
  })

  it('should handle empty transformer result gracefully', () => {
    const placement: Partial<IPlacement> = {
      items: [
        {
          type: 'LXTeaser',
          id: 'teaser-4',
        },
      ],
      viewtype: 'text-module',
    }

    render(<TextModule placement={placement as IPlacement} />)

    expect(screen.getByTestId('teaser')).toHaveTextContent('Default Title')
  })

  it('should render nothing when item type is undefined', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const placement: Partial<IPlacement> = {
      items: [{ type: '', id: 'empty-id' }],
      viewtype: 'text-module',
    }

    const { container } = render(
      <TextModule placement={placement as IPlacement} />,
    )

    expect(container).toBeEmptyDOMElement()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component type "" not found in registry',
    )

    consoleSpy.mockRestore()
  })
})
