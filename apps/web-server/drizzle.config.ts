import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './db/tables',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});