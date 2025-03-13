import { NextApiRequest } from "next";
import { GetUserByIdApiHandler } from "@/actions/api/user/[id]/route";

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as string | undefined

  let response

  if (id)
    response = await GetUserByIdApiHandler(id)

  return Response.json(response)
}