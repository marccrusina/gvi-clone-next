import type React from 'react'
import TextModuleArticle from '../components/TextModuleArticle'
import TextModuleTeaser from '../components/TextModuleTeaser'

export interface ComponentConfig<T = {}> {
  component: React.FC<T>
  transformer: (
    data: {
      icon?: string
      teaserTitle1?: string
      teaserText2?: string
      teaserLXCallToActionSettings?: unknown[]
    },
    context?: { viewType?: string; teaserIndex?: number },
  ) => unknown
}

export const componentRegistry: Record<
  string,
  | ComponentConfig<{
      icon?: string
      preTitle?: string
      title?: string
      text?: string
      callToActionSettings?: unknown[]
    }>
  | ComponentConfig<{
      title: string
      content: string
    }>
> = {
  LXTeaser: {
    component: TextModuleTeaser,
    transformer: (item, context) => ({
      // item,
      // viewType: context?.viewType,
      // teaserIndex: context?.teaserIndex,
      // bannerIndex: 1,
      icon: item.icon ?? '',
      preTitle: item?.teaserTitle1 ?? '',
      title: '',
      text: item?.teaserText2 ?? '',
      callToActionSettings: item?.teaserLXCallToActionSettings ?? [],
    }),
  },
  CMArticle: {
    component: TextModuleArticle,
    transformer: (item) => ({
      title: item.teaserTitle1 ?? '',
      content: item.teaserText2 ?? '',
    }),
  },
}

export const getComponentConfig = (
  type?: string,
): ComponentConfig<unknown> | null => {
  if (!type) return null
  return (componentRegistry[type] as ComponentConfig<unknown>) || null
}
