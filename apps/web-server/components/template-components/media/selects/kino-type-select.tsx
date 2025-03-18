import { SquarePlayIcon, SquareStackIcon } from "lucide-react";
import { Select, SelectItem, SelectGroup, SelectLabel, SelectValue, SelectContent, SelectTrigger } from "@/components/shadcn/ui/select";

export function KinoTypeSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Тип контента" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Тип контента</SelectLabel>
          <SelectItem value="film">
            <div className="flex gap-2 items-center">
              <SquarePlayIcon width={16} height={16}/>
              Фильм
            </div>
          </SelectItem>
          <SelectItem value="serial">
            <div className="flex gap-2 items-center">
              <SquareStackIcon width={16} height={16}/>
              Сериал
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}