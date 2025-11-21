import { queryOptions } from '@tanstack/react-query'
import { API_ENDPOINTS, QUERY_KEYS } from '@/constants/api'
import axiosClient from '@/libs/axios-client'

export const footerQuery = queryOptions({
  queryKey: QUERY_KEYS.FOOTER,
  queryFn: async () => {
    const isBrowser = typeof window !== 'undefined'
    const url = isBrowser
      ? API_ENDPOINTS.FOOTER
      : `http://localhost:3000${API_ENDPOINTS.FOOTER}`
    const response = await axiosClient.get(url)
    return response.data
  },
})
