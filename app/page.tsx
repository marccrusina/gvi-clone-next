'use client'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { contentStore } from '@/stores/content-store'
import { footerStore } from '@/stores/footer-store'
import { headerStore } from '@/stores/header-store'
import styles from './page.module.scss'

type ApiPlacement = {
  name: string
  viewtype?: string
  items?: Array<{
    id: string
    teaserTitle1?: string
    teaserText1?: string
    title?: string
    name?: string
  }>
}

function getBannerPlacement(placements: ApiPlacement[]) {
  return (
    placements.find(
      (p) =>
        p.name?.toLowerCase().includes('banner') ||
        p.viewtype?.toLowerCase().includes('banner'),
    ) || null
  )
}

function SectionPlacement({
  placement,
  title,
}: {
  placement: ApiPlacement | null
  title: string
  color: string
}) {
  const sectionClass = [
    styles['placement-section'],
    title.toLowerCase().includes('header') &&
      styles['placement-section--header'],
    title.toLowerCase().includes('banner') &&
      styles['placement-section--banner'],
    title.toLowerCase().includes('footer') &&
      styles['placement-section--footer'],
  ]
    .filter(Boolean)
    .join(' ')

  if (!placement || !placement.items) {
    return (
      <section className={sectionClass}>
        <h2 className={styles['placement-section__title']}>{title}</h2>
        <div className={styles['placement-section__empty']}>
          No {title.toLowerCase()} found. [{title} Placeholder]
        </div>
      </section>
    )
  }
  return (
    <section className={sectionClass}>
      <h2 className={styles['placement-section__title']}>{title}</h2>
      {placement.items.map((item) => (
        <div className={styles['placement-section__item']} key={item.id}>
          <strong>{item.teaserTitle1 || item.title || item.name}</strong>
          <div>{item.teaserText1 || item.title || item.name}</div>
        </div>
      ))}
    </section>
  )
}

const Home = observer(() => {
  useEffect(() => {
    headerStore.invalidateAndRefetch()
    footerStore.invalidateAndRefetch()
  }, [])

  // Banner placement from contentStore
  const placements = contentStore.data?.contentPlacements as
    | ApiPlacement[]
    | undefined
  const bannerPlacement = getBannerPlacement(placements || [])

  // Header and footer placements from their dedicated stores
  const headerPlacements =
    (headerStore.data?.headerPlacements as ApiPlacement[]) || []
  const footerPlacements =
    (footerStore.data?.footerPlacements as ApiPlacement[]) || []

  // Loading and error states
  const loading =
    contentStore.isLoading || headerStore.isLoading || footerStore.isLoading
  const error = contentStore.error || headerStore.error || footerStore.error

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <main>
      {headerPlacements.length > 0 ? (
        headerPlacements.map((placement) => (
          <SectionPlacement
            key={placement.items?.[0]?.id || placement.name}
            placement={placement}
            title={`Header Placement: ${placement.name}`}
            color=""
          />
        ))
      ) : (
        <SectionPlacement placement={null} title="Header Placement" color="" />
      )}
      <SectionPlacement
        placement={bannerPlacement}
        title="Banner Placement"
        color=""
      />
      {footerPlacements.length > 0 ? (
        footerPlacements.map((placement) => (
          <SectionPlacement
            key={placement.items?.[0]?.id || placement.name}
            placement={placement}
            title={`Footer Placement: ${placement.name}`}
            color=""
          />
        ))
      ) : (
        <SectionPlacement placement={null} title="Footer Placement" color="" />
      )}
    </main>
  )
})

export default Home
