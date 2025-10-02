'use client'

import { observer } from 'mobx-react-lite'
import { useHomeContent } from './useHomeContent'
import { homeContentStore } from '@/stores/home-content-store'
import { componentLogger } from '@/libs/simple-logger'

const HomeContent = observer(() => {
  useHomeContent({
    componentName: 'HomeContent',
    enableLogging: true,
  })

  const content = homeContentStore.data
  const error = homeContentStore.error

  // Demo functions to showcase features
  const handleInvalidateAndRefetch = async () => {
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

  const handleReset = () => {
    componentLogger.info('Store reset triggered', { source: 'demo-button' })
    homeContentStore.reset()
  }

  const handleSyncWithQuery = () => {
    componentLogger.info('Sync with query triggered', { source: 'demo-button' })
    homeContentStore.syncWithQuery()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Home Content Demo</h2>
      <br />

      {/* Status Display */}
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
        }}
      >
        <h3>Current Status</h3>
        <p>
          <strong>Store Status:</strong> {homeContentStore.status}
        </p>
        <p>
          <strong>Store Has Data:</strong>{' '}
          {homeContentStore.hasData ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Store Is Loading:</strong>{' '}
          {homeContentStore.isLoading ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Store Error:</strong>{' '}
          {homeContentStore.error?.message || 'None'}
        </p>
        <p>
          <strong>Last Fetch Time:</strong>{' '}
          {homeContentStore.lastFetchTime
            ? new Date(homeContentStore.lastFetchTime).toLocaleString()
            : 'Never'}
        </p>
      </div>

      {/* Demo Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Feature Demo Buttons</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={handleInvalidateAndRefetch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Invalidate & Refetch
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🗑️ Reset Store
          </button>

          <button
            onClick={handleSyncWithQuery}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Sync with Query
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
          }}
        >
          <h3 style={{ color: '#721c24' }}>Error</h3>
          <pre style={{ color: '#721c24' }}>{error.message}</pre>
        </div>
      )}

      {/* Data Display */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Content Data</h3>
        <pre
          style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '300px',
          }}
        >
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>

      {/* Feature Description */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e9ecef',
          borderRadius: '5px',
        }}
      >
        <h3>useHomeContent Hook Features Demonstrated:</h3>
        <ul>
          <li>
            <strong>TanStack Query Integration:</strong> Uses useSuspenseQuery
            for automatic data fetching
          </li>
          <li>
            <strong>MobX Store Sync:</strong> Automatically syncs query state
            with homeContentStore
          </li>
          <li>
            <strong>Comprehensive Logging:</strong> Logs component mount,
            errors, and performance
          </li>
          <li>
            <strong>Error Handling:</strong> Proper error state management and
            display
          </li>
          <li>
            <strong>Store Methods:</strong> Access to refetch, invalidate,
            reset, and sync methods
          </li>
          <li>
            <strong>Configurable Logging:</strong> Enable/disable logging with
            enableLogging option
          </li>
          <li>
            <strong>Component Name Tracking:</strong> Custom component names for
            better debugging
          </li>
        </ul>
      </div>
    </div>
  )
})

export default HomeContent
