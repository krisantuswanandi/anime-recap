<script setup>
import { Analytics } from "@vercel/analytics/nuxt";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <NuxtRouteAnnouncer />
    <Analytics />
    <AppHeader />
    <main class="max-w-4xl mx-auto w-full p-4 flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
