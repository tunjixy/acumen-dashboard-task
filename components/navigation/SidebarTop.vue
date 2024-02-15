<template>
  <div
    class="sticky top-0 z-10 flex items-center justify-between pt-8 pb-4 bg-white pl-[50px] pr-4"
  >
    <template v-if="!isCollapsed">
      <AppLogo />
      <button
        class="size-[42px] rounded-full lg:flex lg:items-center lg:justify-center bg-acumen-grey-3 hidden"
      >
        <CompressIcon />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import CompressIcon from '@/assets/icons/compress.svg'

const { isCollapsed } = useSidebar()
</script>
