'use client'
import { useState } from 'react'
import Button from '@/components/button/Button'
import type {
  ButtonFillType,
  ButtonSize,
  ButtonVariant,
} from '@/components/button/types/button'
import DemoPageWrapper from '@/components/demo/components/page-wrapper'
import styles from './page.module.scss'

export default function ButtonDemoPage() {
  const [selectedVariant, setSelectedVariant] =
    useState<ButtonVariant>('primary')
  const [selectedFillType, setSelectedFillType] =
    useState<ButtonFillType>('fill')
  const [selectedSize, setSelectedSize] = useState<ButtonSize>('small')
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)

  // // Example 1: CMS CMS Hero Banner (from home content API)
  // const heroBannerButton: ApiButtonData = {
  //   callToActionHash: '',
  //   callToActionEnabled: true,
  //   callToActionText: 'SCOPRI LA COLLEZIONE',
  //   style: 'cta-fill-primary',
  //   target: {
  //     type: 'CMSPage',
  //     title: 'Nuova Collezione',
  //     formattedUrl: '/collezioni/novita',
  //   },
  // }
  // // Transform all buttons
  // const transformedHeroButton = transformButtonProps(heroBannerButton)

  const buttonVariants: ButtonVariant[] = [
    'primary',
    'secondary',
    'tertiary',
    'quaternary',
  ]

  const buttonFillTypes: ButtonFillType[] = ['fill', 'outline']

  const buttonSizes: ButtonSize[] = ['small', 'medium', 'big']

  return (
    <DemoPageWrapper>
      <p style={{ fontSize: 32 }}>{'Common Component: Button'}</p>
      <div className={styles.container}>
        <select
          id={`variant-dropdown`}
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value as ButtonVariant)}
          className={styles.select}
        >
          {buttonVariants.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>

        <select
          id={`filltype-dropdown`}
          value={selectedFillType}
          onChange={(e) =>
            setSelectedFillType(e.target.value as ButtonFillType)
          }
          className={styles.select}
        >
          {buttonFillTypes.map((fillType) => (
            <option key={fillType} value={fillType}>
              {fillType}
            </option>
          ))}
        </select>

        <label htmlFor="size-dropdown">Select Button Size:</label>
        <select
          id={`size-dropdown`}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value as ButtonSize)}
          className={styles.select}
        >
          {buttonSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={isFullWidth}
            onChange={(e) => setIsFullWidth(e.target.checked)}
          />
          Full Width
        </label>

        <p style={{ fontSize: 24, paddingTop: 24 }}>Output:</p>

        <Button
          variant={selectedVariant}
          fillType={selectedFillType}
          size={selectedSize}
          fullwidth={isFullWidth}
          labelText={'SCOPRI LA COLLEZIONE'}
        />
      </div>
    </DemoPageWrapper>
  )
}
