'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MenuContent } from "@/components/me-ui/custom-menu";
import { DetailedInfoDataType } from "@/interfaces/edit-types";
import { Plus, TrashIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { GenreSelect } from "@/components/template-components/media/selects/genre-select";
import { CountrySelect } from "@/components/template-components/media/selects/country-select";
import { LanguageSelect } from "@/components/template-components/media/selects/language-select";
import { EditSection, EditSectionItem, EditSectionGroup } from "@/components/me-ui/custom-edit";
import { KinoTypeSelect } from "@/components/template-components/media/selects/kino-type-select";
import { KinoCategorySelect } from "@/components/template-components/media/selects/kino-category-select";

type Props = DetailedInfoDataType

export function DefaultInfo({
  genres,
  languages,
  countries
}: Props) {
  return (
    <MenuContent>

      <EditSection isRequired title="Тип медиа">
        <EditSectionItem>
          <KinoTypeSelect/>
          <KinoCategorySelect/>
        </EditSectionItem>
      </EditSection>

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

      <EditSection isRequired title="Основная информация">
        <EditSectionItem>
          <Input type='number' placeholder="Год выпуска"/>
          <GenreSelect genres={genres} className="w-full" placeholder="Жанры" languages={languages} />
          {/* <LanguageSelect placeholder="Тип" className="w-full"/>
          <LanguageSelect className="w-full" placeholder="Возростная метка"/> */}
        </EditSectionItem>
      </EditSection>

      <EditSection title="Внешние ссылки">
        <EditSectionItem>
          <EditSectionGroup>
            <Input placeholder="Внешняя ссылка"/>
            <Button variant='ghost' className="w-9 h-9">
              <SquareArrowOutUpRightIcon />
            </Button>
            <Button variant='ghost' className="w-9 h-9 hover:bg-destructive hover:text-white">
              <TrashIcon />
            </Button>
          </EditSectionGroup>
        </EditSectionItem>
        <EditSectionItem>
          <Button className="w-full" variant='secondary'>
            <Plus/>
            Добавить внешнюю ссылку
          </Button>
        </EditSectionItem>
      </EditSection>

    </MenuContent>
  )
}