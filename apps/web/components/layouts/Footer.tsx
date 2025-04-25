"use client"

import React from "react";
import Image from 'next/image'
import { cn } from "@/lib/utils";
import { Check, Heart } from "lucide-react";
import {LocaleLink} from "@/hooks/locale-link";
import { localesSupported } from "@/i18n/config";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "../shadcn/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/ui/popover";
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from "../shadcn/ui/command";

export function Footer({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  function imageByLocale(locale: string) {
    return (
      <Image
        width={16}
        height={16}
        alt={locale}
        src={`/images/iso-639-1/${locale}.svg`}
      />
    )
  }

  function goToNewLocale(locale: string) {
    const fragments = pathname.split('/')
    if (fragments.length > 1) {
      fragments[1] = locale
      router.replace(fragments.join('/'))
      router.refresh()
    }
  }

  return (
    <footer className="flex justify-center bg-background border-t-[1px] border-border mt-4">
      <div className="max-w-[1920px] w-full gap-4 py-6 px-[16px] md:px-[16px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-4">
            <h6 className="font-bold text-lg">lophius.zmln.ru</h6>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground flex items-center">
                Сервис коллекционирования медиа, сделанный с <span className="w-1"/> <Heart width={10} height={10}/>.
              </p>
              <p className="text-xs text-muted-foreground">
                Тут можно написать пару шуток, но как-нибудь потом ...
              </p>
              <p className="text-xs text-muted-foreground">
                Связаться со мной можно по почте — <a href="mailto:example@mail.ru" className="underline text-primary">example@mail.ru</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-sm">Документы</h6>
              <div className="flex flex-col gap-1">
                <LocaleLink href="/document/terms-of-use" className="text-xs text-secondary-foreground hover:underline">
                  Пользовательское соглашение
                </LocaleLink>
                <LocaleLink href="/document/subscription-agreement" className="text-xs text-secondary-foreground hover:underline">
                  Политика конфиденциальности
                </LocaleLink>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="font-bold text-sm">Социальные сети</h6>
              <div className="flex gap-1">
                <a
                  href="https://github.com/zamelane/lophius"
                  className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium hover:bg-accent hover:text-accent-foreground min-h-9 h-9 min-w-9 w-9 justify-center transition-all duration-200"
                >
                  <GitHubLogoIcon/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              variant="ghost"
              aria-expanded={open}
              className="p-0 hover:p-2 transition-all"
            >
              {imageByLocale(lang)}
              {lang}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput className="h-9" placeholder="Поиск языка..." />
              <CommandList>
                <CommandEmpty>Ни одного языка не найдено.</CommandEmpty>
                <CommandGroup>
                  {localesSupported.map((locale) => (
                    <CommandItem
                      key={locale}
                      value={locale}
                      onSelect={() => {
                        setOpen(false)
                        goToNewLocale(locale)
                      }}
                    >
                      {imageByLocale(locale)}
                      {locale}
                      <Check
                        className={cn(
                          "ml-auto",
                          lang === locale ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </footer>
  )
}