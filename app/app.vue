<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <NuxtRouteAnnouncer />
    <Analytics />
    <AppHeader />
    <main class="max-w-4xl m-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
