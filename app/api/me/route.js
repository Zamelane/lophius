import {getUser} from "../../../lib/dal";

export async function GET() {
  const user = await getUser()

  return Response.json(user)
}