'use client'

import React from 'react'
import DemoPageWrapper from '@/components/DemoPageWrapper'
import DemoNavigation from '@/components/DemoNavigation'

/**
 * Playground for testing content APIs and components
 */
export default function PlaygroundPage() {
  return (
    <DemoPageWrapper>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Content Playground
        </h1>
      </div>
      <DemoNavigation />
    </DemoPageWrapper>
  )
}
