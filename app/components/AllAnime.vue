<script setup>
// Fetch exactly 5 items; display via a horizontal carousel
const {
  data: animes,
  pending,
  error,
} = await useAsyncData(() => {
  return queryCollection("animes").order("startDate", "DESC").limit(5).all();
});
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
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

    <UCarousel
      v-else-if="animes && animes.length"
      v-slot="item"
      :items="animes"
      class="mt-4"
      :ui="{
        item: 'basis-1/2 sm:basis-1/3 md:basis-1/5',
      }"
    >
      <AnimeCard :to="item.item.path" :cover="item.item.cover" :title="item.item.title" />
    </UCarousel>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No anime found.</p>
    </div>
  </div>
</template>
