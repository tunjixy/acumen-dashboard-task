<template>
  <div>
    <DashboardSidebar />
    <DashboardSidebarDrawer
      :show="toggleDrawer"
      @close="toggleDrawer = false"
    />
    <div
      :class="[isCollapsed ? 'lg:ml-[70px]' : 'lg:ml-[270px]']"
      class="relative transition-all duration-500 ease-in"
    >
      <DashboardHeader @on-toggle-sidebar="toggleDrawer = true" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'
import { menuKey } from '@/keys'

// Assets
import CircuitIcon from '@/assets/icons/circuit.svg?component'
import AnalyticsIcon from '@/assets/icons/analytics.svg?component'
import ChatIcon from '@/assets/icons/chat.svg?component'
import SilenceIcon from '@/assets/icons/silence.svg?component'
import BulbIcon from '@/assets/icons/light_bulb.svg?component'
import BellIcon from '@/assets/icons/bell.svg?component'
import SettingIcon from '@/assets/icons/setting.svg?component'

const { isCollapsed } = useSidebar()

const menus = ref<Menu[]>([
  {
    title: 'Get Started',
    icon: markRaw(CircuitIcon),
    url: '/',
  },
  {
    title: 'Analytics',
    icon: markRaw(AnalyticsIcon),
    url: '/analytics',
  },
  {
    title: 'Chat',
    icon: markRaw(ChatIcon),
    url: '/chat',
  },
  {
    title: 'Moderation',
    icon: markRaw(SilenceIcon),
    url: '',
  },
  {
    title: 'API & Auth Keys',
    icon: markRaw(BulbIcon),
    url: '',
  },
  {
    title: 'Announcement',
    icon: markRaw(BellIcon),
    url: '',
  },
  {
    title: 'Settings',
    icon: markRaw(SettingIcon),
    url: '',
  },
])
const toggleDrawer = ref(false)

provide(menuKey, menus.value)
</script>
