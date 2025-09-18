import { queryOptions } from '@tanstack/react-query'

export const homeContent = queryOptions({
  queryKey: ['home-content'],
  queryFn: async () => {
    const response = await fetch(
      'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4'
    )

    return response.json()
  },
})
