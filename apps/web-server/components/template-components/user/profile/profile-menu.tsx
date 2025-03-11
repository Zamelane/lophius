import { Menubar, MenubarItem, MenubarMenu, MenubarContent, MenubarTrigger, MenubarSeparator } from "@/components/ui/menu-bar"
import { Tag, Home, Star, Folder, Share2, Activity, Bookmark, Settings, BarChart3, LayoutGrid, PlusCircle, BookmarkCheck } from "lucide-react"

export const ProfileMenu = () => {
  return (
    <Menubar className="flex justify-center">
      <MenubarMenu>
        <MenubarTrigger>
          <LayoutGrid className="mr-2 size-4" />
          Dashboard
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Home className="mr-2 size-4" />
            Overview
          </MenubarItem>
          <MenubarItem>
            <Activity className="mr-2 size-4" />
            Recent Activity
          </MenubarItem>
          <MenubarItem>
            <BarChart3 className="mr-2 size-4" />
            Stats
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Bookmark className="mr-2 size-4" />
          Bookmarks
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <BookmarkCheck className="mr-2 size-4" />
            All Bookmarks
          </MenubarItem>
          <MenubarItem>
            <Tag className="mr-2 size-4" />
            Categories
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Star className="mr-2 size-4" />
            Favorites
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Folder className="mr-2 size-4" />
          Collections
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <PlusCircle className="mr-2 size-4" />
            Create Collection
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Settings className="mr-2 size-4" />
            Manage Collections
          </MenubarItem>
          <MenubarItem>
            <Share2 className="mr-2 size-4" />
            Shared Collections
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}