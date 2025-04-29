import { pgEnum } from 'drizzle-orm/pg-core'

export const media_types = pgEnum('media_types', [
  'kino',
  'anime',
  'comic',
  'book',
  'music'
])
