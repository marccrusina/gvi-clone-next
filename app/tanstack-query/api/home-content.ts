import { queryOptions } from '@tanstack/react-query'
import { apiLogger } from '@/lib/simple-logger'

export const homeContent = queryOptions({
  queryKey: ['home-content'],
  queryFn: async () => {
    const url =
      'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4'

    apiLogger.logApiCall(url, 'GET')

    const startTime = performance.now()

    try {
      const response = await fetch(url)
      const duration = Math.round(performance.now() - startTime)

      if (!response.ok) {
        apiLogger.logApiResponse(url, response.status, duration, {
          error: `HTTP ${response.status}: ${response.statusText}`,
        })
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      apiLogger.logApiResponse(url, response.status, duration, {
        dataSize: JSON.stringify(data).length,
        data: JSON.stringify(data),
      })

      return data
    } catch (error) {
      const duration = Math.round(performance.now() - startTime)
      apiLogger.error('API call failed', error, {
        url,
        duration,
        endpoint: 'home-content',
      })
      throw error
    }
  },
})
