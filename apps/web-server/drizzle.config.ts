import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  dialect: 'postgresql',
  schema: './database/schemas/*',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});