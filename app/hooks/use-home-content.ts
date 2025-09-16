'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '@/lib/react-query/query-keys'
import { cmsApi } from '@/lib/api/cms'
import { CMSError, HomeContentParams, HomeContentResponse } from '@/types/cms'

export function useHomeContent(
  params: HomeContentParams,
  options?: Omit<
    UseQueryOptions<HomeContentResponse, CMSError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.cms.homeContent(params.storeId, params.langId),
    queryFn: () => cmsApi.getHomeContent(params),
    enabled: Boolean(params.storeId && params.langId),
    ...options,
  })
}
