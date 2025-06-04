'use server'

import { MediaType } from "database/schemas/media_types"
import { getUserLastUpdates } from "../services/getUserLastUpdates"
import { Section } from "./section"
import { VideoMediaCard } from "./media-card"

export async function LastUserActivity({ mediaType }: { mediaType: MediaType }) {
  const activity = await getUserLastUpdates({ mediaType })

  if (activity === undefined || !activity.length) {
    return
  }

  return (
    <Section title="Продолжить просмотр">
      {activity.map((a, i) => <VideoMediaCard key={i} {...a}/> )}
    </Section>
  )
}