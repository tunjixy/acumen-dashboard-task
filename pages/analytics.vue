<template>
  <div class="py-6">
    <div class="container">
      <div class="flex flex-wrap items-center gap-4">
        <p class="text-acumen-brown-grey">Last updated 1 minute ago</p>
        <button class="flex items-center text-acumen-green" @click="fetchStats">
          <RefreshIcon class="mr-2" />
          Refresh
        </button>
      </div>

      <div v-if="loading">
        <UiPreloader card class="mt-2" />
        <div class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
          <UiPreloader box />
          <UiPreloader box />
        </div>
      </div>
      <UiError v-else-if="!loading && error" @try-again="fetchStats" />
      <template v-else>
        <div
          v-if="stats"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[14px] mt-2"
        >
          <StatCard
            title="Users Online"
            :content="formatNumberWithComma(stats.usersOnline)"
          />
          <StatCard
            title="Users Active Today"
            :content="formatNumberWithComma(stats.usersActiveToday)"
          />
          <StatCard
            title="Users Active This Month"
            :content="formatNumberWithComma(stats.usersActiveThisMonth)"
          />
          <StatCard
            title="Peak Concurrency This Month"
            :content="formatNumberWithComma(stats.peakConcurrency)"
          />
          <StatCard title="Dashboard">
            <p class="flex items-center gap-2 mt-3 text-acumen-blue-grey">
              <span class="text-[28px] font-bold">
                {{ stats.dashboard / GB }} GB
              </span>
              <sub class="text-xl">of 512GB</sub>
            </p>
          </StatCard>
        </div>
        <hr class="my-6 border border-acumen-border" />

        <!-- Chart -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[23px]">
          <div
            class="bg-white rounded-[5px] border px-6 py-[22px] border-acumen-border-2"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="uppercase text-acumen-blue-grey">
                Daily Active Users
              </h3>
              <ChartFilter
                @on-day-filter-changed="filterDailyActiveUser"
                @on-activity-filter-changed="filterDailyActivity"
              />
            </div>
            <LineChart
              :chart-data="chartData"
              :chart-options="chartOptions"
              class="mt-10 sm:h-[386px]"
            />
          </div>
          <div
            class="bg-white rounded-[5px] border px-6 py-[22px] border-acumen-border-2"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="uppercase text-acumen-blue-grey">
                Monthly Active Users
              </h3>
              <ChartFilter
                :show-activity-filter="false"
                @on-activity-filter-changed="filterMonthlyActivity"
              />
            </div>
            <LineChart
              :chart-data="chartData2"
              :chart-options="chartOptions"
              class="mt-10 sm:h-[386px]"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import type { DashboardStat } from '@/types'
import RefreshIcon from '@/assets/icons/refresh.svg?component'

// Reusable composable not related to this component
const { api } = useApi()
const { formatNumberWithComma } = useFormat()

const GB = 1073741824
const stats = useState<DashboardStat | null>('dashboard-stats', () => null)
const loading = ref(false)
const error = ref(false)

onMounted(() => {
  if (!stats.value) {
    fetchStats()
  }
})

async function fetchStats() {
  try {
    loading.value = true
    error.value = false
    const response = await api.dashboard.fetchStats()
    if (response) {
      stats.value = response.data
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}

function filterDailyActiveUser() {
  // Handle logic to filter daily users
}
function filterDailyActivity() {
  // Handle logic to filter daily activities
}
function filterMonthlyActivity() {
  // Handle logic to filter monthly activities
}

// Chart
const chartData = ref<ChartData<'line'>>({
  labels: ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: '',
      data: [30, 55, 50, 30, 60, 45, 55],
      backgroundColor: ['rgb(252, 238, 229)'],
      borderColor: '#ea8d51',
      borderWidth: 4,
      pointBackgroundColor: '#ea8d51',
      pointRadius: 2,
      fill: true,
      tension: 0.4,
    },
  ],
})
const chartData2 = ref<ChartData<'line'>>({
  labels: ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: '',
      data: [40, 35, 50, 30, 55, 45, 60],
      backgroundColor: ['rgb(220, 243, 234)'],
      borderColor: '#15ae73',
      borderWidth: 4,
      pointBackgroundColor: '#15ae73',
      pointRadius: 2,
      fill: true,
      tension: 0.4,
    },
  ],
})
const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  scales: {
    y: {
      display: false,
      grid: {
        display: true,
      },
      beginAtZero: true,
    },
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#525d71',
      titleColor: '#FFF',
      bodyColor: '#FFF',
      padding: 15,
      boxPadding: 5,
    },
  },
})

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Robin - Analytics',
})
</script>
