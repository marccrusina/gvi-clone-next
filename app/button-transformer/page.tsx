'use client'

import React from 'react'
import DemoPageWrapper from '@/components/DemoPageWrapper'
import { transformButtonProps, transformMultipleButtonProps } from '@/utils/button-transformer'
import type { ApiButtonData } from '@/types/button'

/**
 * Button Transformer Demo Page
 * Demonstrates how the universal button transformer works with various API data structures
 */
export default function ButtonTransformerPage() {
  // Example 1: GrandVision CMS Hero Banner (from home content API)
  const heroBannerButton: ApiButtonData = {
    callToActionHash: '',
    callToActionEnabled: true,
    callToActionText: 'SCOPRI LA COLLEZIONE',
    style: 'cta-fill-primary',
    target: {
      type: 'CMSPage',
      title: 'Nuova Collezione',
      formattedUrl: '/collezioni/novita'
    }
  }

  // Example 2: GrandVision Teaser Module (LXTeaser type)
  const teaserButton: ApiButtonData = {
    callToActionText: 'Prenota Visita',
    callToActionEnabled: true,
    style: 'cta-outline-secondary',
    target: {
      type: 'CMExternalPage',
      title: 'Prenotazione',
      formattedUrl: '/prenota-visita',
      openInNewWindow: true
    }
  }

  // Example 3: Product Collection CTA (from catalog response)
  const collectionButton: ApiButtonData = {
    callToActionText: 'Acquista Ora',
    callToActionEnabled: true,
    style: 'cta-fill-primary',
    formattedUrl: '/prodotti/occhiali-da-sole',
    elementId: 'collection-cta-sunglasses'
  }

  // Example 4: Store Locator Button (like in actual GrandVision)
  const storeLocatorButton: ApiButtonData = {
    callToActionHash: '',
    callToActionEnabled: true,
    callToActionText: 'TROVA NEGOZIO',
    style: 'cta-fill-tertiary',
    target: {
      type: 'CMExternalPage',
      title: 'Trova il tuo negozio GrandVision',
      formattedUrl: '/trova-negozi',
      openInNewWindow: false
    }
  }

  // Example 5: Real GrandVision Content Module Buttons
  const contentModuleButtons: ApiButtonData[] = [
    {
      // Product detail CTA
      callToActionText: 'Visualizza Prodotto',
      callToActionEnabled: true,
      style: 'cta-fill-primary',
      target: {
        type: 'ProductPage',
        partNumber: '0RB4395__901_31',
        formattedUrl: '/prodotti/ray-ban-rb4395-901-31'
      },
      elementId: 'product-view-cta'
    },
    {
      // External service link (common in GrandVision)
      callToActionText: 'Assistenza Clienti',
      callToActionEnabled: true,
      style: 'cta-outline-secondary',
      target: {
        type: 'CMExternalPage',
        title: 'Supporto GrandVision',
        formattedUrl: 'https://support.grandvision.it',
        openInNewWindow: true
      }
    },
    {
      // Eye test booking (core GrandVision service)
      callToActionText: 'Prenota Esame Vista',
      callToActionEnabled: true,
      style: 'cta-fill-quaternary',
      target: {
        type: 'ServicePage',
        title: 'Controllo della Vista',
        formattedUrl: '/servizi/esame-vista'
      },
      elementId: 'eye-test-booking'
    }
  ]

  // Transform all buttons
  const transformedHeroButton = transformButtonProps(heroBannerButton)
  const transformedTeaserButton = transformButtonProps(teaserButton)
  const transformedCollectionButton = transformButtonProps(collectionButton)
  const transformedStoreLocatorButton = transformButtonProps(storeLocatorButton)
  const transformedContentModuleButtons = transformMultipleButtonProps(contentModuleButtons)

  const examples = [
    {
      title: 'Hero Banner CTA',
      description: 'Large primary button for hero sections',
      apiData: heroBannerButton,
      transformed: transformedHeroButton
    },
    {
      title: 'Teaser External Link',
      description: 'Secondary outlined button linking to external site',
      apiData: teaserButton,
      transformed: transformedTeaserButton
    },
    {
      title: 'Collection Button',
      description: 'Button with GrandVision callToAction structure',
      apiData: collectionButton,
      transformed: transformedCollectionButton
    },
    {
      title: 'GrandVision Store Locator',
      description: 'Store locator button with GrandVision target structure',
      apiData: storeLocatorButton,
      transformed: transformedStoreLocatorButton
    }
  ]

  return (
    <DemoPageWrapper>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Button Transformer Demo
        </h1>
        <p style={{ color: '#6b7280' }}>
          Educational examples using GrandVision-realistic API structures and button patterns
        </p>
      </div>

        {/* Individual Examples */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
          {examples.map((example, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                {example.title}
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>{example.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* API Input */}
                <div>
                  <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>API Input</h3>
                  <pre style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '12px', overflowX: 'auto' }}>
                    {JSON.stringify(example.apiData, null, 2)}
                  </pre>
                </div>

                {/* Transformed Props */}
                <div>
                  <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Transformed Props</h3>
                  <pre style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '4px', fontSize: '12px', overflowX: 'auto' }}>
                    {JSON.stringify(example.transformed, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Multiple Buttons Example */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Multiple Buttons (GrandVision Content Module)
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Real GrandVision content module with product, service, and support buttons
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>API Input Array</h3>
              <pre style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '12px', overflowX: 'auto', maxHeight: '256px' }}>
                {JSON.stringify(contentModuleButtons, null, 2)}
              </pre>
            </div>

            <div>
              <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Transformed Array</h3>
              <pre style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '4px', fontSize: '12px', overflowX: 'auto', maxHeight: '256px' }}>
                {JSON.stringify(transformedContentModuleButtons, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Transformation Features */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', marginTop: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Transformer Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>GrandVision API Properties</h3>
              <ul style={{ fontSize: '14px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>• <code>callToActionText</code> - Button text from CMS</li>
                <li>• <code>callToActionEnabled</code> - Button visibility flag</li>
                <li>• <code>style</code> - GrandVision button styles (cta-fill-primary, etc.)</li>
                <li>• <code>target.formattedUrl</code> - Navigation URL</li>
                <li>• <code>target.type</code> - Page type (CMSPage, ProductPage, etc.)</li>
                <li>• <code>target.openInNewWindow</code> - External link behavior</li>
                <li>• <code>elementId</code> - Analytics tracking identifier</li>
                <li>• <code>formattedUrl</code> - Direct URL (fallback)</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Output Button Props</h3>
              <ul style={{ fontSize: '14px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>• <code>variant</code> - primary, secondary, tertiary, quaternary</li>
                <li>• <code>fillType</code> - fill, outline</li>
                <li>• <code>size</code> - small, medium, big</li>
                <li>• <code>fullwidth</code> - boolean</li>
                <li>• <code>external</code> - boolean</li>
                <li>• <code>to</code> - string or LinkProps object</li>
                <li>• <code>dataElementId</code> - tracking identifier</li>
              </ul>
            </div>
          </div>
        </div>
    </DemoPageWrapper>
  )
}
