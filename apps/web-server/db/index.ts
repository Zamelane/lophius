import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DB_URL!);

// Для плагинов
export * from 'drizzle-orm'