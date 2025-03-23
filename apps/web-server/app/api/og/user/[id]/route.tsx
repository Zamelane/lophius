import { ImageResponse } from "next/og";
import { GetUserByIdApiHandler } from "@/actions/api/user/[id]/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as string | undefined

  let response

  if (id)
    response = await GetUserByIdApiHandler(id)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'white',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        @{response?.content?.nickname}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}