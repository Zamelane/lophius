'use client'

import { useState } from "react";
import { LanguageTranslation } from "@/interfaces";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { MenuContent } from "@/components/me-ui/custom-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/ui/tooltip";
import { EditSection, EditSectionItem, EditSectionGroup } from "@/components/me-ui/custom-edit";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/shadcn/ui/card";
import { CopyPlus, TypeIcon, TrashIcon, ListPlusIcon, BookDashedIcon, ChevronDownIcon, NotepadTextIcon } from "lucide-react";
import Image from "next/image";

export function TranslateTab() {
  const [translates, setTranslates] = useState<{
    isCollapsed: boolean
    language: LanguageTranslation
    overview: string
    titles: string[]
  }[]>([
    {
      overview: "",
      titles: [""],
      isCollapsed: true,
      language: { iso_639_1: 'ru', english_name: 'Russian' }
    },
    {
      overview: "",
      titles: [""],
      isCollapsed: true,
      language: { iso_639_1: 'en', english_name: 'English' }
    }
  ])

  function setCollapsed(index: number) {
    setTranslates(state => state.slice().map((v,i) => i === index ? {...v, isCollapsed: !v.isCollapsed} : v))
  }

  function addTitle(index: number) {
    const titles = translates[index].titles;
    if (!titles.length || titles[titles.length - 1].length > 1) {
      setTranslates(state => {
        return state.map((item, i) => 
          i === index
            ? { ...item, titles: [...item.titles, ''] }
            : item
        );
      });
    }
  }

  function removeTitle(index: number, titleIndex: number) {
    setTranslates(state => state.map((v,i) => i === index ? {
      ...v,
      titles: v.titles.filter((_, ti) => ti !== titleIndex)
    } : v))
  }

  function titleChange(index: number, titleIndex: number, value: string) {
    setTranslates(
      state => state.map(
        (v,i) => i === index
          ? {
            ...v,
            titles: v.titles.map(
              (t, ti) => ti === titleIndex ? value : t
            )
          }
          : v
      )
    )
  }

  function overviewChange(index: number, value: string) {
    setTranslates(state => state.map((v,i) => i === index ? {...v, overview: value} : v))
  }

  return (
    <MenuContent>
      <EditSection title="Переводы заголовков и описания">
        <EditSectionGroup>
          <Input placeholder="Поиск по языку ..."/>
          <Tooltip>
            <TooltipTrigger>
              <Button asChild className="w-min" variant="outline">
                <CopyPlus width={16}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Добавить перевод</p>
            </TooltipContent>
          </Tooltip>
        </EditSectionGroup>
        {
          translates.map((v,i) => (
            <EditSectionItem key={'td_' + i}>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center p-4">
                    <CardTitle className="flex gap-1 items-center">
                      <div className="flex items-center gap-2 px-1">
                        <Image
                          width={16}
                          height={16}
                          alt={v.language.iso_639_1}
                          src={`/images/iso-639-1/${v.language.iso_639_1}.svg`}
                        />
                        {v.language.english_name}
                      </div>
                      { v.titles[0].trim().length > 0 && (
                          <>
                            <TypeIcon/>
                            <p className="text-md text-muted-foreground truncate">{v.titles[0]}</p>
                          </>
                        )
                      }
                      {
                        v.overview.trim().length > 0
                        && (
                          <>
                            <NotepadTextIcon/>
                            <p className="text-md text-muted-foreground truncate">{v.overview}</p>
                          </>
                        )
                      }
                      {
                        !v.titles[0].trim().length
                        && !v.overview.trim().length
                        && <BookDashedIcon/>
                      }
                    </CardTitle>
                    <CardDescription>
                      
                    </CardDescription>
                  <Button variant="ghost" className="ml-auto w-5 h-7" onClick={() => setCollapsed(i)}>
                    <ChevronDownIcon/>
                  </Button>
                </CardHeader>
                {
                  !v.isCollapsed && (
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-col gap-2">
                        <Textarea
                          value={v.overview}
                          placeholder="Описание ..."
                          onChange={v => overviewChange(i, v.target.value)}
                        />
                        {
                          v.titles.map((vt,ti) => (
                            <EditSectionGroup key={'t_' + ti}>
                              <Input
                                value={vt}
                                onChange={v => titleChange(i, ti, v.target.value)}
                                placeholder={ti === 0 ? "Основной перевод названия" : "Альтернативный перевод названия"}
                              />
                              {
                                ti !== 0 && (
                                  <Button variant="destructive" onClick={() => removeTitle(i, ti)}>
                                    <TrashIcon />
                                  </Button>
                                )
                              }
                            </EditSectionGroup>
                          ))
                        }
                        <Button className="ml-auto" onClick={() => addTitle(i)}>
                          <ListPlusIcon/>
                          Добавить альтернативный перевод
                        </Button>
                      </div>
                    </CardContent>
                  )
                }
              </Card>
            </EditSectionItem>
          ))
        }
      </EditSection>
    </MenuContent>
  )
}