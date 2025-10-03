'use client'

import { observer } from 'mobx-react-lite'
import { useHomeContent } from '@/components/useHomeContent'
import { homeContentStore } from '@/stores/home-content-store'
import {
  handleInvalidateAndRefetch,
  handleReset,
  handleSyncWithQuery,
} from '@/components/demo-events'

const HomeContent = observer(() => {
  // Trigger the fetching of the data from Tanstack Query using this custom hook
  useHomeContent({
    componentName: 'HomeContent',
    enableLogging: true,
  })

  const content = homeContentStore.data
  const error = homeContentStore.error

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
    </div>
  )
})

export default HomeContent
