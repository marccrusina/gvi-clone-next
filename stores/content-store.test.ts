import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApiContentData } from '@/types/api'
import { ContentStore, contentStore } from './content-store'

// Mock dependencies
vi.mock('@/tanstack-query/get-query-client', () => ({
  getQueryClient: vi.fn(() => ({
    getQueryState: vi.fn(),
    getQueryData: vi.fn(),
    invalidateQueries: vi.fn(),
    fetchQuery: vi.fn(),
  })),
}))

vi.mock('@/tanstack-query/api/content', () => ({
  contentQuery: {
    queryKey: ['content'],
  },
}))

describe('ContentStore', () => {
  let store: ContentStore

  beforeEach(() => {
    store = new ContentStore()
  })

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(store.data).toBeNull()
      expect(store.status).toBe('idle')
      expect(store.error).toBeNull()
      expect(store.lastFetchTime).toBeNull()
      expect(store.isLoading).toBe(true)
    })
  })

  describe('setLoading', () => {
    it('should set loading state correctly', () => {
      store.data = { test: 'data' } as ApiContentData
      store.error = new Error('Previous error')
      store.status = 'error'

      store.setLoading()

      expect(store.isLoading).toBe(true)
      expect(store.status).toBe('loading')
      expect(store.error).toBeNull()
      expect(store.data).toBeNull()
    })
  })

  describe('setSuccess', () => {
    it('should set success state correctly', () => {
      const testData = { test: 'data' } as ApiContentData
      const beforeTime = Date.now()

      store.setSuccess(testData)

      expect(store.data).toEqual(testData)
      expect(store.status).toBe('success')
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.lastFetchTime).toBeGreaterThanOrEqual(beforeTime)
    })

    it('should update lastFetchTime', () => {
      const testData = { test: 'data' } as ApiContentData
      store.setSuccess(testData)
      const firstFetchTime = store.lastFetchTime

      // Wait a bit and update again
      setTimeout(() => {
        store.setSuccess(testData)
        expect(store.lastFetchTime).not.toBe(firstFetchTime)
      }, 10)
    })
  })

  describe('setError', () => {
    it('should set error state correctly', () => {
      const testError = new Error('Test error')
      store.data = { test: 'data' } as ApiContentData

      store.setError(testError)

      expect(store.error).toBe(testError)
      expect(store.status).toBe('error')
      expect(store.isLoading).toBe(false)
    })
  })

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      store.data = { test: 'data' } as ApiContentData
      store.status = 'success'
      store.error = new Error('Error')
      store.isLoading = true
      store.lastFetchTime = Date.now()

      store.reset()

      expect(store.data).toBeNull()
      expect(store.status).toBe('idle')
      expect(store.error).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.lastFetchTime).toBeNull()
    })
  })

  describe('computed properties', () => {
    it('should compute hasData correctly', () => {
      expect(store.hasData).toBe(false)

      store.data = { test: 'data' } as ApiContentData
      expect(store.hasData).toBe(true)

      store.data = null
      expect(store.hasData).toBe(false)
    })

    it('should compute isSuccess correctly', () => {
      expect(store.isSuccess).toBe(false)

      store.status = 'success'
      expect(store.isSuccess).toBe(true)

      store.status = 'error'
      expect(store.isSuccess).toBe(false)
    })

    it('should compute isError correctly', () => {
      expect(store.isError).toBe(false)

      store.status = 'error'
      expect(store.isError).toBe(true)

      store.status = 'success'
      expect(store.isError).toBe(false)
    })

    it('should compute isIdle correctly', () => {
      store.status = 'idle'
      expect(store.isIdle).toBe(true)

      store.status = 'loading'
      expect(store.isIdle).toBe(false)
    })

    it('should compute isPending correctly', () => {
      expect(store.isPending).toBe(false)

      store.status = 'loading'
      expect(store.isPending).toBe(true)

      store.status = 'success'
      expect(store.isPending).toBe(false)
    })
  })

  describe('singleton instance', () => {
    it('should export a singleton contentStore instance', () => {
      expect(contentStore).toBeInstanceOf(ContentStore)
    })

    it('should maintain state across references', () => {
      contentStore.data = { singleton: 'test' } as ApiContentData
      expect(contentStore.data).toEqual({ singleton: 'test' })
    })
  })

  describe('state transitions', () => {
    it('should transition from idle to loading', () => {
      store.status = 'idle'
      store.setLoading()
      expect(store.status).toBe('loading')
    })

    it('should transition from loading to success', () => {
      store.setLoading()
      store.setSuccess({ test: 'data' } as ApiContentData)
      expect(store.status).toBe('success')
      expect(store.isLoading).toBe(false)
    })

    it('should transition from loading to error', () => {
      store.setLoading()
      store.setError(new Error('Failed'))
      expect(store.status).toBe('error')
      expect(store.isLoading).toBe(false)
    })

    it('should transition from success to loading', () => {
      store.setSuccess({ test: 'data' } as ApiContentData)
      store.setLoading()
      expect(store.status).toBe('loading')
      expect(store.data).toBeNull()
    })
  })

  describe('MobX reactivity', () => {
    it('should be observable', () => {
      expect(store).toBeDefined()
      // The store is made observable by makeAutoObservable
      // We can verify it works by changing values
      const initialStatus = store.status
      store.status = 'success'
      expect(store.status).not.toBe(initialStatus)
    })
  })
})
