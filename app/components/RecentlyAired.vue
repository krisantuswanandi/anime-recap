<script setup lang="ts">
const {
  data: episodes,
  pending,
  error,
} = await useAsyncData(() => {
  return queryCollection("episodes").order("airedDate", "DESC").limit(6).all();
});
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Recently Aired
      </h1>
      <NuxtLink
        to="/recap"
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
      >
        See all recaps
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading episodes...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">
        Error loading episodes: {{ error }}
      </p>
    </div>

    <div
      v-else-if="episodes && episodes.length > 0"
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
    >
      <ArticleCard
        v-for="episode in episodes"
        :key="episode.id"
        :to="episode.path"
        :image="
          typeof episode.meta.thumbnail === 'string'
            ? episode.meta.thumbnail
            : undefined
        "
        :image-alt="`${episode.meta.animeTitle} episode ${episode.meta.episodeDisplay} thumbnail`"
        :title="episode.title"
        :subtitle="`${episode.meta.animeTitle} Episode ${episode.meta.episodeDisplay}`"
        :date="episode.airedDate"
        :description="episode.description"
        :aria-label="`${episode.meta.animeTitle} Episode ${episode.meta.episodeDisplay}, ${episode.title}`"
      />
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No episodes found.</p>
    </div>
  </div>
</template>
