import { EditSection, EditSectionItem } from '@/src/shared/ui/custom/custom-edit'
import { Input } from '@/src/shared/ui/shadcn/input'
import { Textarea } from '@/src/shared/ui/shadcn/textarea'
import type {
  CountryInfoDataType,
  LanguageInfoDataType,
  OriginalLanguageInfoDataType
} from '@/src/shared/types/edit-types'

import { CountrySelect } from '../../selects/country-select'
import { LanguageSelect } from '../../selects/language-select'

type Props = {
  countries: CountryInfoDataType
  languages: LanguageInfoDataType
  originalLanguage: OriginalLanguageInfoDataType
}

export function OriginalInfoSection({
  countries,
  languages,
  originalLanguage
}: Props) {
  return (
    <EditSection isRequired title='Информация об оригинале'>
      <EditSectionItem>
        <CountrySelect
          className='w-full'
          countries={countries}
          languages={languages}
          placeholder='Исходная страна'
        />
      </EditSectionItem>
      <EditSectionItem>
        <LanguageSelect
          languages={languages}
          value={originalLanguage}
          placeholder='Язык оригинала'
        />
        <Input placeholder='Оригинальное название' />
      </EditSectionItem>
      <EditSectionItem>
        <Textarea placeholder='Описание на языке оригинала' />
      </EditSectionItem>
    </EditSection>
  )
}
