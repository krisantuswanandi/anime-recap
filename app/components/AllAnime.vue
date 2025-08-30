<script setup>
const { data: animes, pending, error } = await useAsyncData(() => {
  return queryCollection('animes').order('startDate', 'DESC').all();
});
</script>

<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        All Anime
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        All anime in our library
      </p>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading anime...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">Error: {{ error }}</p>
    </div>

    <div v-else-if="animes && animes.length" class="grid grid-cols-5 gap-4 mt-4">
      <NuxtLink v-for="anime in animes" :key="anime.path" :to="anime.path" class="block">
        <NuxtImg :src="anime.cover" class="rounded w-full aspect-[3/4]" />
        <span class="font-bold text-gray-900 dark:text-white">{{ anime.title }}</span>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No anime found.</p>
    </div>

    <div class="mt-3">
      <NuxtLink
        to="/anime"
        class="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 no-underline"
      >
        See all anime
      </NuxtLink>
    </div>
  </div>
</template>
