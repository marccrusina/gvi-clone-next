import { queryOptions } from '@tanstack/react-query'
import { API_ENDPOINTS, FALLBACK_DATA, QUERY_KEYS } from '@/constants/api'
import axiosClient from '@/libs/axios-client'

export const contentQuery = queryOptions({
  queryKey: QUERY_KEYS.CONTENT,
  queryFn: async () => {
    // Try the original API first, but fallback to fallback data if it fails
    try {
      const response = await axiosClient.get(API_ENDPOINTS.CONTENT)
      return response.data
    } catch (error) {
      // If the API fails, return fallback data for development
      console.warn('API endpoint failed, using fallback data:', error)
      return FALLBACK_DATA
    }
  },
})
