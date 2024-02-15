<template>
  <div class="flex flex-col items-center justify-center h-svh">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div class="flex items-center justify-center">
          <h1 class="text-6xl font-bold text-primary">404</h1>
        </div>
        <div>
          <h2 class="text-3xl font-bold text-center md:text-4xl lg:text-left">
            OOPS! PAGE NOT FOUND
          </h2>
          <p class="mt-2 text-lg text-center lg:text-left">
            This is not the page you're looking for.
          </p>
          <div class="flex justify-center mt-10 lg:inline-block">
            <a
              href="/"
              class="px-6 py-3 text-sm font-bold text-white rounded bg-acumen-primary hover:bg-acumen-dark-blue"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
