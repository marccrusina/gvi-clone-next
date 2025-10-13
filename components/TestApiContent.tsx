'use client'

import { observer } from 'mobx-react-lite'
import {
  handleInvalidateAndRefetch,
  handleReset,
  handleSyncWithQuery,
} from '@/components/demo-events'
import { useTestApiContent } from '@/components/useTestApiContent'
import { testApiContentStore } from '@/stores/test-api-content-store'

const TestApiContent = observer(() => {
  // Trigger the fetching of the data from Tanstack Query using this custom hook
  useTestApiContent({
    componentName: 'TestApiContent',
    enableLogging: true,
  })

  const content = testApiContentStore.data
  const error = testApiContentStore.error

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Test API Content Demo</h2>
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
          <strong>Store Status:</strong> {testApiContentStore.status}
        </p>
        <p>
          <strong>Store Has Data:</strong>{' '}
          {testApiContentStore.hasData ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Store Is Loading:</strong>{' '}
          {testApiContentStore.isLoading ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Store Error:</strong>{' '}
          {testApiContentStore.error?.message || 'None'}
        </p>
        <p>
          <strong>Last Fetch Time:</strong>{' '}
          {testApiContentStore.lastFetchTime
            ? new Date(testApiContentStore.lastFetchTime).toLocaleString()
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
            type="button"
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
            type="button"
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
            type="button"
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

export default TestApiContent
