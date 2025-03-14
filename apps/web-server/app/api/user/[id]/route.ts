import { NextResponse } from "next/server";
import { GetUserByIdApiHandler } from "@/actions/api/user/[id]/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as string | undefined

  let response

  if (id)
    response = await GetUserByIdApiHandler(id)

  return NextResponse.json(response)
}