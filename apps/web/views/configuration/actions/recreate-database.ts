'use server'
import type { ApiResponse } from '@/interfaces'
import { Client } from 'database'

type Config = {
  host: string
  port: number
  database: string
  user: string
  password: string
}

export async function RecreateDatabase(
  config: Config
): Promise<ApiResponse<undefined>> {
  console.log(55555)
  try {
    const adminClient = new Client({
      ...config,
      database: 'postgres'
    })

    await adminClient.connect()

    await adminClient.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'lophius' AND pid <> pg_backend_pid();`
    )

    // 1. Удаляем базу, если существует (без IF EXISTS будет ошибка при отсутствии БД)
    await adminClient.query(`DROP DATABASE IF EXISTS ${config.database};`)

    // 2. Создаем новую базу (здесь IF NOT EXISTS уже не нужно, т.к. мы только что удалили)
    await adminClient.query(`CREATE DATABASE ${config.database} WITH `
                          + `TEMPLATE = template0 ` // ВАЖНО !!!
                          + `ENCODING = 'UTF8' `
                          + `LC_COLLATE = 'en_US.UTF-8' `
                          + `LC_CTYPE = 'en_US.UTF-8';`
    )

    // 4. Закрываем соединение с системной БД
    await adminClient.end()

    // 5. Подключаемся к новой базе для работы со схемой
    const dbClient = new Client({
      ...config,
      database: config.database
    })
    await dbClient.connect()

    // 6. Пересоздаем схему public
    await dbClient.query('DROP SCHEMA IF EXISTS public CASCADE;')
    await dbClient.query('CREATE SCHEMA public;')

    await dbClient.end()

    return {
      success: true,
      data: undefined
    }
  } catch (err) {
    return {
      success: false,
      error: {
        i18n: '',
        message: err instanceof Error ? err.message : `${err}`
      }
    }
  }
}
