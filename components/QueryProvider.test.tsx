import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import QueryProvider from './QueryProvider'

// Mock the dependencies
vi.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client-provider">{children}</div>
  ),
}))

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}))

vi.mock('@/tanstack-query/get-query-client', () => ({
  getQueryClient: vi.fn(() => ({})),
}))

describe('QueryProvider', () => {
  it('should render children', () => {
    render(
      <QueryProvider>
        <div data-testid="test-child">Test Child</div>
      </QueryProvider>,
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should render QueryClientProvider wrapper', () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>,
    )

    expect(screen.getByTestId('query-client-provider')).toBeInTheDocument()
  })

  it('should render ReactQueryDevtools', () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>,
    )

    expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <QueryProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </QueryProvider>,
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
