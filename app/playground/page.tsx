'use client'

import Link from 'next/link'
import DemoPageWrapper from '@/components/demo/components/page-wrapper'
import styles from './page.module.scss'

const demoCards = [
  {
    href: '/carousel/carousel-demo',
    icon: '🖼️',
    title: 'Carousel Demo',
    description:
      'Showcase of the Carousel component with sample images and navigation.',
  },
  {
    href: '/carousel/carousel-transformer',
    icon: '🔄',
    title: 'Carousel Transformer',
    description: 'Demonstrates transforming API data into carousel slides.',
  },
  {
    href: '/button/button-transformer',
    icon: '🔘',
    title: 'Button Transformer',
    description:
      'Universal button transformer demo with realistic API examples.',
  },
  {
    href: '/image',
    icon: '🖼️',
    title: "Dennis's Image Gallery",
    description:
      'Showcase of responsive image gallery and data transformation demo.',
  },
]

export default function PlaygroundPage() {
  return (
    <DemoPageWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Component Demo Playground</h1>
          <p className={styles.description}>
            Explore interactive demos for universal components. Each card links
            to a live demo with real API data and transformation logic.
          </p>
        </div>
        <div className={styles.grid}>
          {demoCards.map((card) => (
            <Link key={card.href} href={card.href} className={styles.card}>
              <span className={styles.icon}>{card.icon}</span>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDescription}>{card.description}</p>
              <span className={styles.viewDemo}>View Demo →</span>
            </Link>
          ))}
        </div>
      </div>
    </DemoPageWrapper>
  )
}
