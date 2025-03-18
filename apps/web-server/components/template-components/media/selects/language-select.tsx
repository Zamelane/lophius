import { cn } from "@/lib/utils";
import { ClassNameType } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";

const languages = [
  {
    id: 1,
    i18n: 'russian'
  },
  {
    id: 2,
    i18n: 'english'
  }
]

type Props = {
  placeholder?: string
}

export function LanguageSelect({ className, placeholder }: Props & ClassNameType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "justify-between",
            "text-muted-foreground",
            className
          )}
        >
          {placeholder ?? 'Select language'}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            className="h-9"
            placeholder="Поиск языков..."
          />
          <CommandList>
            <CommandEmpty>Нет ни одного совпадения</CommandEmpty>
            <CommandGroup>
              {
                languages.map((v, i) => (
                  <CommandItem
                    key={'l_' + i}
                    value={v.i18n}
                  >
                    {v.i18n}
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}