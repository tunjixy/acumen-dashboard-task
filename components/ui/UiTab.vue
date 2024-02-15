<template>
  <div v-show="title.toLowerCase() === selectedTabTitle.toLowerCase()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { tabKey } from '@/keys'

withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'Tab',
  },
)

const selectedTabTitle = inject(tabKey) as string
</script>
