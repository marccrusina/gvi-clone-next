import BrandLogo from '@/components/BrandLogo'
import brandList from './brandlist' // 1. Import the data from the new file

export default function HomePage() {
  // 2. Use the imported brandList directly.
  //    The component no longer needs to be async.
  const brands = brandList

  return (
    <main style={{ padding: '2rem' }}>
      <header>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Our Brands</h1>
      </header>

      {/* The rest of the component remains the same */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              background: brand.background || 'transparent',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <BrandLogo
              src={brand.logo}
              alt={`${brand.name} Logo`}
              width={150} // Using a default width as it's not in the IBrands interface
              height={50} // Using a default height
            />
          </div>
        ))}
      </div>
    </main>
  )
}
