import { pgEnum } from 'drizzle-orm/pg-core'

export const mediaTypes = [
  'kino',
  'anime',
  'comic',
  'book',
  'music'
] as const

export const media_types = pgEnum('media_types', mediaTypes)

export type MediaType = typeof media_types.enumValues[number]