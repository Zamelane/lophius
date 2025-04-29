export function prioritizationByLanguage<T>(
  a: {
    lang: string
    data: T
  },
  b: {
    lang: string
    data: T
  },
  lang: string,
  scoreEstimationCallback: (data: T) => number,
  customRulesCallback?: (a: T, b: T) => [boolean, boolean]
) {
  // В приоритете текущий язык пользователя
  let aIsPrimary = a.lang === lang
  let bIsPrimary = b.lang === lang

  // Оцениваем наполняемость перевода
  const aScores = scoreEstimationCallback(a.data)
  const bScores = scoreEstimationCallback(a.data)

  // Если ни один из переводов не в приоритете, то оцениваем по english-признаку
  if (!aIsPrimary && !bIsPrimary) {
    aIsPrimary = a.lang === 'en'
    bIsPrimary = b.lang === 'en'
  }

  // Если всё ещё приоритетный не выявлен, то оцениваем по оригинальности перевода (язык оригинала)
  if (!aIsPrimary && !bIsPrimary && customRulesCallback) {
    ;[aIsPrimary, bIsPrimary] = customRulesCallback(a.data, b.data)
  }

  // Если оба перевода по приоритету одинаковы, то предпочитаем с наибольшим количеством баллов
  if (aIsPrimary === bIsPrimary) {
    return aScores > bScores ? -1 : aScores < bScores ? 1 : 0
  }

  // Если есть наиболее предпочтительный, то его и берём
  return aIsPrimary ? -1 : 1
}
