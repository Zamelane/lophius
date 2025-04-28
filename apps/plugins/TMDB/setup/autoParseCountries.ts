import { LanguagesManager } from "web-server/managers/utils/languagesManager";
import { countriesConfigUrl } from "../helpers/urls";
import { fetcher } from "../helpers/fetcher";
import { CountryManager } from "web-server/managers/utils/countryManager";
import { CountriesPage } from "../types";

export const autoParseCountries = async () => {
  const languageManagers = await new LanguagesManager().getAll()
  const countryManagers: CountryManager[] = []

  // Запрашиваем для каждого языка
  for (const lm of languageManagers) {
    if (!lm.iso_639_1)
      continue

    const url = countriesConfigUrl({
      ...lm
    })

    // Запрашиваем перевод для конкретного языка
    const { data, successful } = await fetcher<CountriesPage>(url)

    if (!successful || !data)
      throw new Error("Не удалось запросить переводы стран")

    // Ищем менеджер для нужной страны или добавлеям новый
    for (const country of data) {
      let search

      for (const mr of countryManagers)
        if (mr.country.english_name === country.english_name) {
          search = mr
          break
        }

      // Если не нашли, то добавляем новый менеджер
      if (!search) {
        search = new CountryManager({
          ...country
        })
        countryManagers.push(search)
      }

      // Добавляем альтернативное название
      search.addNativeName({
        language: lm,
        native_name: country.native_name
      })
    }
  }

  for(const country of countryManagers) {
    // Сохраняем альтернативные названия
    await country.save()
  }
}