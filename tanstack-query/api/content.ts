import { queryOptions } from '@tanstack/react-query'
import { API_ENDPOINTS, FALLBACK_DATA, QUERY_KEYS } from '@/constants/api'
import axiosClient from '@/libs/axios-client'

export const contentQuery = queryOptions({
  queryKey: QUERY_KEYS.CONTENT,
  queryFn: async () => {
    // Use absolute URL for SSR, relative for browser
    const isBrowser = typeof window !== 'undefined'
    const url = isBrowser
      ? API_ENDPOINTS.CONTENT
      : `http://localhost:3000${API_ENDPOINTS.CONTENT}`
    try {
      const response = await axiosClient.get(url)
      return response.data
    } catch (error) {
      // If the API fails, return fallback data for development
      console.warn('API endpoint failed, using fallback data:', error)
      return FALLBACK_DATA
    }
  },
})
