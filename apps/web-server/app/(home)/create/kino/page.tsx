'use client'
import { useState } from "react";
import { Title } from "@/components/me-ui/title";
import { CustomMenu } from "@/components/me-ui/custom-menu";
import { Centrize } from "@/components/template-components/other/centrize";
import { ContentLayout } from "@/components/template-components/other/content-layout";
import { GenreTranslation, CountryTranslation, LanguageTranslation } from "@/interfaces";

import { DefaultInfo } from "./(tabs)/default-info";

const tabs = [
  {
    id: "info",
    title: "Основная информация"
  },
  {
    id: "production",
    title: "Производство"
  },
  {
    id: "translates",
    title: "Интернационализация"
  },
  {
    id: "seo",
    title: "Ключевые слова"
  },
  {
    id: "seasons",
    title: "Сезоны"
  },
  {
    id: "actors",
    title: "Актёры"
  },
  {
    id: "trailers",
    title: "Трейлеры"
  },
  {
    id: "related",
    title: "Связанное"
  }
]

export default function KinoCreatePage() {
  const [selected, setSelected] = useState(tabs[0])

  // Списочные значения
  const [languages, setLanguages] = useState<LanguageTranslation[]>([])
  const [countries, setCountries] = useState<CountryTranslation[]>([])
  const [genres,    setGenres   ] = useState<GenreTranslation[]>([])

  // Выбранные значения

  return (
    <ContentLayout className="px-4">
      <Title className="text-center md:text-left">Создание кино</Title>
      <CustomMenu
        tabs={tabs}
        selected={selected}
        setSelected={setSelected}
      />
      <Centrize className="p-0">
        {
          selected.id === 'info'
          && <DefaultInfo 
                genres={{get: genres, set: setGenres}}
                languages={{get: languages, set: setLanguages}}
                countries={{get: countries, set: setCountries}}
              />
        }
      </Centrize>
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

type SerialInfo = {

} & KinoInfo