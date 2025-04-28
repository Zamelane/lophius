import { LanguageManager } from "web-server/managers"
import { fetcher } from "../helpers/fetcher"
import { languagesConfigUrl } from "../helpers/urls"
import { LanguagesConfig } from "../types"

export const autoParseLanguages = async () => {
  const url = languagesConfigUrl()
  const { data, successful } = await fetcher<LanguagesConfig>(url)

  if (!successful || !data)
    throw new Error('Ошибка запроса конфигурации языков')

  for (const language of data)
  {
    const manager = new LanguageManager({
      ...language
    })
    await manager.save()
  }
}