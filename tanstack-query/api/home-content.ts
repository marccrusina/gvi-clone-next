import { queryOptions } from '@tanstack/react-query'
import axiosClient from '@/libs/axios-client'

export const homeContent = queryOptions({
  queryKey: ['home-content'],
  queryFn: async () => {
    const url =
      'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4'

    try {
      const response = await axiosClient.get(url)
      return response.data
    } catch (error) {
      // Error handling is now managed by axios interceptors
      throw error
    }
  },
})
