<script setup>
const {
  data: episodes,
  pending,
  error,
} = await useAsyncData(() => {
  return queryCollection("episodes").order("airedDate", "DESC").limit(10).all();
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

useSeoMeta({
  title: "Latest Episodes | Anime Recap",
  description: "Stay updated with the latest anime episode recaps.",
});

const shortenDescription = (description) => {
  if (!description) return "";

  // return first 40 words (split by space)
  // if not enough words, return full description
  const words = description.split(" ");
  return words.length > 40 ? words.slice(0, 40).join(" ") + "..." : description;
};
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Latest Episodes
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

    <div v-else-if="episodes && episodes.length > 0" class="space-y-6">
      <article
        v-for="episode in episodes"
        :key="episode.id"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          <NuxtLink
            :to="episode.path"
            class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ episode.meta.animeTitle }} Episode {{ episode.meta.episodeDisplay }}, "{{
              episode.title
            }}"
          </NuxtLink>
        </h2>

        <div
          class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3"
        >
          <span>{{ formatDate(episode.airedDate) }}</span>
        </div>

        <p class="text-gray-600 dark:text-gray-300">
          {{ shortenDescription(episode.description) }}
          <NuxtLink
            :to="episode.path"
            class="inline-flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            read more
          </NuxtLink>
        </p>
      </article>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No episodes found.</p>
    </div>
  </div>
</template>
