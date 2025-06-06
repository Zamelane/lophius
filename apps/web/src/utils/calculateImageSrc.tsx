import { ImageType } from "../shared/types"

export function calculateImageSrc(img: ImageType) {
  return `http${img.https ? 's' : ''}://${img.domain}${img.path}`
}