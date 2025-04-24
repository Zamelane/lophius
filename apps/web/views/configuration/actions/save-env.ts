"use server";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { ApiResponse } from "@/interfaces";

type Props = {
  values: {
    [key: string]: string
  }
}

export async function SaveEnv({ values }: Props): Promise<ApiResponse<undefined>> {
  try {
    const projectPath = process.cwd();
    const targetPath = path.join(projectPath, '../../.env');
    
    let envContent = '';
    if (fs.existsSync(targetPath)) {
      envContent = fs.readFileSync(targetPath, 'utf-8');
    }

    // Разбиваем содержимое на строки и обрабатываем каждую строку
    const envLines = envContent.split('\n');
    const updatedLines: string[] = [];
    const existingKeys = new Set<string>();

    // Сначала обрабатываем существующие строки
    for (const line of envLines) {
      const trimmedLine = line.trim();
      
      // Пропускаем пустые строки и комментарии
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        updatedLines.push(line); // Сохраняем оригинальную строку с отступами
        continue;
      }

      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        
        // Если этот ключ есть в новых значениях, обновляем его
        if (key in values) {
          // Сохраняем оригинальные отступы перед ключом
          const indent = line.match(/^\s*/)?.[0] || '';
          updatedLines.push(`${indent}${key}=${values[key]}`);
          existingKeys.add(key);
        } else {
          // Иначе оставляем как было
          updatedLines.push(line);
          existingKeys.add(key);
        }
      } else {
        // Если строка не распознана как переменная, оставляем как есть
        updatedLines.push(line);
      }
    }

    // Добавляем новые переменные, которых еще нет в файле
    for (const [key, value] of Object.entries(values)) {
      if (!existingKeys.has(key)) {
        updatedLines.push(`${key}=${value}`);
      }
    }

    // Объединяем строки обратно
    const newEnvContent = updatedLines.join('\n');

    fs.writeFileSync(targetPath, newEnvContent);

    await (promisify(exec))(`cd ${process.cwd()} && cd ../.. && bun env:sync`);

    return {
      success: true,
      data: undefined,
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