import { makeAutoObservable, runInAction } from 'mobx'
import { contentQuery } from '@/tanstack-query/api/content'
import { getQueryClient } from '@/tanstack-query/get-query-client'
import type { ApiContentData, ApiStatus } from '@/types/api'

export class ContentStore {
  data: ApiContentData | null = null
  status: ApiStatus = 'idle'
  error: Error | null = null
  lastFetchTime: number | null = null
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  // Actions to sync with TanStack Query state
  setLoading = () => {
    this.isLoading = true
    this.status = 'loading'
    this.error = null
    this.data = null
  }

  setSuccess = (data: ApiContentData) => {
    runInAction(() => {
      this.data = data
      this.status = 'success'
      this.isLoading = false
      this.error = null
      this.lastFetchTime = Date.now()
    })
  }

  setError = (error: Error) => {
    runInAction(() => {
      this.error = error
      this.status = 'error'
      this.isLoading = false
    })
  }

  reset = () => {
    runInAction(() => {
      this.data = null
      this.status = 'idle'
      this.error = null
      this.isLoading = false
      this.lastFetchTime = null
    })
  }

  // Sync with TanStack Query state
  syncWithQuery = () => {
    const queryClient = getQueryClient()
    const queryState = queryClient.getQueryState(contentQuery.queryKey)

    if (queryState) {
      runInAction(() => {
        if (queryState.status === 'pending') {
          this.setLoading()
        } else if (queryState.status === 'success') {
          this.setSuccess(queryState.data as ApiContentData)
        } else if (queryState.status === 'error') {
          this.setError(queryState.error as Error)
        }
      })
    }
  }

  // Get current data from TanStack Query cache
  getCurrentData = () => {
    const queryClient = getQueryClient()
    return queryClient.getQueryData(contentQuery.queryKey) as
      | ApiContentData
      | undefined
  }

  // Invalidate and refetch
  invalidateAndRefetch = async () => {
    const queryClient = getQueryClient()

    this.setLoading()

    try {
      await queryClient.invalidateQueries({ queryKey: contentQuery.queryKey })
      const result = await queryClient.fetchQuery(contentQuery)

      // Sync with the updated query state after successful refetch
      this.syncWithQuery()

      return result
    } catch (error) {
      // Handle any errors during the refetch process
      this.setError(error as Error)
      throw error
    }
  }

  // Computed values
  get hasData() {
    return this.data !== null
  }

  get isSuccess() {
    return this.status === 'success'
  }

  get isError() {
    return this.status === 'error'
  }

  get isIdle() {
    return this.status === 'idle'
  }

  get isPending() {
    return this.status === 'loading'
  }
}

// Create and export a singleton instance
export const contentStore = new ContentStore()
