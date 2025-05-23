import { pgEnum } from 'drizzle-orm/pg-core'

export const media_types = pgEnum('media_types', [
  'kino',
  'anime',
  'comic',
  'book',
  'music'
])

export type MediaType = typeof media_types.enumValues[number]