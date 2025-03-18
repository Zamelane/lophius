import { VideoCard } from "@/components/template-components/media/cards/video-card";
import { ContentLayout } from "@/components/template-components/other/content-layout";
import { TitleList } from "@/components/template-components/media/containers/title-list";

export default function Page() {
  return (
    <ContentLayout>
      <TitleList px={4} title="В тренде">
        <VideoCard
          link="/"
          title="Бруталист"
          subText="12 фев 2025"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/cd7k10Ym8kggNoqzpVOCgElfQj3.jpg'
          }}
        />
        <VideoCard
          link="/"
          subText="13 мар 2025"
          title="Переходный возраст"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/cl9l35nu9UQxB5sSGRncBuWUqHA.jpg'
          }}
        />
        <VideoCard
          link="/"
          subText="07 янв 2024"
          title="Solo Leveling: Поднятие уровня в одиночку"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8u56LKz0An8xa9YaFtkxsDKc5N5.jpg'
          }}
        />
        <VideoCard
          link="/"
          subText="07 янв 2025"
          title="Переродившись аристократом-неудачником, я стал великим магом!"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ssb1rdIIrT5WxK36yI9lACTe4fH.jpg'
          }}
        />
        <VideoCard
          link="/"
          title="Разделение"
          subText="17 фев 2022"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r4Jy4kbES1VCjXU8uAJlmeC7wSS.jpg'
          }}
        />
        <VideoCard
          link="/"
          subText="27 авг 2018"
          title="Место под солнцем"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eK1D7S3yfBDtx92bwSwC3Gvt8On.jpg'
          }}
        />
        <VideoCard
          link="/"
          title="Пиксели"
          subText="22 июл 2015"
          img={{
            alt: 'alt',
            width: 1400,
            height: 2100,
            src: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hpZKgjYqY9Fy0glIvQrddvgz9Ov.jpg'
          }}
        />
      </TitleList>
    </ContentLayout>
  )
}