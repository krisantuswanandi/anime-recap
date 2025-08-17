<script setup>
const searchQuery = ref("");

// Get all anime directories and their metadata
const {
  data: animeData,
  pending,
  error,
} = await useAsyncData("anime-list", () => {
  return queryCollection("animes").all();
});

// Filter anime based on search query
const filteredAnime = computed(() => {
  if (!animeData.value) return [];

  if (!searchQuery.value.trim()) {
    return animeData.value;
  }

  const query = searchQuery.value.toLowerCase().trim();

  return animeData.value.filter((anime) => {
    return (
      anime.title.toLowerCase().includes(query) ||
      anime.meta.titleRomaji.toLowerCase().includes(query)
    );
  });
});

useSeoMeta({
  title: "Anime List - Anime Recap",
  description:
    "Browse and search through anime series and their episode recaps",
});
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Anime List
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Explore anime series and their episode recaps
      </p>
    </div>

    <!-- Search -->
    <div class="mb-8">
      <div class="relative max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search anime titles..."
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        >
        <UIcon class="absolute right-3 top-2.5 w-5 h-5" name="lucide:search" />
      </div>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading anime...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">
        Error loading anime: {{ error }}
      </p>
    </div>

    <div
      v-else-if="filteredAnime && filteredAnime.length > 0"
      class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="anime in filteredAnime"
        :key="anime.id"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold">
          <NuxtLink
            :to="anime.path"
            class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ anime.title }}
          </NuxtLink>
        </h2>

        <UBadge
          :color="
            anime.meta.status === 'Completed'
              ? 'primary'
              : anime.meta.status === 'Ongoing'
                ? 'secondary'
                : 'warning'
          "
          size="sm"
        >
          {{ anime.meta.status }}
        </UBadge>

        <p class="text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">
          {{ anime.description }}
        </p>

        <div class="mt-4">
          <NuxtLink
            :to="anime.path"
            class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
          >
            View detail
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="searchQuery" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">
        No anime found matching "{{ searchQuery }}"
      </p>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No anime found.</p>
    </div>
  </div>
</template>
