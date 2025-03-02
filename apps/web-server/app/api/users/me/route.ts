import {getUser} from "@/lib/dal";
import {MakeResponse} from "@/lib/make-response";

export async function GET(): Promise<Response> {
  const response = MakeResponse(await getUser())

  return Response.json(response)
}