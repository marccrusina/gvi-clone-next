export const queryKeys = {
  cms: {
    all: ['cms'] as const,
    home: () => [...queryKeys.cms.all, 'home'] as const,
    homeContent: (storeId: string, langId: string) =>
      [...queryKeys.cms.home(), 'content', { storeId, langId }] as const,
  },
} as const
