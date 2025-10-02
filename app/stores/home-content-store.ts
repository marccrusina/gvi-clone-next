import { makeAutoObservable, runInAction } from 'mobx'
import { apiLogger } from '@/libs/simple-logger'

export interface HomeContentData {
  [key: string]: unknown
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export class HomeContentStore {
  data: HomeContentData | null = null
  status: ApiStatus = 'idle'
  error: Error | null = null
  lastFetchTime: number | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  // Actions
  setLoading = () => {
    this.isLoading = true
    this.status = 'loading'
    this.error = null
  }

  setSuccess = (data: HomeContentData) => {
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

  // Async action to fetch home content
  fetchHomeContent = async () => {
    const url =
      'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4'

    this.setLoading()
    apiLogger.logApiCall(url, 'GET')

    const startTime = performance.now()

    try {
      const response = await fetch(url)
      const duration = Math.round(performance.now() - startTime)

      if (!response.ok) {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`
        apiLogger.logApiResponse(url, response.status, duration, {
          error: errorMessage,
        })
        throw new Error(errorMessage)
      }

      const data = await response.json()
      apiLogger.logApiResponse(url, response.status, duration, {
        dataSize: JSON.stringify(data).length,
        data: JSON.stringify(data),
      })

      this.setSuccess(data)
      return data
    } catch (error) {
      const duration = Math.round(performance.now() - startTime)
      const errorObj = error instanceof Error ? error : new Error(String(error))

      apiLogger.error('API call failed', errorObj, {
        url,
        duration,
        endpoint: 'home-content',
      })

      this.setError(errorObj)
      throw errorObj
    }
  }
}

// Create and export a singleton instance
export const homeContentStore = new HomeContentStore()
