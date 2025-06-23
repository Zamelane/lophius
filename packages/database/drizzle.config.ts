import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: 'drizzle',
  dialect: 'postgresql',
  schema: './src/schemas/*',
  dbCredentials: {
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
  }
})
