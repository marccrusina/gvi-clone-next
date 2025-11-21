import { makeAutoObservable, runInAction } from 'mobx'
import { headerQuery } from '@/tanstack-query/api/header'
import { getQueryClient } from '@/tanstack-query/get-query-client'
import type { ApiHeaderData } from '@/types/header-footer'

export class HeaderStore {
  data: ApiHeaderData | null = null
  status: string = 'idle'
  error: Error | null = null
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  setLoading = () => {
    this.isLoading = true
    this.status = 'loading'
    this.error = null
    this.data = null
  }

  setSuccess = (data: ApiHeaderData) => {
    runInAction(() => {
      this.data = data
      this.status = 'success'
      this.isLoading = false
      this.error = null
    })
  }

  setError = (error: Error) => {
    runInAction(() => {
      this.error = error
      this.status = 'error'
      this.isLoading = false
    })
  }

  syncWithQuery = () => {
    const queryClient = getQueryClient()
    const queryState = queryClient.getQueryState(headerQuery.queryKey)
    if (queryState) {
      runInAction(() => {
        if (queryState.status === 'pending') {
          this.setLoading()
        } else if (queryState.status === 'success') {
          this.setSuccess(queryState.data as ApiHeaderData)
        } else if (queryState.status === 'error') {
          this.setError(queryState.error as Error)
        }
      })
    }
  }

  getCurrentData = () => {
    const queryClient = getQueryClient()
    return queryClient.getQueryData(headerQuery.queryKey)
  }

  invalidateAndRefetch = async () => {
    const queryClient = getQueryClient()
    this.setLoading()
    try {
      await queryClient.invalidateQueries({ queryKey: headerQuery.queryKey })
      const result = await queryClient.fetchQuery(headerQuery)
      this.syncWithQuery()
      return result
    } catch (error) {
      this.setError(error as Error)
      throw error
    }
  }
}

export const headerStore = new HeaderStore()
