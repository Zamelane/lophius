type TranslationValues = Record<string, never>
type Formats = Record<string, never>

export type TranslationFunctionType = (
  key: string,
  values?: TranslationValues,
  formats?: Formats
) => string
