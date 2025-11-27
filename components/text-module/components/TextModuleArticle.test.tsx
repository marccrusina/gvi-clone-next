import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextModuleArticle from './TextModuleArticle'

describe('TextModuleArticle', () => {
  it('should render article with title and content', () => {
    render(
      <TextModuleArticle
        title="Article Title"
        content="Article content here"
      />,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Article Title',
    )
    expect(screen.getByText('Article content here')).toBeInTheDocument()
  })

  it('should render with empty title', () => {
    render(<TextModuleArticle title="" content="Content only" />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
  })

  it('should render with empty content', () => {
    render(<TextModuleArticle title="Title only" content="" />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Title only',
    )
    const paragraph = screen.queryByRole('paragraph')
    expect(paragraph).toBeInTheDocument()
  })

  it('should render within article element', () => {
    const { container } = render(
      <TextModuleArticle title="Test" content="Test content" />,
    )

    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
    expect(article).toContainElement(screen.getByRole('heading'))
  })

  it('should preserve HTML structure', () => {
    render(<TextModuleArticle title="Title" content="Paragraph text" />)

    const heading = screen.getByRole('heading', { level: 1 })
    const text = screen.getByText('Paragraph text')

    expect(heading).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('should render h1 element for title', () => {
    render(<TextModuleArticle title="Main Title" content="Content" />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.tagName).toBe('H1')
  })

  it('should render paragraph element for content', () => {
    const { container } = render(
      <TextModuleArticle title="Title" content="Paragraph content" />,
    )

    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('Paragraph content')
  })

  it('should handle special characters in title', () => {
    render(
      <TextModuleArticle title="<Title> & 'Special' chars" content="Content" />,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "<Title> & 'Special' chars",
    )
  })

  it('should handle special characters in content', () => {
    render(
      <TextModuleArticle title="Title" content="Content & <special> 'chars'" />,
    )

    expect(screen.getByText("Content & <special> 'chars'")).toBeInTheDocument()
  })

  it('should render long content correctly', () => {
    const longContent = 'Lorem ipsum dolor sit amet, '.repeat(50)
    const { container } = render(
      <TextModuleArticle title="Title" content={longContent} />,
    )

    // Use flexible matcher since DOM may normalize whitespace
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph?.textContent).toContain('Lorem ipsum dolor sit amet')
  })
})
