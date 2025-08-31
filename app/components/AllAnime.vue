<script setup>
const { data: animes, pending, error } = await useAsyncData(() => {
  return queryCollection('animes').order('startDate', 'DESC').all();
});
</script>

<template>
  <div>
  <div class="flex items-baseline justify-between">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        All Anime
      </h1>
      <NuxtLink
        to="/anime"
    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
      >
        See all anime
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading anime...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">Error: {{ error }}</p>
    </div>

    <div v-else-if="animes && animes.length" class="grid grid-cols-5 gap-4 mt-4">
      <AnimeCard
        v-for="anime in animes"
        :key="anime.path"
        :to="anime.path"
        :cover="anime.cover"
        :title="anime.title"
      />
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No anime found.</p>
    </div>

    
  </div>
</template>
