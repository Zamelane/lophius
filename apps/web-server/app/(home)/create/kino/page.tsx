import { CustomMenu } from "@/components/me-ui/custom-menu";
import { ContentLayout } from "@/components/template-components/other/content-layout";

const tabs = [
  {
    id: "info",
    title: "Основная информация"
  },
  {
    id: "related",
    title: "Связанное"
  }
]

export default function KinoCreatePage() {
  return (
    <ContentLayout className="px-4">
      <CustomMenu tabs={tabs}/>
    </ContentLayout>
  )
}

type KinoInfo = {
  contentType: 'film' | 'serial'
  contentCategory: 'anime' | 'film'
  // Вводится в общем о фильме
  original: {
    languageId: number
    title: string
    primaryCountries: number[] // Исходная страна
    procutionCountries: number[] // Кто учавствовал в производстве (кто попал в фильм) ?
    status: 'canceled' | 'coming out' | 'completed' | 'in production' | 'ongoing' | 'planned'
    isAdult: boolean // Для извращенцев ?
    creators: number[] // personId (персоны) авторы/создатели
    homepage: string
    spokenLanguages: number[] // languageId (разговорыне языки)
    ageRatings: number[]      // ageRatingId (возрастные категории)
    releases: {
      ageRatingId: number
      date: Date
      languageId: number
      type: 'digital' | 'physical' | 'premiere' | 'theatrical' | 'theatrical (limited)' | 'TV' | 'unknown'
    }[]
    genres: number[]
    budget: {
      value: number
      moneyCharacter: string
    }
    productionCompanies: number[] // Продакшн-компании и студии (нужно хранить тип)
  }
  // Переводы
  titles: {             // Альтернативные названия
    languageId: number
    value: string
  }[]
  overviews: {
    languageId: number
    value: string
  }[]
  taglines: {
    languageId: number
    value: string
  }[]
  trailers: {
    type: 'behind the scenes' | 'bloopers' | 'excerpt' | 'short film' | 'teaser' | 'trailer'
    quality: '4K-2160' | 'HD-1080' | 'HD-720' | 'HQ' | 'standard'
    url: string
  }[]
  externals: {
    sourceId: number
    value: string
  }
  keywords: string[]
  /* Прочее */
  animePersonages: {
    personageId: number // personId
    isPrimary: boolean  // ГГ ???
    voiceActor: {
      personId: number
      languageId: number
    }
  }[]
}

type FilmInfo = KinoInfo & {
  duration: number
  structure: {
    personId: number
    type: 'cast' | 'crew' // съёмочный и актёрский составы
    castRoleId: number
    personage: {          // Кого актёр играл
      personId: number
    }
  }[]
}

type SerialInfo = KinoInfo & {
  
}