import { ReactNode } from 'react'

interface DemoPageWrapperProps {
  children: ReactNode
}

/**
 * Wrapper component for demo pages
 * Provides consistent layout structure that can be easily removed when transitioning to production
 */
export default function DemoPageWrapper({ children }: DemoPageWrapperProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '32px 0' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
