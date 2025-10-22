import ResponsiveImage from '@/components/image/components/responsive-image'
import type { Media } from '@/components/image/types/image'
import styles from './server-component-example.module.scss'

// Example server component usage
export default function Banner({ placement }: { placement: { media: Media } }) {
  return (
    <section className={styles.heroBanner}>
      <ResponsiveImage
        media={placement.media}
        cropType="FULL_WIDTH_BANNER"
        alt="Hero banner"
        imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
        priority
        className={styles.productImage}
      />
    </section>
  )
}

// Example with custom sizes
export function ProductGrid({
  products,
}: {
  products: Array<{ media: Media; title: string }>
}) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.title} className={styles.productCard}>
          <ResponsiveImage
            media={product.media}
            cropType="PLP_TWO_TILES"
            alt={product.title}
            imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.productImage}
          />
          <h3 className={styles.productTitle}>{product.title}</h3>
        </div>
      ))}
    </div>
  )
}

// Example with different crop types
export function LayoutExamples() {
  const media: Media = {
    type: 'CMPicture',
    uriTemplate: '/content/image/{cropName}/{width}',
  }

  return (
    <div className={styles.layoutExamples}>
      {/* Full width banner */}
      <ResponsiveImage
        media={media}
        cropType="FULL_WIDTH_BANNER"
        alt="Full width banner"
        imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
        priority
      />

      {/* Landscape banner */}
      <ResponsiveImage
        media={media}
        cropType="LANDSCAPE_BANNER"
        alt="Landscape banner"
        imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
      />

      {/* Square boards */}
      <div className={styles.squareGrid}>
        {['a', 'b', 'c', 'd'].map((id, idx) => (
          <ResponsiveImage
            key={`square-board-${id}`}
            media={media}
            cropType="SQUARE_BOARDS_WITHOUT_SPLIT"
            alt={`Square board ${idx + 1}`}
            imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
          />
        ))}
      </div>
    </div>
  )
}
