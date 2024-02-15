<template>
  <div>
    <div v-if="box" class="h-[300px] animate-pulse rounded-lg bg-gray-200" />

    <div v-if="rectangle" class="space-y-3">
      <div
        v-for="i in count"
        :key="i"
        class="h-[72px] animate-pulse rounded-lg bg-gray-200"
      ></div>
    </div>

    <div
      v-if="card"
      class="grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="i in count"
        :key="i"
        class="w-full h-32 bg-gray-200 rounded-lg animate-pulse"
      ></div>
    </div>

    <div v-if="table" class="table-wrapper animate-pulse">
      <table class="table">
        <thead>
          <tr>
            <th v-for="i in 5" :key="i" class="table-head">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="i" class="table-row">
            <td class="table-item">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </td>
            <td class="table-item">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </td>
            <td class="table-item">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </td>
            <td class="table-item">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </td>
            <td class="table-item">
              <div class="w-full h-1 p-2 bg-gray-200 rounded" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    box?: boolean
    rectangle?: boolean
    card?: boolean
    table?: boolean
    count?: number
  }>(),
  {
    box: false,
    rectangle: false,
    card: false,
    table: false,
    count: 3,
  },
)
</script>
