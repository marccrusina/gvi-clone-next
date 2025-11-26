export interface IPictureMedia {
  type: 'CMPicture'
  uriTemplate: string
}

export interface IVideoMedia {
  type: 'CMVideo'
  autoplay: boolean
  data: {
    uri: string
  }
  dataUrl: string
  hideControl: boolean
  loop: boolean
  mute: boolean
  picture: {
    uriTemplate: string
  }
  playOnHover: boolean
  width: number
}

export type IMedia = IPictureMedia | IVideoMedia
