// No axios needed
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { type } = req.query
  let apiUrl = ''

  switch (type) {
    case 'header':
      apiUrl =
        'https://uat-api.grandvision.it/api/v1/cms/live/page/header/grand-vision/it/it?storeId=110201&langId=-4'
      break
    case 'footer':
      apiUrl =
        'https://uat-api.grandvision.it/api/v1/cms/live/page/footer/grand-vision/it/it?storeId=110201&langId=-4'
      break
    case 'content':
      apiUrl =
        'https://uat-api.grandvision.it/api/v1/cms/live/home/content/grand-vision/it/it?storeId=110201&langId=-4'
      break
    default:
      res.status(400).json({ error: 'Invalid type' })
      return
  }

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: `Request failed with status code ${response.status}` })
      return
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    let message = 'Unknown error'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    res.status(500).json({ error: message })
  }
}
