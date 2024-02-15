<template>
  <div></div>
</template>

<script setup lang="ts">
onMounted(() => {
  navigateTo('/analytics')
})

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Robin - Dashboard',
})
</script>
