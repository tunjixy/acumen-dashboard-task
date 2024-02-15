<template>
  <div
    class="bg-white rounded-[5px] border px-6 py-[22px] border-acumen-border-2"
  >
    <h2 class="uppercase text-acumen-blue-grey">{{ title }}</h2>
    <p v-if="content" class="mt-3 text-[28px] font-bold text-acumen-blue-grey">
      {{ content }}
    </p>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  content?: string | number
}>()
</script>
