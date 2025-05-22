'use client'
import { CustomMenu, type Tab } from '../../../../../src/shared/ui/custom/custom-menu';
import { Title } from '@/src/shared/ui/typography/title'
import { Centrize } from '@/src/shared/ui/layout/centrize'
import { ContentLayout } from '@/src/shared/ui/layout/content-layout'
import type {
  CountryTranslation,
  GenreTranslation,
  KinoCategoryType,
  KinoTranslateType,
  KinoType,
  LanguageTranslation,
  SerialStatusType
} from '@/src/shared/types'
import { InfoIcon, LanguagesIcon } from 'lucide-react'
import { useState } from 'react'

import { DefaultInfoTab } from './(tabs)/default-info'
import { TranslateTab } from './(tabs)/translate'

const tabs: Tab[] = [
  {
    id: 'info',
    icon: InfoIcon,
    title: 'Основная информация'
  },
  {
    id: 'translate',
    title: 'Переводы',
    icon: LanguagesIcon
  }
  // {
  //   id: "production",
  //   title: "Производство"
  // },
  // {
  //   id: "translates",
  //   title: "Интернационализация"
  // },
  // {
  //   id: "seo",
  //   title: "Ключевые слова"
  // },
  // {
  //   id: "seasons",
  //   title: "Сезоны"
  // },
  // {
  //   id: "actors",
  //   title: "Актёры"
  // },
  // {
  //   id: "trailers",
  //   title: "Трейлеры"
  // },
  // {
  //   id: "related",
  //   title: "Связанное"
  // }
]

export default function KinoCreatePage() {
  const [selected, setSelected] = useState<Tab>(tabs[0])

  // Списочные значения
  const [languages, setLanguages] = useState<LanguageTranslation[]>([])
  const [countries, setCountries] = useState<CountryTranslation[]>([])
  const [genres, setGenres] = useState<GenreTranslation[]>([])
  const [links, setLinks] = useState<string[]>([])
  const [translates, setTranslates] = useState<KinoTranslateType[]>([])

  // Выбранные значения
  const [kinoType, setKinoType] = useState<KinoType | null>(null)
  const [kinoCategory, setKinoCategory] = useState<KinoCategoryType | null>(
    null
  )
  const [serialProductionStatus, setSerialProductionStatus] =
    useState<null | SerialStatusType>(null)
  const [originalLanguage, setOriginalLanguage] =
    useState<LanguageTranslation | null>(null)

  return (
    <ContentLayout className='px-4'>
      <Title className='text-center md:text-left'>Создание кино</Title>
      <CustomMenu tabs={tabs} selected={selected} setSelected={setSelected} />
      <Centrize className='p-0'>
        {selected.id === 'info' && (
          <DefaultInfoTab
            links={{ get: links, set: setLinks }}
            genres={{ get: genres, set: setGenres }}
            kinoType={{ get: kinoType, set: setKinoType }}
            languages={{ get: languages, set: setLanguages }}
            countries={{ get: countries, set: setCountries }}
            kinoCategory={{ get: kinoCategory, set: setKinoCategory }}
            originalLanguage={{
              get: originalLanguage,
              set: setOriginalLanguage
            }}
            serialStatus={{
              get: serialProductionStatus,
              set: setSerialProductionStatus
            }}
          />
        )}
        {selected.id === 'translate' && (
          <TranslateTab
            languages={{ get: languages, set: setLanguages }}
            translates={{ get: translates, set: setTranslates }}
          />
        )}
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
    status:
      | 'canceled'
      | 'coming out'
      | 'completed'
      | 'in production'
      | 'ongoing'
      | 'planned'
    isAdult: boolean // Для извращенцев ?
    creators: number[] // personId (персоны) авторы/создатели
    homepage: string
    spokenLanguages: number[] // languageId (разговорыне языки)
    ageRatings: number[] // ageRatingId (возрастные категории)
    releases: {
      ageRatingId: number
      date: Date
      languageId: number
      type:
        | 'digital'
        | 'physical'
        | 'premiere'
        | 'theatrical'
        | 'theatrical (limited)'
        | 'TV'
        | 'unknown'
    }[]
    genres: number[]
    budget: {
      value: number
      moneyCharacter: string
    }
    productionCompanies: number[] // Продакшн-компании и студии (нужно хранить тип)
  }
  // Переводы
  titles: {
    // Альтернативные названия
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
    type:
      | 'behind the scenes'
      | 'bloopers'
      | 'excerpt'
      | 'short film'
      | 'teaser'
      | 'trailer'
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
    isPrimary: boolean // ГГ ???
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
    personage: {
      // Кого актёр играл
      personId: number
    }
  }[]
}

type SerialInfo = {} & KinoInfo
