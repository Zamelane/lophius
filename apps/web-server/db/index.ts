import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './tables'

export const db = drizzle(process.env.DB_URL!, { schema });

// Для плагинов
export * from 'drizzle-orm'