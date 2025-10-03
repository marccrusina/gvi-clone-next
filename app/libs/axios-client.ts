import axios from 'axios'
import { apiLogger } from './simple-logger'

// Define metadata interface for axios config
interface AxiosConfigWithMetadata {
  metadata?: {
    startTime?: number
    duration?: number
  }
}

// Create a configured axios instance
const axiosClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging outgoing requests
axiosClient.interceptors.request.use(
  (config) => {
    const url = config.url || ''
    apiLogger.logApiCall(url, config.method?.toUpperCase() || 'GET')
    return config
  },
  (error) => {
    apiLogger.error('Request interceptor error', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging responses and errors
axiosClient.interceptors.response.use(
  (response) => {
    const url = response.config.url || ''
    const status = response.status
    const duration =
      (response.config as AxiosConfigWithMetadata).metadata?.duration || 0

    apiLogger.logApiResponse(url, status, duration, {
      dataSize: JSON.stringify(response.data).length,
      data: JSON.stringify(response.data),
    })

    return response
  },
  (error) => {
    const url = error.config?.url || ''
    const status = error.response?.status || 0
    const duration =
      (error.config as AxiosConfigWithMetadata)?.metadata?.duration || 0

    apiLogger.logApiResponse(url, status, duration, {
      error: `HTTP ${status}: ${error.message}`,
    })

    apiLogger.error('API call failed', error, {
      url,
      duration,
      status,
    })

    return Promise.reject(error)
  }
)

// Add performance timing to requests
axiosClient.interceptors.request.use((config) => {
  ;(config as AxiosConfigWithMetadata).metadata = {
    startTime: performance.now(),
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    const startTime = (response.config as AxiosConfigWithMetadata).metadata
      ?.startTime
    if (startTime) {
      ;(response.config as AxiosConfigWithMetadata).metadata!.duration =
        Math.round(performance.now() - startTime)
    }
    return response
  },
  (error) => {
    const startTime = (error.config as AxiosConfigWithMetadata)?.metadata
      ?.startTime
    if (startTime) {
      ;(error.config as AxiosConfigWithMetadata).metadata!.duration =
        Math.round(performance.now() - startTime)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
