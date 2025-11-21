import { makeAutoObservable, runInAction } from 'mobx'
import { footerQuery } from '@/tanstack-query/api/footer'
import { getQueryClient } from '@/tanstack-query/get-query-client'
import type { ApiFooterData } from '@/types/header-footer'

export class FooterStore {
  data: ApiFooterData | null = null
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

  setSuccess = (data: ApiFooterData) => {
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
    const queryState = queryClient.getQueryState(footerQuery.queryKey)
    if (queryState) {
      runInAction(() => {
        if (queryState.status === 'pending') {
          this.setLoading()
        } else if (queryState.status === 'success') {
          this.setSuccess(queryState.data as ApiFooterData)
        } else if (queryState.status === 'error') {
          this.setError(queryState.error as Error)
        }
      })
    }
  }

  getCurrentData = () => {
    const queryClient = getQueryClient()
    return queryClient.getQueryData(footerQuery.queryKey)
  }

  invalidateAndRefetch = async () => {
    const queryClient = getQueryClient()
    this.setLoading()
    try {
      await queryClient.invalidateQueries({ queryKey: footerQuery.queryKey })
      const result = await queryClient.fetchQuery(footerQuery)
      this.syncWithQuery()
      return result
    } catch (error) {
      this.setError(error as Error)
      throw error
    }
  }
}

export const footerStore = new FooterStore()
