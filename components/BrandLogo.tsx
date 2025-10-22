'use client'

import Image from 'next/image'
import type React from 'react'
import '@/styles/brandLogo.scss'

// The props interface remains the same.
export interface BrandLogoProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  // We combine the default style with any custom className passed in.
  const logoClassName = `.logoWrapper ${className || ''}`.trim()

  return (
    <div className={logoClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority // This satisfies the "Pre-load" requirement.
      />
    </div>
  )
}

export default BrandLogo
