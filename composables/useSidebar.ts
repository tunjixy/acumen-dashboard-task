const isCollapsed = ref(false)
const sidebarWidthDefault = ref('270')
const sidebarWidthCollapsed = ref('70')

export default function useSidebar() {
  const sidebarWidth = computed(() => {
    return `${isCollapsed.value ? sidebarWidthCollapsed.value : sidebarWidthDefault.value}px`
  })

  function collapseSidebar() {
    isCollapsed.value = !isCollapsed.value
  }

  return {
    isCollapsed,
    sidebarWidth,
    collapseSidebar,
  }
}
