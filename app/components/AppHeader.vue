<template>
  <header
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
  >
    <nav class="max-w-4xl m-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-gray-900 dark:text-white"
        >
          <span class="text-red-700">anime</span>
          <span>recap.</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <UButton
            to="https://github.com/krisantuswanandi/anime-recap"
            target="_blank"
            size="sm"
            color="neutral"
            variant="ghost"
            icon="i-lucide-github"
          />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup></script>
