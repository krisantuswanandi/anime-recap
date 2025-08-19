<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <nav class="max-w-4xl m-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Anime Recap
        </NuxtLink>
        
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="hover:underline">
            Home
          </NuxtLink>
          <NuxtLink to="/anime" class="hover:underline">
            Anime List
          </NuxtLink>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>