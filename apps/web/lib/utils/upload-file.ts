import fs from 'node:fs'
import sharp from 'sharp'
import path from "node:path"
import { db } from 'database'
import { api_t_keys } from "@/i18n"
import { files } from 'database/src/schemas/files'

import { getFileHash } from "./get-file-hash"
import { MakeTranslateResponse } from "../make-response"

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) ?? 7 * 1024 * 1024

export async function UploadFile(file: File|null) {
  if (!file) {
    return MakeTranslateResponse('File not provided', api_t_keys.image_not_provided, false)
  }

  if (!file.type.startsWith('image/')) {
    return MakeTranslateResponse('The file is not an image', api_t_keys.the_file_is_not_an_image, false)
  }

  if (file.size > MAX_FILE_SIZE) {
    return MakeTranslateResponse('The file is too big', api_t_keys.the_file_is_too_big, false)
  }

  // Читаем файл в Buffer
  const buffer = Buffer.from(await file.arrayBuffer())

  // Вычисляем хеш файла
  const fileHash = getFileHash(buffer)

  // Сохраняем файл на сервере
  const extSplit = file.name.split('.')
  const ext = extSplit.length ? extSplit[extSplit.length - 1] : ''

  const metadata = await sharp(buffer).metadata()

  const filePath = GetPathByFilename(fileHash, ext.length ? '.' + ext : '')

  try {
    if (!fs.existsSync(filePath))
      await fs.promises.writeFile(filePath, buffer)

    const [r] = await db.insert(files)
      .values({
        ext,
        hash: fileHash,
        size: metadata.size,
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
      })
      .returning()

    return {
      id: r.id,
      fileExt: ext,
      fileHash: fileHash
    }
  } catch (err) {
    fs.unlinkSync(filePath)
    throw new Error('Error save file: ' + err)
  }
}

export async function UploadFileByFormData(formData: FormData, key: string = 'image') {
  const file = formData.get(key) as File|null;
  return UploadFile(file)
}

function SubtreeGeneratedByString(value: string): string[] {
  const subtrees: string[] = []
  let subLength = 0

  for (let i = 0; i + subLength < value.length; i+=subLength) {
    subLength += 2
    const sub = value.substring(i, i+subLength)
    subtrees.push(sub)
  }

  const sub = value.length % subLength

  if (sub)
    subtrees.push(value.substring(value.length - sub - 1, sub))

  return subtrees
}

export function GetPathByFilename(fileHash: string, ext: string) {
  const filePath = SubtreeGeneratedByString(fileHash)
  const fileName = filePath.pop()!

  const pathToCreate = path.join(process.cwd(), '_uploads', ...filePath)

  fs.mkdirSync(pathToCreate, { recursive: true })

  return path.join(pathToCreate, fileName) + ext
}