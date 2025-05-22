import type { LucideIcon } from 'lucide-react'
import type { LightMenuItemType } from '../../ui/navigation/light-nav-main'
import type { NavMainMenuType } from '../../ui/navigation/nav-main'

import adminMenu from './admin'
import bookMenu from './book'
import comicsMenu from './comics'
import homeMenu from './home'
import musicMenu from './music'
import videoMenu from './video'

export type MenuType = {
  path: string
  mode?: {
    name: string
    logo: LucideIcon
  }
  hidden?: boolean
  topMenu: LightMenuItemType[]
  bottomMenu: NavMainMenuType
}

export const menu: MenuType[] = [
  homeMenu,
  videoMenu,
  comicsMenu,
  bookMenu,
  musicMenu,
  adminMenu
]
