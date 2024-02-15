<template>
  <div class="flex items-center gap-[10px]">
    <select
      v-model="selectedDayFilter"
      class="font-semibold border-none form-input-select"
    >
      <option disabled selected value="">Select filter</option>
      <option
        v-for="(filter, index) in daysFilter"
        :key="index"
        :value="filter"
      >
        {{ filter }}
      </option>
    </select>
    <select
      v-if="showActivityFilter"
      v-model="selectedActivityFilter"
      class="pr-6 font-semibold border-none form-input-select"
    >
      <option disabled selected value="">Select activity</option>
      <option value="All Activities">All Activities</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const daysFilter = ['7 Days', '30 Days', '60 Days']
const selectedDayFilter = ref('30 Days')
const selectedActivityFilter = ref('All Activities')

const emit = defineEmits<{
  onDayFilterChanged: [value: string]
  onActivityFilterChanged: [value: string]
}>()

withDefaults(
  defineProps<{
    showActivityFilter?: boolean
  }>(),
  {
    showActivityFilter: true,
  },
)

watch(selectedDayFilter, (val) => {
  if (val) {
    emit('onDayFilterChanged', val)
  }
})
watch(selectedActivityFilter, (val) => {
  if (val) {
    emit('onActivityFilterChanged', val)
  }
})
</script>
