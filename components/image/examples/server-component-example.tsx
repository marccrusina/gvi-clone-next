import ResponsiveImage from '../components/responsive-image'
import type { Media } from '../types/image'

// Example server component usage
export default function Banner({ placement }: { placement: { media: Media } }) {
  return (
    <section className="hero-banner">
      <ResponsiveImage
        media={placement.media}
        cropType="FULL_WIDTH_BANNER"
        alt="Hero banner"
        imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
        priority
        className="w-full h-auto"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.title} className="product-card">
          <ResponsiveImage
            media={product.media}
            cropType="PLP_TWO_TILES"
            alt={product.title}
            imageServerUrl={process.env.IMAGE_SERVER_URL || ''}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto rounded-lg"
          />
          <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
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
    <div className="space-y-8">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
