import fs from 'fs'
import { db, eq } from "../../../../../../../packages/database"
import { files } from "../../../../../../../packages/database/schemas/files"
import { NextResponse } from "next/server"
import { GetPathByFilename } from '@/lib/utils/upload-file'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as string | undefined
  const numberId = Number(id)

  if (isNaN(numberId))
    return NextResponse.json(null, { status: 404 })

  const [file] = await db.select()
    .from(files)
    .where(eq(files.id, numberId))
  
    if (!file)
      return NextResponse.json(null, { status: 404 })

    try {
      const imagePath = GetPathByFilename(file.hash, `.${file.ext}`)
      // Читаем файл с диска
      const imageBuffer = fs.readFileSync(imagePath);
  
      // Возвращаем изображение с правильным Content-Type
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/' + file.ext, // Указываем MIME-тип изображения
        },
      });
    } catch (error) {
      console.error('Error reading image:', error);
      return NextResponse.json({ error: 'Failed to load image' }, { status: 500 });
    }
}