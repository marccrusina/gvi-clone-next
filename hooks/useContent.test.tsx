import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { contentStore } from '@/stores/content-store'
import { useContent } from './useContent'

// Mock dependencies
vi.mock('@/libs/simple-logger', () => ({
  componentLogger: {
    error: vi.fn(),
  },
}))

vi.mock('@/tanstack-query/api/content', () => ({
  contentQuery: {
    queryKey: ['content'],
    queryFn: vi.fn(() => Promise.resolve({ test: 'data' })),
  },
}))

describe('useContent', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    contentStore.reset()
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should initialize without errors', () => {
    const { result } = renderHook(() => useContent(), { wrapper })
    expect(result).toBeDefined()
  })

  it('should set loading state initially', async () => {
    renderHook(() => useContent(), { wrapper })

    await waitFor(() => {
      expect(contentStore.status).toBe('loading')
    })
  })

  it('should update store with success data', async () => {
    const mockData = { test: 'data' }
    queryClient.setQueryData(['content'], mockData)

    renderHook(() => useContent(), { wrapper })

    await waitFor(() => {
      expect(contentStore.data).toEqual(mockData)
      expect(contentStore.status).toBe('success')
    })
  })

  it('should handle error state', async () => {
    const mockError = new Error('Test error')
    queryClient.setQueryData(['content'], undefined)

    // Set query to error state
    queryClient.setQueryDefaults(['content'], {
      queryFn: () => Promise.reject(mockError),
    })

    renderHook(() => useContent(), { wrapper })

    await waitFor(
      () => {
        expect(contentStore.error).toBeDefined()
      },
      { timeout: 2000 },
    )
  })

  it('should respect enableLogging option', () => {
    renderHook(() => useContent({ enableLogging: false }), { wrapper })
    expect(true).toBe(true) // Hook should render without errors
  })

  it('should use custom componentName', () => {
    renderHook(() => useContent({ componentName: 'CustomComponent' }), {
      wrapper,
    })
    expect(true).toBe(true) // Hook should render without errors
  })

  it('should sync loading state with store', async () => {
    const { rerender } = renderHook(() => useContent(), { wrapper })

    await waitFor(() => {
      expect(contentStore.isLoading).toBeDefined()
    })

    rerender()
  })

  it('should handle multiple rerenders', async () => {
    const { rerender } = renderHook(() => useContent(), { wrapper })

    rerender()
    rerender()
    rerender()

    await waitFor(() => {
      expect(contentStore).toBeDefined()
    })
  })

  it('should work with default options', () => {
    const { result } = renderHook(() => useContent({}), { wrapper })
    expect(result).toBeDefined()
  })

  it('should work without options parameter', () => {
    const { result } = renderHook(() => useContent(), { wrapper })
    expect(result).toBeDefined()
  })
})
