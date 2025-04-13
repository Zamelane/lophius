'use client'

import { LocaleLink } from "@/hooks/locale-link";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { ExternalLinksInfoDataType } from "@/interfaces/edit-types";
import { Plus, TrashIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { EditSection, EditSectionItem, EditSectionGroup } from "@/components/me-ui/custom-edit";

type Props = {
  links: ExternalLinksInfoDataType
}

export function ExternalLinksSection({ links: {get, set} }: Props) {
  function add() {
    if (!get.length || get[get.length - 1].length > 0)
      set(state => [...state, ""])
  }

  function remove(index: number) {
    set(state => [...state.filter((_,i) => i !== index)])
  }

  function onChangeHadler(value: string, index: number) {
    set(state => [...state.map((v,i) => i === index ? value : v)])
  }

  return (
      <EditSection title="Внешние ссылки">
        {
          get.map((v, i) => (
            <EditSectionItem key={'el_' + i}>
              <EditSectionGroup>
                <Input value={v} placeholder="Внешняя ссылка" onChange={e => onChangeHadler(e.target.value, i)}/>
                <LocaleLink href={v} target="_blank">
                  <Button variant='ghost' className="w-9 h-9">
                    <SquareArrowOutUpRightIcon />
                  </Button>
                </LocaleLink>
                <Button variant='ghost' onClick={() => remove(i)} className="w-9 h-9 hover:bg-destructive hover:text-white">
                  <TrashIcon />
                </Button>
              </EditSectionGroup>
            </EditSectionItem>
          ))
        }
        <EditSectionItem>
          <Button onClick={add} className="w-full" variant='secondary'>
            <Plus/>
            Добавить внешнюю ссылку
          </Button>
        </EditSectionItem>
      </EditSection>
  )
}