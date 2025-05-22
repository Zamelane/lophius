'use server'

import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import type { ApiResponse } from '@/src/shared/types'

const execAsync = promisify(exec)

export async function DatabasePush(): Promise<ApiResponse<string>> {
  try {
    const projectPath = process.cwd()
    // Выполняем команду
    const { stdout, stderr } = await execAsync(
      `cd ${projectPath} && cd ../.. && bun db:full`
    )

    console.log(stdout)
    console.log(stderr)

    if (
      !stderr.includes('Changes applied') &&
      !stdout.includes('Changes applied')
    ) {
      throw new Error(`${stderr}\n\n${stdout}`)
    }

    return {
      success: true,
      data: stdout
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
