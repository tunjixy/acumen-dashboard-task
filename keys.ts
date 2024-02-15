import type { Menu } from '@/types'

export const menuKey = Symbol('menu') as InjectionKey<Menu[]>
export const tabKey = Symbol('tab')
