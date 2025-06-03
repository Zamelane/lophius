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



export const mediaStatuses = [
  'ready',
  'preliminary'
] as const

export const media_status = pgEnum('internal_media_statuses', mediaStatuses)

export type MediaStatusType = typeof media_status.enumValues[number]