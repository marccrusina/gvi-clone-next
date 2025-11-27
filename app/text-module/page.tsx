'use client'
import type React from 'react'
import { useState } from 'react'
import TextModule from '@/components/text-module'
import type { ICMCollection, IPlacement } from '@/types/common'
import styles from './styles/text-module.module.scss'

// Mock data for LXTeaser variant
const mockLXTeaserPlacement: IPlacement = {
  items: [
    {
      type: 'LXTeaser',
      id: '1',
      teaserPreTitle: 'Summer Collection',
      teaserTitle1: 'Quali sono le principali tipologie di lenti a contatto?',
      teaserTitleValue: 'Discover New Eyewear Styles',
      teaserTextValue:
        '<p>Explore our latest collection of premium eyewear designed for comfort and style.</p>',
      teaserIcon: 'icon-eyewear',
      teaserText2:
        '<div><p>Esistono diverse tipologie di lenti a contatto disponibili sul mercato. Esse si distinguono innanzitutto per:</p><p><br/></p><ul><li>Frequenza di utilizzo: giornaliere o riutilizzabili (quindicinali o mensili)</li><li>Tipologia di difetto da correggere: miopia o ipermetropia, astigmatismo e presbiopia</li><li>Materiali e tecnologie: idrogel o silicone idrogel</li></ul></div>',
      teaserTitle: 'Discover New Eyewear Styles',
      teaserLXCallToActionSettings: [
        {
          callToActionEnabled: true,
          callToActionText: 'Shop Now',
          callToActionHash: '/shop',
          style: 'arn-cta--primary',
          target: {
            type: 'link',
            url: '/eyewear',
          },
        },
        {
          callToActionEnabled: true,
          callToActionText: 'Learn More',
          callToActionHash: '/info',
          style: 'arn-cta--secondary',
          target: {
            type: 'link',
            url: '/about',
          },
        },
      ],
      teaserOverlay2Settings: 'overlay-light',
      teaserOverlay2Style: 'text-dark',
      teaserOverlay2TextAlign: 'center',
    },
  ],
  viewtype: 'compact',
}

// Mock data for CMArticle variant
const mockCMArticlePlacement: IPlacement = {
  items: [
    {
      type: 'LXTeaser',
      id: '2',
      title: 'The Art of Perfect Vision',
      teaserPreTitle: 'Health & Wellness',
      teaserTitle1: 'Lenti a contatto in palestra',
      teaserTitleValue: 'The Art of Perfect Vision',
      teaserText2:
        '<div><p>Negli ultimi anni sempre più persone si prendono cura del proprio aspetto fisico andando <strong>regolarmente in palestra</strong>, almeno una volta alla settimana, sia per allenarsi con pesi e macchinari di vario tipo sia per frequentare diverse tipologie di corsi. Statisticamente, <strong>molte di queste persone soffrono di disturbi visivi</strong> e portano dunque occhiali da vista, che possono rivelarsi fastidiosi durante l’esercizio fisico.</p><p><br/></p><p>Le lenti a contatto sono la <strong>soluzione ideale per tutte queste persone</strong>. Comode e pratiche, le lenti a contatto garantiscono comfort e sicurezza anche al chiuso e presentano diversi vantaggi per gli amanti del fitness:</p><p><br/></p><ul><li>garantiscono una visione periferica migliore rispetto agli occhiali da vista, per l’assenza della montatura, che potrebbe ostruire la vista nelle parti più esterne degli occhi;</li><li>rimangono sempre trasparenti e non si sporcano né appannano;</li><li>sono più sicure degli occhiali da vista, che potrebbero danneggiarsi soprattutto in caso di attività che prevedono il contatto fisico.</li><li>Per chi preferisce non indossare gli occhiali da vista durante l’allenamento, la soluzione migliore è optare per comode<strong> lenti a contatto</strong> <strong>giornaliere morbide</strong>, preferibilmente in <strong>silicone idrogel altamente permeabile all’ossigeno</strong>: non richiedono alcuna manutenzione, basta indossarle prima di iniziare l’allenamento e gettarle non appena finito, prima di farsi la doccia.</li></ul></div>',
      teaserTextValue:
        '<p>Learn about the importance of regular eye care and how to maintain healthy vision throughout your life.</p>',
      teaserLXCallToActionSettings: [
        {
          callToActionEnabled: true,
          callToActionText: 'Read Article',
          callToActionHash: '/article',
          style: 'arn-cta--primary',
          target: {
            type: 'link',
            url: '/blog/vision-guide',
          },
        },
      ],
    },
  ],
  viewtype: 'article',
}

// Mock data for collection variant
const _mockCMCollectionPlacement: ICMCollection = {
  teasableItems: [
    {
      type: 'LXTeaser',
      id: '3',
      teaserPreTitle: 'Exclusive Offer',
      teaserTitleValue: 'Up to 50% Off',
      teaserTextValue:
        "<p>Limited time offer on selected items. Don't miss out!</p>",
      teaserIcon: 'icon-sale',
      teaserText: 'teaserTextValue',
      teaserTitle: 'teaserTitleValue',
      teaserLXCallToActionSettings: [
        {
          callToActionEnabled: true,
          callToActionText: 'Shop Sale',
          callToActionHash: '/sale',
          style: 'arn-cta--primary',
          target: {
            type: 'link',
            url: '/sale',
          },
        },
      ],
      teaserOverlay2Settings: 'overlay-dark',
      teaserOverlay2Style: 'text-light',
      teaserOverlay2TextAlign: 'left',
    },
  ],
  viewtype: 'collection',
}

interface DemoVariant {
  id: string
  name: string
  description: string
  placement: IPlacement | ICMCollection
  teaserIndex?: number
}

const TextModuleDemo: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<string>('lx-teaser')

  const variants: DemoVariant[] = [
    {
      id: 'lx-teaser',
      name: 'LX Teaser',
      description: 'Teaser component with icon, title, text, and CTAs',
      placement: mockLXTeaserPlacement,
      teaserIndex: 0,
    },
    {
      id: 'cm-article',
      name: 'CMS Article',
      description: 'Article component with title and description',
      placement: mockCMArticlePlacement,
      teaserIndex: 1,
    },
  ]

  const currentVariant = variants.find((v) => v.id === selectedVariant)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>TextModule Component Demo</h1>
        <p>Showcase of different TextModule variants and configurations</p>
      </div>

      {/* Variant Selector */}
      <div className={styles.selectorSection}>
        <h2>Select Variant</h2>
        <div className={styles.buttonGroup}>
          {variants.map((variant) => (
            <button
              type="button"
              key={variant.id}
              className={`${styles.variantButton} ${
                selectedVariant === variant.id ? styles.active : ''
              }`}
              onClick={() => setSelectedVariant(variant.id)}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.column}>
          {/* JSON Data Display */}
          <div className={styles.dataPanel}>
            <h3>CMS Data (Input)</h3>
            <div className={styles.jsonDisplay}>
              <pre>
                <code>
                  {JSON.stringify(currentVariant?.placement, null, 2)}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={styles.column}>
          {/* Component Preview */}
          <div className={styles.previewPanel}>
            <h3>Component Output</h3>
            <div className={styles.componentPreview}>
              {currentVariant && (
                <TextModule
                  placement={currentVariant.placement}
                  teaserIndex={currentVariant.teaserIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={styles.descriptionSection}>
        <h3>Variant Description</h3>
        <p>{currentVariant?.description}</p>
      </div>
    </div>
  )
}

export default TextModuleDemo
