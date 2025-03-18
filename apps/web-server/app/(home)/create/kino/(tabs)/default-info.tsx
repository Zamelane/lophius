'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MenuContent } from "@/components/me-ui/custom-menu";
import { Plus, TrashIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { LanguageSelect } from "@/components/template-components/media/selects/language-select";
import { EditSection, EditSectionItem, EditSectionGroup } from "@/components/me-ui/custom-edit";
import { KinoTypeSelect } from "@/components/template-components/media/selects/kino-type-select";
import { KinoCategorySelect } from "@/components/template-components/media/selects/kino-category-select";

export function DefaultInfo() {
  return (
    <MenuContent>

      <EditSection isRequired title="Тип медиа">
        <EditSectionItem>
          <KinoTypeSelect/>
          <KinoCategorySelect/>
        </EditSectionItem>
      </EditSection>

      <EditSection isRequired title="Интернационализация оригинала">
        <EditSectionItem>
          <LanguageSelect className="w-full" placeholder="Исходная страна"/>
        </EditSectionItem>
        <EditSectionItem>
          <LanguageSelect placeholder="Язык оригинала"/>
          <Input placeholder="Оригинальное название"/>
        </EditSectionItem>
        <EditSectionItem>
          <Textarea placeholder="Описание на языке оригинала"/>
        </EditSectionItem>
      </EditSection>

      <EditSection isRequired title="Основная информация">
        <EditSectionItem>
          <Input type='number' placeholder="Год выпуска"/>
          <LanguageSelect placeholder="Тип" className="w-full"/>
          <LanguageSelect className="w-full" placeholder="Возростная метка"/>
        </EditSectionItem>
        <EditSectionItem>
          <LanguageSelect className="w-full" placeholder="Жанры"/>
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