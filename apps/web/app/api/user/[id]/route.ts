import { GetUserByIdApiHandler } from '@/src/features/user/services/get-user-by-id-api-handler'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as string | undefined

  let response: Awaited<ReturnType<typeof GetUserByIdApiHandler>> | undefined =
    undefined

  if (id) response = await GetUserByIdApiHandler(id)

  return NextResponse.json(response)
}
