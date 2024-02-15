<template>
  <div class="overflow-y-auto">
    <div
      v-if="show"
      class="fixed top-0 right-0 z-50 w-full h-full bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    />
    <transition name="slide-nav" mode="out-in">
      <div
        v-if="show"
        class="fixed top-0 left-0 z-50 flex w-64 h-full bg-white"
      >
        <div class="relative flex flex-col w-full h-full pb-4 overflow-y-auto">
          <button
            class="size-[26px] rounded-full flex items-center justify-center bg-acumen-grey-3 absolute top-3 right-3 z-50"
            @click="$emit('close')"
          >
            <TimesIcon />
          </button>
          <SidebarTop :show="show" @close="$emit('close')" />
          <SidebarItems @close="$emit('close')" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import TimesIcon from '@/assets/icons/times.svg?component'

const props = defineProps<{
  show: boolean
}>()

defineEmits(['close'])

const { show } = toRefs(props)

onUnmounted(() => {
  if (show.value) {
    document.body.style.removeProperty('overflow')
  }
})

watch(show, (value) => {
  if (value) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.removeProperty('overflow')
  }
})
</script>
