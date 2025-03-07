import { LanguageISO } from "web-server/managers";

const DOMAIN = 'https://api.themoviedb.org'

export const moviePageUrl = (page: number, language?: LanguageISO) => (
  `${DOMAIN}/3/discover/movie`
  + `?include_adult=true`
  + `&include_video=true`
  + `&language=${
    language
      ? language.iso_639_1
      : 'en-US'
  }`
  + `&page=${page}`
  + `&sort_by=primary_release_date.desc`
)

export const languagesConfigUrl = () => (
  `${DOMAIN}/3/configuration/languages`
)

export const countriesConfigUrl = (language?: LanguageISO) => (
  `${DOMAIN}/3/configuration/countries`
  + `?language=${
    language
      ? language.iso_639_1
      : 'en-US'
  }`)