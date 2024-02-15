<template>
  <ul class="flex items-center overflow-x-auto border-b gap-14">
    <li
      v-for="(title, index) in tabsTitles"
      :key="index"
      :class="{ 'w-full': fullWidth }"
    >
      <button
        class="block pb-5 text-base font-semibold capitalize transition-colors duration-300 ease-in border-b-2 hover:text-acumen-orange"
        :class="[
          {
            'text-acumen-orange border-acumen-orange':
              selectedTabTitle === title,
          },
          {
            'text-acumen-brown-grey-3': selectedTabTitle !== title,
          },
          { 'border-transparent': selectedTabTitle !== title },
          { 'w-full': fullWidth },
        ]"
        @click="selectedTabTitle = title"
      >
        {{ title }}
      </button>
    </li>
  </ul>
  <slot></slot>
</template>

<script setup lang="ts">
import { tabKey } from '@/keys'

const props = withDefaults(
  defineProps<{
    fullWidth?: boolean
    defaultTabTitle?: string
  }>(),
  {
    fullWidth: false,
    defaultTabTitle: '',
  },
)

const slots = useSlots()

const tabsTitles = ref(
  slots.default!().map((tab) => tab.props?.title as string),
)
const selectedTabTitle = ref(props.defaultTabTitle || tabsTitles.value[0])

provide(tabKey, selectedTabTitle)

defineExpose({
  activeTab: selectedTabTitle,
})
</script>
