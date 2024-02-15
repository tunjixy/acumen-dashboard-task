<template>
  <header
    class="sticky top-0 z-40 w-full transition-all duration-500 ease-in border-b border-acumen-border"
  >
    <nav
      class="flex items-center justify-between w-full h-16 px-5 lg:px-[50px] py-3 backdrop-blur-sm"
    >
      <p class="self-end text-acumen-grey">Hello Ayomide! 👋🏼</p>
      <div class="hidden gap-3 lg:items-center lg:flex">
        <UiButton size="sm" class="rounded-full">Download Report</UiButton>
        <div class="flex items-center">
          <UiAvatar name="Albert Olu" />
          <DownIcon class="ml-2" />
        </div>
      </div>
      <button class="lg:hidden" @click="$emit('onToggleSidebar')">
        <MenuIcon class="size-6 text-acumen-dark" />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MenuIcon from '@/assets/icons/menu.svg?component'
import DownIcon from '@/assets/icons/down.svg?component'

defineEmits(['onToggleSidebar'])
</script>
