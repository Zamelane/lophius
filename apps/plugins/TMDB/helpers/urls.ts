import { LanguageISONoPriority } from "web-server/managers";

const DOMAIN = 'https://api.themoviedb.org'

export const moviePageUrl = (page: number, language?: LanguageISONoPriority) => (
  `${DOMAIN}/3/discover/movie`
  + `?include_adult=true`
  + `&include_video=true`
  + `&language=${
    language
      ? `${language.iso_639_1}${language.iso_3166_1 ? `-${language.iso_3166_1}`: ''}`
      : 'en-US'
  }`
  + `&page=${page}`
  + `&sort_by=primary_release_date.desc`
)

export const languagesConfigUrl = () => (
  `${DOMAIN}/3/configuration/languages`
)