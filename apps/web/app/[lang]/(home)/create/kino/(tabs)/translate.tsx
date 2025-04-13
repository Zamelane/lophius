'use client'

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { MenuContent } from "@/components/me-ui/custom-menu";
import { KinoTranslatesInfoDataType } from "@/interfaces/edit-types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/ui/tooltip";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/shadcn/ui/card";
import { EditSection, EditSectionItem, EditSectionGroup } from "@/components/me-ui/custom-edit";
import { CopyPlus, TypeIcon, TrashIcon, ListPlusIcon, BookDashedIcon, ChevronDownIcon, NotepadTextIcon } from "lucide-react";
import { CreateTranslateDialog } from "@/components/template-components/media/selects/translate-dialogs/create-translate-dialog";

type Props = KinoTranslatesInfoDataType

export function TranslateTab({ languages, translates: { get: translates, set: setTranslates } }: Props) {
  const [collapsied, setCollapsied] = useState<{isCollapsed: boolean}[]>([])
  const [search, setSearch] = useState("")

  function setCollapsed(index: number) {
    setCollapsied(state => state.slice().map((v,i) => i === index ? {isCollapsed: !v.isCollapsed} : v))
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
          <Input
            value={search}
            placeholder="Поиск по языку ..."
            onChange={v => setSearch(v.target.value)}
          />
          <Tooltip>
            <TooltipTrigger>
              <CreateTranslateDialog languages={languages} translates={{get: translates, set: setTranslates}}>
                <Button asChild className="w-min" variant="outline">
                  <CopyPlus width={16}/>
                </Button>
              </CreateTranslateDialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>Добавить перевод</p>
            </TooltipContent>
          </Tooltip>
        </EditSectionGroup>
        {
          translates.map((v,i) => (
            !search.length
            || v.language.english_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            || v.language.iso_639_1.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            || (v.language.translates?.filter(v => v.value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))?.length ?? 0) > 0
          ) && (
            <EditSectionItem key={'td_' + i}>
              <Card className="w-full py-2 px-2">
                <div className="grid grid-cols-[1fr,auto]">
                  <div className="max-w-full overflow-hidden">
                    <div className="flex flex-row items-center">
                      <CardTitle className="flex gap-1 items-items-start">
                        <div className="flex items-center gap-2 px-1 py-1">
                          <Image
                            width={16}
                            height={16}
                            alt={v.language.iso_639_1}
                            src={`/images/iso-639-1/${v.language.iso_639_1}.svg`}
                          />
                          {v.language.english_name}
                        </div>
                        {
                          !v.titles[0].trim().length
                          && !v.overview.trim().length
                          && <BookDashedIcon/>
                        }
                      </CardTitle>
                    </div>
                    <CardDescription className="px-1">
                      {
                        (collapsied.length - 1 >= i || collapsied.push({isCollapsed: true}))
                        && collapsied[i].isCollapsed && (
                          <div>
                            {
                              v.titles[0].length > 0
                              && <div className="grid grid-cols-[auto,1fr] items-center">
                                <TypeIcon width={16}/>
                                <p className="text-md italic text-muted-foreground truncate">{v.titles[0]}</p>
                              </div>
                            }
                            {
                              v.overview.length > 0
                              && <div className="grid grid-cols-[auto,1fr] items-center">
                                <NotepadTextIcon width={16}/>
                                <p className="text-md italic text-muted-foreground truncate">{v.overview}</p>
                              </div>
                            }
                          </div>
                        )
                      }
                    </CardDescription>
                  </div>
                  <Button variant="ghost" className="ml-auto w-7 h-7" onClick={() => setCollapsed(i)}>
                    <ChevronDownIcon/>
                  </Button>
                </div>
                {
                  !collapsied[i].isCollapsed && (
                    <CardContent className="p-0 pt-2">
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