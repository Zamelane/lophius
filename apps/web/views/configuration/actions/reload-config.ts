'use server'
import type { ApiResponse } from '@/interfaces'
import { getEnv, loadConfig } from '@/lib/config'
import { buildConnectUrl, updateDatabaseCredentials } from 'database'

export async function ReloadConfig(newEnv?: { [key: string]: string }): Promise<
  ApiResponse<undefined>
> {
  try {
    loadConfig(newEnv)
    const env = getEnv()
    updateDatabaseCredentials(
      buildConnectUrl({
        dbName: env.DB_DATABASE!,
        host: env.DB_HOST!,
        password: env.DB_PASSWORD!,
        port: env.DB_PORT!,
        user: env.DB_USER!
      })
    )
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
