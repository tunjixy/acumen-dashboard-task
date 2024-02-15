<template>
  <div class="py-6">
    <div class="container">
      <UiPreloader v-if="loading" card class="mt-5" />
      <UiError v-else-if="!loading && error" @try-again="fetchStats" />
      <template v-else>
        <div
          v-if="stats"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[14px] mt-2"
        >
          <StatCard
            title="No of Users"
            :content="formatNumberWithComma(stats.numberOfUsers)"
          />
          <StatCard
            title="Total Message Sent "
            :content="formatNumberWithComma(stats.totalMessagesSent)"
          />
          <StatCard title="Total Media Storage Used">
            <p class="mt-3 text-[28px] font-bold text-acumen-blue-grey">
              {{ stats.totalStorageUsed / MB }}MB
            </p>
          </StatCard>
          <StatCard
            title="Total Media Sent"
            :content="formatNumberWithComma(stats.totalMediaSent)"
          />
        </div>
      </template>

      <div class="mt-[46px] sm:relative sm:pt-6">
        <div class="mb-5 sm:absolute sm:right-0 sm:top-3 sm:mb-0">
          <UiSearch v-model="search" />
        </div>
        <UiTabs>
          <UiTab title="Direct Messages">
            <MessageListing
              class="mt-5"
              @on-view-record="showSlideOver = true"
            />
          </UiTab>
          <UiTab title="Groups">
            <p class="mt-5">Group info</p>
          </UiTab>
        </UiTabs>
      </div>

      <UiSlideOver :show="showSlideOver" @close="showSlideOver = false">
        <template #header>
          <h3 class="text-2xl font-bold text-acumen-dark">Filter Table</h3>
        </template>
        <template #content>
          <div class="flex flex-wrap items-center gap-3 mt-8">
            <FilterPill
              v-for="(option, index) in filters"
              :key="index"
              v-model="selectedFilterOption"
              :option="option"
            />
          </div>
          <form class="mt-[35px]">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-input-label" for="dateFrom">
                  Date From
                </label>
                <DatePicker
                  v-model:value="dateFrom"
                  input-class="py-[18px] cursor-pointer form-input-field border-acumen-grey bg-acumen-grey-3"
                  value-type="format"
                  format="YYYY-MM-DD"
                  type="date"
                  placeholder="dd - mm - yyyy"
                />
              </div>
              <div>
                <label class="form-input-label" for="dateTo">Date To</label>
                <DatePicker
                  v-model:value="dateTo"
                  input-class="py-[18px] cursor-pointer form-input-field border-acumen-grey bg-acumen-grey-3"
                  value-type="format"
                  format="YYYY-MM-DD"
                  type="date"
                  placeholder="dd - mm - yyyy"
                />
              </div>
              <div class="col-span-2 mt-2">
                <label class="form-input-label" for="messages">
                  Messages
                </label>
                <select
                  v-model="selectedFilterMessage"
                  class="py-[18px] border form-input-select border-acumen-grey bg-acumen-grey-3 text-acumen-grey-5"
                >
                  <option disabled selected value="">Please select</option>
                  <option
                    v-for="(filter, index) in filterMessages"
                    :key="index"
                    :value="filter"
                  >
                    {{ filter }}
                  </option>
                </select>
              </div>
              <div class="col-span-2 mt-2">
                <label class="form-input-label" for="messages">
                  Media Storage Used
                </label>
                <select
                  v-model="selectedMediaStorage"
                  class="py-[18px] border form-input-select border-acumen-grey bg-acumen-grey-3 text-acumen-grey-5"
                >
                  <option disabled selected value="">Please select</option>
                  <option
                    v-for="(filter, index) in mediaStorageFilters"
                    :key="index"
                    :value="filter"
                  >
                    {{ filter }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </template>
        <template #footer>
          <div class="flex flex-col items-center justify-center">
            <UiButton class="rounded-full w-[379px]"> Filter Table </UiButton>
            <UiButton variant="ghost" class="mt-6"> Clear Filter </UiButton>
          </div>
        </template>
      </UiSlideOver>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatStat } from '@/types'

// Reusable composable not related to this component
const { api } = useApi()
const { formatNumberWithComma } = useFormat()

const MB = 1048576
const stats = useState<ChatStat | null>('chat-stats', () => null)
const search = ref('')
const showSlideOver = ref(false)
const filters = ['Today', 'Last 7 days', 'This month', 'Last 3 months']
const selectedFilterOption = ref('Today')
const dateFrom = ref('')
const dateTo = ref('')
const filterMessages = [
  '0 - 500 Messages',
  '500 - 2000 Messages',
  '2000+ messages',
]
const selectedFilterMessage = ref('')
const mediaStorageFilters = [
  '0 - 50 MB',
  '50MB - 200 MB',
  '200MB - 1GB',
  '1GB+',
]
const selectedMediaStorage = ref('')
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
    const response = await api.dashboard.fetchChatStats()
    if (response) {
      stats.value = response.data
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Robin - Chat',
})
</script>
