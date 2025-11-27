// This file fulfills the "Create transform function" requirement.
// It keeps data-shaping logic separate from your components.

import type { BrandLogoProps } from '@/components/BrandLogo' // Using path alias '@'

// 1. Define the shape of the data you expect from your API or CMS.
//    (This is an example, you should update it to match your actual API response)
interface ApiLogoData {
  logo_image_url: string
  alternate_text: string
  image_width: number
  image_height: number
}

// 2. The transform function.
//    It takes the raw API data and returns an object that matches our component's props.
export const transformApiToBrandLogoProps = (
  apiData: ApiLogoData,
): BrandLogoProps => {
  return {
    src: apiData.logo_image_url,
    alt: apiData.alternate_text,
    width: apiData.image_width,
    height: apiData.image_height,
  }
}

// --- New Transformer based on your BrandIcon styles ---

// 1. Define the props for the BrandIcon component that uses your styled-components.
export interface BrandIconProps {
  src: string
  alt: string
  width?: number
  height?: number
  isTabletLandscape?: boolean
  isInverted: boolean
  isPradaLineaRossa?: boolean
  isScuderiaFerrari?: boolean
  isArmaniExchange?: boolean
}

// 2. Define a hypothetical shape for the incoming API data for this icon.
//    The 'brandName' string will be used to determine the boolean flags.
interface ApiBrandIconData {
  icon_url: string
  alt_text: string
  icon_width?: number
  icon_height?: number
  brand_name?: string
  invert_colors: boolean
}

// 3. The new transform function.
//    It takes the raw API data and returns an object matching the BrandIconProps.
export const transformApiToBrandIconProps = (
  apiData: ApiBrandIconData,
): BrandIconProps => {
  const {
    icon_url,
    alt_text,
    icon_width,
    icon_height,
    brand_name,
    invert_colors,
  } = apiData

  return {
    src: icon_url,
    alt: alt_text,
    width: icon_width,
    height: icon_height,
    isInverted: invert_colors,
    // Convert the brand_name string into specific boolean props for styling.
    isPradaLineaRossa: brand_name === 'prada-linea-rossa',
    isScuderiaFerrari: brand_name === 'scuderia-ferrari',
    isArmaniExchange: brand_name === 'armani-exchange',
  }
}
