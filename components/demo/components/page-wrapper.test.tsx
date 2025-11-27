import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DemoPageWrapper from './page-wrapper'

describe('DemoPageWrapper', () => {
  it('should render children', () => {
    render(
      <DemoPageWrapper>
        <div data-testid="test-child">Test Content</div>
      </DemoPageWrapper>,
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <DemoPageWrapper>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </DemoPageWrapper>,
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('should render text content', () => {
    render(<DemoPageWrapper>Plain text content</DemoPageWrapper>)

    expect(screen.getByText('Plain text content')).toBeInTheDocument()
  })

  it('should render complex nested children', () => {
    render(
      <DemoPageWrapper>
        <section>
          <header>
            <h1>Title</h1>
          </header>
          <article>
            <p>Paragraph content</p>
          </article>
        </section>
      </DemoPageWrapper>,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph content')).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    const { container } = render(<DemoPageWrapper>{null}</DemoPageWrapper>)
    expect(container).toBeInTheDocument()
  })

  it('should handle React fragments as children', () => {
    render(
      <DemoPageWrapper>
        <span data-testid="fragment-1">Fragment 1</span>
        <span data-testid="fragment-2">Fragment 2</span>
      </DemoPageWrapper>,
    )

    expect(screen.getByTestId('fragment-1')).toBeInTheDocument()
    expect(screen.getByTestId('fragment-2')).toBeInTheDocument()
  })

  it('should preserve child component functionality', () => {
    const TestComponent = () => {
      return (
        <button type="button" onClick={() => {}}>
          Click me
        </button>
      )
    }

    render(
      <DemoPageWrapper>
        <TestComponent />
      </DemoPageWrapper>,
    )

    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
  })
})
