
'use server'

import { db } from "database";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { VideoCard } from "@/components/template-components/media/cards/video-card";

export default async function TVCatalogPage() {
  console.time('query');
  const medias = await db.query.medias.findMany({
    limit: 10,
    with: {
      translates: true
    }
  })
  console.timeEnd('query');
  //console.log(medias)
  return (
    <div className="w-full max-w-[1920px] min-h-full mx-auto box-border block px-[16px] md:px-[24px] bg-background">
      <div className="flex flex-col py-4 gap-4 min-h-full">
        <div className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl font-semibold">Каталог</h1>
          <div className="flex gap-0.5 items-center">
            <Button>TODO</Button>
          </div>
        </div>

        <Input placeholder="Что ищем в этот раз?"/>

        <div className="max-w-full mt-1">
          <div className="grid flex-grow gap-[6px] grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {
              medias.map((v, i) => (
                <VideoCard key={v.id}
                          link={'/tv/' + v.id}
                          subText="12 фев 2025"
                          title={v.translates.find(v => v.title !== undefined)?.title ?? 'Нету'}
                          img={{
                            alt: 'alt',
                            width: 1400,
                            height: 2100,
                            src: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/cd7k10Ym8kggNoqzpVOCgElfQj3.jpg'
                          }}
                        />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}