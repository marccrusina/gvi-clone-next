import { HomeContentParams, HomeContentResponse } from '@/types/cms'

const BASE_URL = 'https://uat-api.grandvision.it/api/v1'

export const cmsApi = {
  async getHomeContent({
    storeId,
    langId,
  }: HomeContentParams): Promise<HomeContentResponse> {
    const url = new URL(`${BASE_URL}/cms/live/home/content/grand-vision/it/it`)
    url.searchParams.set('storeId', storeId)
    url.searchParams.set('langId', langId)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch home content: ${response.status} ${response.statusText}`
      )
    }

    return response.json()
  },
}
