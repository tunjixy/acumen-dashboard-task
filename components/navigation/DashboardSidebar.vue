<template>
  <aside
    :style="{ width: sidebarWidth }"
    class="relative hidden transition-all duration-500 ease-in bg-white lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:flex"
  >
    <div class="flex flex-col w-full h-full pb-4 overflow-y-auto">
      <SidebarTop />
      <SidebarItems />
    </div>
  </aside>
</template>

<script setup lang="ts">
const { sidebarWidth } = useSidebar()
</script>
