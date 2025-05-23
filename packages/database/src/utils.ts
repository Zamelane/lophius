import { createConsola } from 'consola'

/**
 * Возвращает первую запись из выборки запроса к базе данных
 * @param rows
 * @param callback
 */
export function queryOneResult<T>(
  rows: null | T | T[] | undefined,
  callback?: (result: T) => void
): T | undefined {
  if (!rows) return undefined // Проверка на null/undefined

  if (Array.isArray(rows)) {
    if (rows.length === 0) return undefined
    const result = rows[0]! // Non-null assertion, так как length проверен
    callback?.(result)
    return result
  }

  callback?.(rows)
  return rows
}

/**
 * Превращает часть полей в необязательные для заполнения
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
/**
 * Превращает часть полей в обязательные для заполнения
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

/**
 * Возвращает только те свойства из объекта, которые есть в типе (защищаем от лишних данных)
 * @param obj
 * @param keys
 */
export function pickExistingByType<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * Логгер
 */
export const logger = createConsola({
  level: Number(process.env.DEBUG_LEVEL ?? 4), // 4 = debug, 3 = info, 2 = warn, 1 = error
  formatOptions: {
    colors: true,
    compact: false
  }
})
