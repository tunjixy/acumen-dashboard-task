<template>
  <div>
    <button
      ref="itemRef"
      aria-describedby="dropdown"
      @click="toggleMenu()"
      @keydown.space.exact.prevent="toggleMenu()"
      @keydown.enter.exact.prevent="toggleMenu()"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
    >
      <slot name="action">
        <EllipsisIcon />
      </slot>
    </button>
    <div
      v-show="showDropdown"
      ref="menuRef"
      role="dropdown"
      :style="floatingStyles"
    >
      <slot name="content" :show-dropdown="showDropdown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/vue'
import type { Placement } from '@floating-ui/vue'
import EllipsisIcon from '@/assets/icons/ellipsis.svg?component'

const props = withDefaults(
  defineProps<{
    position?: Placement
  }>(),
  {
    position: 'left',
  },
)

const showDropdown = ref(false)
const itemRef = ref(null)
const menuRef = ref(null)

const { floatingStyles } = useFloating(itemRef, menuRef, {
  whileElementsMounted: autoUpdate,
  placement: props.position,
  middleware: [offset(8), flip(), shift()],
})

onClickOutside(itemRef, () => {
  hideDropdown()
})

function hideDropdown() {
  showDropdown.value = false
}
function toggleMenu() {
  if (showDropdown.value) {
    hideDropdown()
  } else {
    showDropdown.value = true
  }
}
</script>
