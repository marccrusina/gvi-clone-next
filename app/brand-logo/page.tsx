'use client'
import BrandLogo from '@/components/BrandLogo'
import DemoPageWrapper from '@/components/demo/components/page-wrapper'
import brandList from './brandList' // 1. Import the data from the new file

export default function HomePage() {
  // 2. Use the imported brandList directly.
  //    The component no longer needs to be async.
  const brands = brandList

  return (
    <DemoPageWrapper>
      <header>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Our Brands</h1>
      </header>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {brands.map(
          (brand, index) =>
            brand.logo && ( // Check if brand.logo is not null
              <div
                key={`${brand.id}-${index}`} // Ensure the key is unique
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
            ),
        )}
      </div>
    </DemoPageWrapper>
  )
}
