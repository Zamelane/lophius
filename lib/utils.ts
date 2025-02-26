import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isErrorsIncluded(
  obj: { [key: string]: string[] | undefined } | undefined,
  search: string
) {
  if (!obj)
    return false

  const keys = Object.keys(obj)

  if (!keys.length)
    return false

  return keys.includes(search)
}