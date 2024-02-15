<template>
  <a
    href=""
    :class="[
      model?.toLowerCase() === option.toLowerCase()
        ? 'border border-acumen-orange bg-acumen-orange/10 text-acumen-orange font-bold'
        : 'hover:text-acumen-orange hover:border-acumen-orange',
    ]"
    class="py-[10px] px-[18px] cursor-pointer rounded-full border border-acumen-grey-7 text-sm text-acumen-dark transition-colors duration-500 ease-out"
    @click.prevent="updateOption"
  >
    {{ option }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  option: string
}>()

const model = defineModel<string>()

function updateOption() {
  model.value = props.option
}
</script>
