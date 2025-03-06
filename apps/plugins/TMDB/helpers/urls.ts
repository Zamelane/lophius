export const moviePageUrl = (page: number) => (
  `https://api.themoviedb.org/3/discover/movie`
  + `?include_adult=true`
  + `&include_video=true`
  + `&language=en-US`
  + `&page=${page}`
  + `&sort_by=primary_release_date.desc`
)