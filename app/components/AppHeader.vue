<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Anime Recap
        </NuxtLink>
        
        <div class="flex items-center space-x-6">
          <NuxtLink 
            to="/" 
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/anime" 
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path.startsWith('/anime') }"
          >
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