import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Button from './Button'

// Mock useRouter
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Button', () => {
  beforeEach(() => {
    mockPush.mockClear()
    vi.stubGlobal('open', vi.fn())
  })

  it('should render button with label text', () => {
    render(<Button labelText="Click me" variant="primary" fillType="fill" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should render button with children via labelText', () => {
    render(
      <Button variant="primary" fillType="fill" labelText="Child content" />,
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('should apply correct CSS classes for variant and fillType', () => {
    render(
      <Button
        labelText="Test"
        variant="secondary"
        fillType="outline"
        size="big"
      />,
    )
    const button = screen.getByText('Test')
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn--secondary')
    expect(button).toHaveClass('btn--outline')
    expect(button).toHaveClass('btn--big')
  })

  it('should apply fullwidth class when fullwidth is true', () => {
    render(
      <Button
        labelText="Full Width"
        variant="primary"
        fillType="fill"
        fullwidth={true}
      />,
    )
    const button = screen.getByText('Full Width')
    expect(button).toHaveClass('btn--full')
  })

  it('should apply loading class when loading is true', () => {
    render(
      <Button
        labelText="Loading"
        variant="primary"
        fillType="fill"
        loading={true}
      />,
    )
    const button = screen.getByText('Loading')
    expect(button).toHaveClass('is-loading')
  })

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(
      <Button
        labelText="Click"
        variant="primary"
        fillType="fill"
        onClick={handleClick}
      />,
    )
    const button = screen.getByText('Click')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should navigate using router.push for internal links', () => {
    render(
      <Button
        labelText="Navigate"
        variant="primary"
        fillType="fill"
        to="/about"
      />,
    )
    const button = screen.getByText('Navigate')
    fireEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/about')
  })

  it('should open external link in new window for external URLs', () => {
    const mockOpen = vi.fn(() => ({ opener: {} }) as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="External"
        variant="primary"
        fillType="fill"
        to="https://example.com"
      />,
    )
    const button = screen.getByText('External')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalledWith('https://example.com', '_blank')
  })

  it('should open external link when external prop is true', () => {
    const mockOpen = vi.fn(() => ({ opener: {} }) as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="External"
        variant="primary"
        fillType="fill"
        to="/some-path"
        external={true}
      />,
    )
    const button = screen.getByText('External')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalledWith('/some-path', '_blank')
  })

  it('should handle LinkProps object with href', () => {
    render(
      <Button
        labelText="Link Object"
        variant="primary"
        fillType="fill"
        to={{ href: '/contact' }}
      />,
    )
    const button = screen.getByText('Link Object')
    fireEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/contact')
  })

  it('should open LinkProps with target="_blank" in new window', () => {
    const mockOpen = vi.fn(() => ({ opener: {} }) as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="New Tab"
        variant="primary"
        fillType="fill"
        to={{ href: '/page', target: '_blank' }}
      />,
    )
    const button = screen.getByText('New Tab')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalledWith('/page', '_blank')
  })

  it('should handle LinkProps with external URL', () => {
    const mockOpen = vi.fn(() => ({ opener: {} }) as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="External Link"
        variant="primary"
        fillType="fill"
        to={{ href: 'https://google.com' }}
      />,
    )
    const button = screen.getByText('External Link')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalledWith('https://google.com', '_blank')
  })

  it('should set opener to null for security when opening new window', () => {
    const mockNewWindow = { opener: {} as Window | null }
    const mockOpen = vi.fn(() => mockNewWindow as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="Secure"
        variant="primary"
        fillType="fill"
        to="https://example.com"
      />,
    )
    const button = screen.getByText('Secure')
    fireEvent.click(button)
    expect(mockNewWindow.opener).toBeNull()
  })

  it('should handle window.open returning null', () => {
    const mockOpen = vi.fn(() => null)
    window.open = mockOpen

    render(
      <Button
        labelText="No Window"
        variant="primary"
        fillType="fill"
        to="https://example.com"
      />,
    )
    const button = screen.getByText('No Window')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalled()
  })

  it('should default size to "big" when size is "big"', () => {
    render(
      <Button
        labelText="Big Button"
        variant="primary"
        fillType="fill"
        size="big"
      />,
    )
    const button = screen.getByText('Big Button')
    expect(button).toHaveClass('btn--big')
  })

  it('should use provided size when not "big"', () => {
    render(
      <Button
        labelText="Small Button"
        variant="primary"
        fillType="fill"
        size="small"
      />,
    )
    const button = screen.getByText('Small Button')
    expect(button).toHaveClass('btn--small')
  })

  it('should handle URLs starting with //', () => {
    const mockOpen = vi.fn(() => ({ opener: {} }) as Window)
    window.open = mockOpen

    render(
      <Button
        labelText="Protocol Relative"
        variant="primary"
        fillType="fill"
        to="//example.com"
      />,
    )
    const button = screen.getByText('Protocol Relative')
    fireEvent.click(button)
    expect(mockOpen).toHaveBeenCalledWith('//example.com', '_blank')
  })

  it('should render with all variant types', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'quaternary'] as const
    variants.forEach((variant) => {
      const { container } = render(
        <Button
          labelText={`${variant} button`}
          variant={variant}
          fillType="fill"
        />,
      )
      const button = screen.getByText(`${variant} button`)
      expect(button).toHaveClass(`btn--${variant}`)
      container.remove()
    })
  })

  it('should handle button click with both onClick and navigation', () => {
    const handleClick = vi.fn()
    render(
      <Button
        labelText="Both"
        variant="primary"
        fillType="fill"
        onClick={handleClick}
        to="/page"
      />,
    )
    const button = screen.getByText('Both')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/page')
  })
})
