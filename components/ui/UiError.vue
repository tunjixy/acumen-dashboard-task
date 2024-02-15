<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <div
      v-if="!isOnline"
      class="flex items-center justify-center rounded-full size-20 bg-red-100/10"
    >
      <WifiIcon class="text-red-500 size-16" />
    </div>
    <div
      v-else
      class="flex items-center justify-center rounded-full size-20 bg-red-100/10"
    >
      <AlertIcon class="text-red-500 size-16" />
    </div>
    <h2 class="mt-5 max-w-[200px] text-center">
      {{
        !isOnline
          ? "You're offline, check your internet connection"
          : 'Something went wrong, try again'
      }}
    </h2>
    <UiButton class="mt-5" size="sm" @click="$emit('tryAgain')">
      Retry
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import WifiIcon from '@/assets/icons/wifi.svg?component'
import AlertIcon from '@/assets/icons/alert.svg?component'

const emits = defineEmits(['tryAgain'])

const { isOnline } = useNetwork()

watch(isOnline, (val) => {
  if (val) {
    emits('tryAgain')
  }
})
</script>
