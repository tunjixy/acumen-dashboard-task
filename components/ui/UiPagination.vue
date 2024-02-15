<template>
  <ul class="flex flex-wrap items-center justify-center gap-2">
    <!-- Previous page -->
    <li>
      <button
        type="button"
        :disabled="isInFirstPage"
        class="btn-paginate text-acumen-grey-9 hover:text-acumen-primary"
        @click="onPreviousPageClicked"
      >
        <LeftArrowIcon />
      </button>
    </li>
    <!-- pages available -->
    <li v-for="page in pages" :key="page.number" class="">
      <button
        class="btn-paginate"
        :class="{
          'text-acumen-primary border-acumen-primary': isPageActive(
            page.number,
          ),
        }"
        :disabled="page.isDisabled"
        @click="onClickPage(page.number)"
      >
        {{ page.number }}
      </button>
    </li>
    <!-- Next page -->
    <li>
      <button
        type="button"
        :disabled="isInLastPage"
        class="btn-paginate text-acumen-grey-9 hover:text-acumen-primary"
        @click="onNextPageClicked"
      >
        <RightArrowIcon />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import LeftArrowIcon from '@/assets/icons/chevron-left.svg?component'
import RightArrowIcon from '@/assets/icons/chevron-right.svg?component'

const props = withDefaults(
  defineProps<{
    maxVisibleNumbers?: number
    totalPages: number
    perPage: number
    currentPage: number
  }>(),
  {
    maxVisibleNumbers: 5,
  },
)

const emit = defineEmits<{
  onPageChanged: [page: number]
}>()

const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1
  }
  // When on the last page
  if (props.currentPage === props.totalPages) {
    return props.totalPages
  }
  // When in between
  return props.currentPage - 1
})
const pages = computed(() => {
  const range = []
  for (
    let i = startPage.value;
    i <=
    Math.min(startPage.value + props.maxVisibleNumbers - 1, props.totalPages);
    i += 1
  ) {
    range.push({
      number: i,
      isDisabled: i === props.currentPage,
    })
  }
  return range
})
const isInFirstPage = computed(() => {
  return props.currentPage === 1
})
const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

function onClickPage(page: number) {
  emit('onPageChanged', page)
}
function onPreviousPageClicked() {
  emit('onPageChanged', props.currentPage - 1)
}
function onNextPageClicked() {
  emit('onPageChanged', props.currentPage + 1)
}
function isPageActive(page: number) {
  return props.currentPage === page
}
</script>
