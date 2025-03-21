import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { EditSection, EditSectionItem } from "@/components/me-ui/custom-edit";
import { CountryInfoDataType, LanguageInfoDataType } from "@/interfaces/edit-types";

import { CountrySelect } from "../../selects/country-select";
import { LanguageSelect } from "../../selects/language-select";

type Props = {
  countries: CountryInfoDataType
  languages: LanguageInfoDataType
}

export function OriginalInfoSection({ countries, languages }: Props) {
  return (
    <EditSection isRequired title="Информация об оригинале">
      <EditSectionItem>
        <CountrySelect className="w-full" countries={countries} languages={languages} placeholder="Исходная страна"/>
      </EditSectionItem>
      <EditSectionItem>
        <LanguageSelect languages={languages} placeholder="Язык оригинала"/>
        <Input placeholder="Оригинальное название"/>
      </EditSectionItem>
      <EditSectionItem>
        <Textarea placeholder="Описание на языке оригинала"/>
      </EditSectionItem>
    </EditSection>
  )
}