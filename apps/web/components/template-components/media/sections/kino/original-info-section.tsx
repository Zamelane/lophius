import { EditSection, EditSectionItem } from '@/components/me-ui/custom-edit'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import type {
  CountryInfoDataType,
  LanguageInfoDataType,
  OriginalLanguageInfoDataType
} from '@/interfaces/edit-types'

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
