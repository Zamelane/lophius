import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Pencil,
  CatIcon,
  BookIcon,
  MusicIcon,
  DiscAlbumIcon,
  ClapperboardIcon,
  NotebookTextIcon,
  SquareUserRoundIcon
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

export function EditDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Pencil/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Добавление контента</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SquareUserRoundIcon/>
            Новая персона
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DiscAlbumIcon/>
              <div className="flex flex-col">
                Новое медиа
                <span className="text-xs opacity-85">
                  Кино, аниме, комиксы
                </span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link href="/create/kino">
                  <DropdownMenuItem>
                    <ClapperboardIcon/>
                    <div className="flex flex-col">
                      Новое кино
                      <span className="text-xs opacity-85">Фильм, сериал, дорама</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <CatIcon/>
                  <div className="flex flex-col">
                    Новое аниме
                    <span className="text-xs opacity-85">Фильм, сериал, OVA</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NotebookTextIcon/>
                  <div className="flex flex-col">
                    Новый комикс
                    <span className="text-xs opacity-85">Манга, манхва, маньхуа</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookIcon/>
                  <div className="flex flex-col">
                    Новая книга
                    <span className="text-xs opacity-85">Моноиздание, сборник</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MusicIcon/>
                  <div className="flex flex-col">
                    Новая музыка
                    <span className="text-xs opacity-85">Поп, рок, хип-хоп</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}