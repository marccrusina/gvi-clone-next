import { componentLogger } from '@/libs/simple-logger'
import { homeContentStore } from '@/stores/home-content-store'

export const handleInvalidateAndRefetch = async () => {
  try {
    componentLogger.info('Invalidate and refetch triggered', {
      source: 'demo-button',
    })
    await homeContentStore.invalidateAndRefetch()
  } catch (err) {
    componentLogger.error('Invalidate and refetch failed', err as Error, {
      source: 'demo-button',
    })
  }
}

export const handleReset = () => {
  componentLogger.info('Store reset triggered', { source: 'demo-button' })
  homeContentStore.reset()
}

export const handleSyncWithQuery = () => {
  componentLogger.info('Sync with query triggered', { source: 'demo-button' })
  homeContentStore.syncWithQuery()
}
