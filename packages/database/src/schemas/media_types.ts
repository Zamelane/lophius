import { pgEnum } from 'drizzle-orm/pg-core'

export const mediaTypes = ['video', 'comic', 'music'] as const

export const media_types = pgEnum('media_types', mediaTypes)

export type MediaType = (typeof media_types.enumValues)[number]

export const mediaStatuses = ['ready', 'preliminary'] as const

export const media_status = pgEnum('internal_media_statuses', mediaStatuses)

export type MediaStatusType = (typeof media_status.enumValues)[number]

export const contentTypes = [
  // Для видео
  'film',
  'serial',

  // Для комиксов
  'comic',
  'novel'
] as const

export const content_types = pgEnum('content_types', contentTypes)

export type ContentTypesType = (typeof content_types.enumValues)[number]