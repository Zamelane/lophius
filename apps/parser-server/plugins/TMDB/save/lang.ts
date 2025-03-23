import { LanguageManager } from 'web-server/managers'

export async function CheckExistOrCreateLangByISO(iso_639_1: string) {
  const lang = await LanguageManager.getAllByISO_639_1(iso_639_1)

  if (lang)
    return

  await LanguageManager.create({
    
  })
  return
}