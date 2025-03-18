import { CatIcon, VideoIcon } from "lucide-react";
import { Select, SelectItem, SelectGroup, SelectLabel, SelectValue, SelectContent, SelectTrigger } from "@/components/shadcn/ui/select";

export function KinoCategorySelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Категория"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Категория</SelectLabel>
          <SelectItem value="film">
            <div className="flex gap-2 items-center">
              <VideoIcon width={16} height={16}/>
              Кинематограф
            </div>
          </SelectItem>
          <SelectItem value="serial">
            <div className="flex gap-2 items-center">
              <CatIcon width={16} height={16}/>
              Аниме
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}