import type { Translate } from 'database/models/Translate/type'

export function translationEstimation(data: Translate) {
  let score = 0

  if (data.title) score++
  if (data.overview) score++
  if (data.tagline) score++
  if (data.homepage) score++

  if (data.overview && data.overview.length > 25) score++
  if (data.tagline && data.tagline.length > 0) score++
  if (data.homepage && data.homepage.length >= 9) score++
  if (data.runtime > 0) score++

  return score
}
