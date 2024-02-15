<template>
  <div class="overflow-y-auto">
    <div
      v-show="show"
      class="fixed inset-0 z-50 transition ease-in-out bg-black/50"
      :aria-hidden="show ? true : false"
      @click.self="dismiss()"
    ></div>
    <transition name="slide-over">
      <div
        v-show="show"
        class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-full h-full overflow-y-auto bg-white md:w-[588px] pt-[26px] pb-[60px] px-10"
      >
        <div
          class="sticky top-0 z-20 flex items-center justify-between bg-white"
        >
          <slot name="header" />
          <button
            class="size-[42px] rounded-full flex items-center justify-center bg-acumen-grey-3"
            @click="dismiss()"
          >
            <TimesIcon />
          </button>
        </div>
        <slot name="content" />
        <div class="sticky bottom-0 z-20 w-full mt-auto bg-white">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import TimesIcon from '@/assets/icons/times.svg?component'

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  },
)

const emit = defineEmits(['close'])

const { show } = toRefs(props)

watch(show, (value) => {
  if (value) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.removeProperty('overflow')
  }
})

onUnmounted(() => {
  document.body.style.removeProperty('overflow')
})

function dismiss() {
  emit('close')
}
</script>
