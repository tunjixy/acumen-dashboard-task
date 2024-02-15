<template>
  <LineChart v-bind="lineChartProps" />
</template>

<script setup lang="ts">
import { LineChart, useLineChart } from 'vue-chart-3'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  chartData: ChartData<'line'>
  chartOptions: ChartOptions<'line'>
}>()

const { lineChartProps } = useLineChart({
  chartData: props.chartData,
  options: props.chartOptions,
})
</script>
