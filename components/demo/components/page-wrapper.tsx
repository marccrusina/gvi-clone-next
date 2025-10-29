import type { ReactNode } from 'react'
import styles from './page-wrapper.module.scss'

interface DemoPageWrapperProps {
  children: ReactNode
}

/**
 * Wrapper component for demo pages
 * Provides consistent layout structure that can be easily removed when transitioning to production
 */
export default function DemoPageWrapper({ children }: DemoPageWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
