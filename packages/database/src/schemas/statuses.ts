import { pgEnum } from "drizzle-orm/pg-core";

export const statuses = pgEnum('statuses', [
  'canceled',
  'coming out',
  'completed',
  'in production',
  'ongoing',
  'planned'
])

export type StatusesEnumType = typeof statuses.enumValues[number]