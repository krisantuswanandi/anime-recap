<script setup>
const {
  data: episodes,
  pending,
  error,
} = await useAsyncData(() => {
  return queryCollection("episodes").order("airedDate", "DESC").limit(5).all();
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        Recently Aired
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Recent anime episode recaps
      </p>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading episodes...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">
        Error loading episodes: {{ error }}
      </p>
    </div>

    <div v-else-if="episodes && episodes.length > 0" class="mt-4 space-y-4">
      <NuxtLink
        v-for="episode in episodes"
        :key="episode.id"
        :to="episode.path"
        class="block no-underline"
        :aria-label="`${episode.meta.animeTitle} Episode ${episode.meta.episodeDisplay}, ${episode.title}`"
      >
        <article class="flex gap-4">
          <div class="rounded min-w-52 h-30 bg-gray-300 overflow-hidden">
            <NuxtImg
              v-if="episode.meta.thumbnail"
              :src="episode.meta.thumbnail"
              class="w-full h-full"
            />
          </div>

          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ episode.meta.animeTitle }} Episode
              {{ episode.meta.episodeDisplay }}, "{{ episode.title }}"
            </h2>

            <div
              class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <span>{{ formatDate(episode.airedDate) }}</span>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {{ episode.description }}
            </p>
          </div>
        </article>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No episodes found.</p>
    </div>

    <div class="mt-6">
      <NuxtLink
        to="/recap"
        class="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 no-underline"
      >
        See all recaps
      </NuxtLink>
    </div>
  </div>
  
</template>
