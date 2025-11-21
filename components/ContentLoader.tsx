// This component ensures MobX contentStore is hydrated by calling useContent()
'use client'
import { useContent } from '@/hooks/useContent'

export default function ContentLoader() {
  useContent()
  return null
}
