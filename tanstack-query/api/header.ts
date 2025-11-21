import { queryOptions } from '@tanstack/react-query'
import { API_ENDPOINTS, QUERY_KEYS } from '@/constants/api'
import axiosClient from '@/libs/axios-client'

export const headerQuery = queryOptions({
  queryKey: QUERY_KEYS.HEADER,
  queryFn: async () => {
    const isBrowser = typeof window !== 'undefined'
    const url = isBrowser
      ? API_ENDPOINTS.HEADER
      : `http://localhost:3000${API_ENDPOINTS.HEADER}`
    const response = await axiosClient.get(url)
    return response.data
  },
})
