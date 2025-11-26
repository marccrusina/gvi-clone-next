import useBreakpoints from '@/hooks/useBreakpoints'
import type { IMedia } from '@/types/Media'

const useMediaByDeviceType = (medias: IMedia[]) => {
  const { isMobile } = useBreakpoints()
  return getMediaByDeviceType(isMobile, medias)
}

// Useful for non-functional components or for conditional rendering
export const getMediaByDeviceType = (isMobile: boolean, medias?: IMedia[]) => {
  return medias
    ? isMobile && medias?.length > 1
      ? medias[1]
      : medias[0]
    : undefined
}

export default useMediaByDeviceType
