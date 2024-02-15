<template>
  <div>
    <UiPreloader v-if="loading" table />
    <UiError v-else-if="!loading && error" @try-again="fetchMessages" />
    <template v-else>
      <template v-if="messages">
        <UiEmptyState v-if="messages.length === 0" />
        <div v-else class="bg-white border rounded-lg border-acumen-border-2">
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th
                    v-for="(heading, index) in headings"
                    :key="index"
                    class="font-normal uppercase table-head text-acumen-grey"
                  >
                    <div class="flex items-center">
                      {{ heading.title }}
                      <button
                        v-if="hideSortIcon(heading)"
                        @click="handleSort(heading.sortType)"
                      >
                        <SortedIcon
                          v-if="hasBeenSorted(heading.sortType)"
                          class="ml-[5px]"
                        />
                        <SortIcon v-else class="ml-[5px]" />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(message, index) in messages"
                  :key="index"
                  class="table-row"
                >
                  <td class="capitalize table-item">
                    {{ message.full_name }}
                  </td>
                  <td class="table-item">
                    {{ formatNumberWithComma(message.message_sent) }}
                  </td>
                  <td class="table-item">
                    {{ message.media_storage_used / MB }} MB
                  </td>
                  <td class="table-item">
                    {{ formatDate(message.date_created) }}
                  </td>
                  <td class="table-item">
                    {{ formatNumberWithComma(message.media_sent) }}
                  </td>
                  <td class="table-item">
                    <UiDropdown>
                      <template #content="{ showDropdown }">
                        <transition name="dropdown-fade">
                          <ul
                            v-if="showDropdown"
                            class="divide-y-[1px] divide-acumen-grey-6 bg-white border rounded-lg w-[197px] border-acumen-border-2"
                          >
                            <li
                              v-for="(action, i) in actions"
                              :key="i"
                              class="transition duration-300 ease-in hover:bg-acumen-grey/10"
                              @click.prevent="performAction(action.type)"
                            >
                              <a
                                href=""
                                class="flex items-center justify-between px-4 py-3"
                              >
                                <p class="ml-2 text-sm">
                                  {{ action.name }}
                                </p>
                                <component :is="action.icon" class="shrink" />
                              </a>
                            </li>
                          </ul>
                        </transition>
                      </template>
                    </UiDropdown>
                  </td>
                </tr>
              </tbody>
            </table>

            <UiPagination
              v-if="perPage < totalPages"
              class="my-[32px]"
              :current-page="currentPage"
              :per-page="perPage"
              :total-pages="Math.ceil(totalPages / perPage)"
              @on-page-changed="pageChanged"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types'
import SortIcon from '@/assets/icons/sort.svg?component'
import SortedIcon from '@/assets/icons/sorted.svg?component'
import EyeIcon from '@/assets/icons/eye.svg?component'
import XCircleIcon from '@/assets/icons/x-circle.svg?component'

const emit = defineEmits<{
  onViewRecord: [void]
}>()

// Reusable composable not related to this component
const { api } = useApi()
const { formatNumberWithComma, formatDate, dynamicSort } = useFormat()

const MB = 1048576
const headings = [
  { title: 'Users', sortType: 'full_name' },
  { title: 'Messages Sent', sortType: 'message_sent' },
  { title: 'Media Storage Used', sortType: 'media_storage_used' },
  { title: 'Date Created', sortType: 'date_created' },
  { title: 'Media Sent', sortType: 'media_sent' },
  { title: '', sortType: '' },
]
const actions = [
  { name: 'View', type: 'view', icon: markRaw(EyeIcon) },
  { name: 'Disable', type: 'disable', icon: markRaw(XCircleIcon) },
]
const messages = useState<Message[] | null>('messages', () => null)
const currentPage = ref(1)
const perPage = ref(0)
const totalPages = ref(0)
const loading = ref(false)
const error = ref(false)

onMounted(() => {
  fetchMessages()
})

async function fetchMessages() {
  try {
    loading.value = true
    error.value = false
    const response = await api.dashboard.fetchMessages(currentPage.value)
    if (response) {
      messages.value = response.data
      perPage.value = response.limit
      totalPages.value = response.totalDocs
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}
function hideSortIcon(heading: { title: string; sortType: string }) {
  return heading.title !== '' && heading.title.toLowerCase() !== 'users'
}
function pageChanged(page: number) {
  currentPage.value = page
  fetchMessages()
}
function performAction(action: string) {
  if (action === 'view') {
    emit('onViewRecord')
  } else if (action === 'disable') {
    // handle logic
  }
}

// Sorting
const isMessageSorted = ref(false)
const isStorageSorted = ref(false)
const isDateSorted = ref(false)
const isMediaSorted = ref(false)

function hasBeenSorted(type: string) {
  if (type === 'message_sent') {
    return isMessageSorted.value
  } else if (type === 'media_storage_used') {
    return isStorageSorted.value
  } else if (type === 'date_created') {
    return isDateSorted.value
  } else if (type === 'media_sent') {
    return isMediaSorted.value
  }
}

function handleSort(sortType: string) {
  if (messages.value) {
    if (sortType === 'message_sent') {
      isMessageSorted.value = !isMessageSorted.value
      messages.value = messages.value.sort(
        dynamicSort(sortType, isMessageSorted.value ? 'asc' : 'desc'),
      )
    } else if (sortType === 'media_storage_used') {
      isStorageSorted.value = !isStorageSorted.value
      messages.value = messages.value.sort(
        dynamicSort(sortType, isStorageSorted.value ? 'asc' : 'desc'),
      )
    } else if (sortType === 'date_created') {
      isDateSorted.value = !isDateSorted.value
      messages.value = messages.value.sort(
        dynamicSort(sortType, isDateSorted.value ? 'asc' : 'desc'),
      )
    } else if (sortType === 'media_sent') {
      isMediaSorted.value = !isMediaSorted.value
      messages.value = messages.value.sort(
        dynamicSort(sortType, isMediaSorted.value ? 'asc' : 'desc'),
      )
    }
  }
}
</script>
