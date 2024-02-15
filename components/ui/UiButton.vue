<template>
  <button
    :variant="variant"
    :size="size"
    :class="{
      'min-h-[42px] py-2': size === 'default',
      'min-h-[32px] py-1': size === 'sm',
      'min-h-[50px] py-2': size === 'lg',
      'text-white transition duration-300 rounded bg-acumen-primary hover:bg-acumen-dark-blue':
        variant === 'primary',
      'text-acumen-grey-5 transition duration-300 bg-transparent hover:text-acumen-primary':
        variant === 'ghost',
    }"
    :type="type"
    :disabled="disabled"
    class="block text-base tracking-wide capitalize transition duration-300 ease-in px-9 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acumen-primary"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot>Submit</slot>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'lg'
type ButtonType = 'button' | 'submit'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    type?: ButtonType
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'default',
    type: 'button',
    disabled: false,
  },
)

defineEmits(['click'])
</script>
