'use client'
import { Separator } from '@/components/ui/separator'
import { Tabs } from '@/components/ui/tabs'
import ScrollContainer from 'react-indiana-drag-scroll'

const tabs = [
  { id: 'overview', label: 'Информация' },
  { id: 'friends', label: 'Друзья' },
  { id: 'folders', label: 'Папки' },
  { id: 'collections', label: 'Коллекции' },
  { id: 'comments', label: 'Комментарии' }
]

export const ProfileMenu = () => {
  // https://www.npmjs.com/package/react-indiana-drag-scroll
  return (
    <div className='relative'>
      <Separator className='absolute bottom-[2px] h-[2px] w-full' />
      <ScrollContainer vertical={false} className='w-full pb-2'>
        <Tabs
          tabs={tabs}
          onTabChange={(tabId: string) =>
            console.log(`Tab changed to: ${tabId}`)
          }
        />
      </ScrollContainer>
    </div>
  )
}

{
  /* <Tabs className="w-full" defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="w-full mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
          <TabsTrigger
            value="tab-1"
            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
          >
            <House
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
            />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
          >
            <PanelsTopLeft
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
            />
            Lists
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
          >
            <Box
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
            />
            Collections
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 3</p>
      </TabsContent>
    </Tabs> */
}

{
  /* <Menubar className="flex justify-center">
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
    </Menubar> */
}
