import { EditSection, EditSectionItem } from '@/src/shared/ui/custom/custom-edit'
import { Input } from '@/src/shared/ui/shadcn/input'
import type {
  GenreInfoDataType,
  LanguageInfoDataType,
  SerialProductionStatusInfoDataType
} from '@/src/shared/types/edit-types'

import { GenreSelect } from '../../selects/genre-select'
import { SerialProductionStatusSelect } from '../../selects/serial-production-status-select'

type Props = {
  serialStatus: SerialProductionStatusInfoDataType
  languages: LanguageInfoDataType
  genres: GenreInfoDataType
}

export function DefaultInfoSection({ genres, languages, serialStatus }: Props) {
  return (
    <EditSection isRequired title='Основная информация'>
      <EditSectionItem>
        <Input type='number' placeholder='Год выпуска' />
        <GenreSelect
          genres={genres}
          className='w-full'
          placeholder='Жанры'
          languages={languages}
        />
        <SerialProductionStatusSelect serialStatus={serialStatus} />
        {/* <LanguageSelect placeholder="Тип" className="w-full"/>
         <LanguageSelect className="w-full" placeholder="Возростная метка"/> */}
      </EditSectionItem>
    </EditSection>
  )
}
