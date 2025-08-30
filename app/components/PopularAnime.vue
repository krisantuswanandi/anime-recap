<script setup>
const { animeList } = useAnilistList();
</script>

<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        Popular Anime
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Explore popular anime titles
      </p>
    </div>

    <div class="grid grid-cols-5 gap-4 mt-4">
      <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
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
