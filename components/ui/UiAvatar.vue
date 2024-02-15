<template>
  <div
    class="flex items-center justify-center rounded-full size-10 bg-acumen-grey-2 text-acumen-brown-grey-2 shrink"
  >
    {{ avatarInitials }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const avatarInitials = computed(() => {
  const splittedName = props.name.split(' ')
  return splittedName[0].charAt(0) + '' + splittedName[1].charAt(0)
})
</script>
