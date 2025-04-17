'use server'

import { db } from "database";
import {Funnel, ArrowDownUp} from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import {PageLayout} from "@/components/me-ui/page-layout";
import {PageHeader} from "@/components/me-ui/page-header";
import {GridLayout} from "@/components/me-ui/grid-layout";
import {getTvDetailedInfo} from "@/actions/server/media/tv/get-tv-detailed-info";
import { VideoCard } from "@/components/template-components/media/cards/video-card";
import { ContentLayout } from "@/components/template-components/other/content-layout";

export default async function TVCatalogPage() {
  console.time('query');
  const query_result = await db.query.medias.findMany({
    limit: 1000,
    where: (medias, { eq, and }) => and(
      eq(medias.mediaType, 'kino'),
      eq(medias.isAdult, false),
      eq(medias.isVideo, false)
    ),
    with: {
      source: {
        with: {
          pluginStorage: true
        }
      },
      translates: {
        with: {
          country: true,
          language: true
        }
      },
      externalPosters: {
        with: {
          externalImage: {
            with: {
              language: true,
              externalDomain: true
            }
          }
        }
      }
    }
  })
  console.timeEnd('query');

  const medias = []


  for (const mediaData of query_result) {
    const loadedData = await getTvDetailedInfo({
      alreadyLoadedData: mediaData
    })
    if (loadedData)
      medias.push(loadedData)
  }

  console.log(medias.length)

  return (
    <ContentLayout>
      <PageLayout>
        <PageHeader title="Каталог" actions={
          <>
            <button className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium hover:bg-accent hover:text-accent-foreground min-h-9 h-9 min-w-9 w-9 justify-center">
              <Funnel width={20} height={20} />
            </button>
            <button className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium hover:bg-accent hover:text-accent-foreground min-h-9 h-9 min-w-9 w-9 justify-center">
              <ArrowDownUp />
            </button>
          </>
        } />
        <Input placeholder="Что ищем в этот раз?"/>
        <GridLayout>
          {medias.map((v) => (
            <VideoCard
              key={v.id}
              staticSize={false}
              link={'/tv/' + v.id}
              subText="12 фев 2025"
              title={v.translates.titles.length ? v.translates.titles[0] : 'Нету'}
              img={{
                alt: 'alt',
                width: 1400,
                height: 2100,
                src: v.posters.length ? v.posters[0].imgSrc : undefined
              }}
            />
          ))}
        </GridLayout>
      </PageLayout>
    </ContentLayout>
  )
}