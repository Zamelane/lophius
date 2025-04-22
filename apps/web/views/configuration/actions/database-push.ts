"use server";

import { promisify } from "util";
import { exec } from "child_process";
import { ApiResponse } from "@/interfaces";

const execAsync = promisify(exec);

export async function DatabasePush(): Promise<ApiResponse<string>> {
  try {
    const projectPath = process.cwd();
    // Выполняем команду
    const { stdout, stderr } = await execAsync(`cd ${projectPath} && cd ../.. && bun db:full`);

    console.log(stdout)
    console.log(stderr)

    if (!stderr.includes('Changes applied') && !stdout.includes('Changes applied')) {
      throw new Error(stderr + "\n\n" + stdout);
    }

    return {
      success: true,
      data: stdout,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        i18n: "",
        message: err instanceof Error ? err.message : `${err}`,
      },
    };
  }
}