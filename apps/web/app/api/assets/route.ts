import { api_t_keys } from '@/i18n'
import { MakeTranslateResponse } from '@/src/shared/lib/make-response'
import { UploadFileByFormData } from '@/src/shared/lib/utils/upload-file'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Получаем данные из формы
    const formData = await req.formData()

    const file = (await UploadFileByFormData(formData)) as {
      id: number
      fileExt: string | undefined
      fileHash: string | undefined
    }

    // По типизации не понятно, но там ответ, а не файл
    if (!file?.fileExt) return NextResponse.json(file)

    // А вот тут файл
    return NextResponse.json(file, { status: 200 })
  } catch (error) {
    console.error('Ошибка загрузки файла:', error)
    return NextResponse.json(
      MakeTranslateResponse(
        'Unidentified bug caught',
        api_t_keys.unidentified_bug_caught,
        false
      ),
      { status: 500 }
    )
  }
}
