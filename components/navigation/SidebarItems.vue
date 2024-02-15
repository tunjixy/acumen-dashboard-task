<template>
  <ul
    :class="[isCollapsed ? 'w-full items-center px-2' : 'pl-[50px] pr-4']"
    class="mt-[42px] space-y-[34px]"
  >
    <li v-for="(menu, index) in menus" :key="index">
      <NuxtLink
        :to="menu.url"
        class="flex items-center transition duration-300 ease-in text-acumen-grey hover:text-acumen-orange"
        @click="$emit('close')"
      >
        <component
          :is="menu.icon"
          :class="[isCollapsed ? 'block w-full size-6' : 'mr-4']"
        />
        <p v-if="!isCollapsed">{{ menu.title }}</p>
      </NuxtLink>
    </li>
  </ul>
  <hr
    :class="[isCollapsed ? 'mx-4' : 'mx-[29px]']"
    class="border-acumen-border mt-[51px]"
  />
  <button
    :class="[isCollapsed ? 'w-full items-center px-2' : 'pl-[50px] pr-4']"
    class="mt-[25px] lg:flex lg:items-center transition duration-300 ease-in text-acumen-grey hover:text-acumen-orange hidden"
    @click="collapseSidebar"
  >
    <LeftArrowIcon :class="[isCollapsed ? 'block w-full size-6' : 'mr-4']" />
    <p v-if="!isCollapsed">Collapse</p>
  </button>
  <button
    :class="[isCollapsed ? 'w-full items-center px-2' : 'pl-[50px] pr-4']"
    class="mt-[25px] flex items-center text-acumen-red"
    @click="giveFeedback"
  >
    <ExclamationIcon :class="[isCollapsed ? 'block w-full size-6' : 'mr-4']" />
    <p v-if="!isCollapsed">Give Feedback</p>
  </button>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'
import { menuKey } from '@/keys'

// Assets
import LeftArrowIcon from '@/assets/icons/left-arrow-to-left.svg?component'
import ExclamationIcon from '@/assets/icons/exclamation.svg?component'

const emits = defineEmits(['close'])

const menus = inject(menuKey) as Menu[]

const { collapseSidebar, isCollapsed } = useSidebar()

function giveFeedback() {
  emits('close')
}
</script>
