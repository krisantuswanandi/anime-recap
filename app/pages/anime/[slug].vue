<script setup>
const route = useRoute();
const animeSlug = route.params.slug;

const { data: episodes } = await useAsyncData(
  `anime-${animeSlug}-episodes`,
  () => {
    return queryCollection("episodes")
      .where("path", "LIKE", `/anime/${animeSlug}/%`)
      .all();
  }
);

// Get anime metadata
const { data: animeInfo, error } = await useAsyncData(
  `anime-${animeSlug}`,
  () => {
    return queryCollection("animes").path(`/anime/${animeSlug}`).first();
  }
);

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

useSeoMeta({
  title: `${animeInfo.value?.title} | Anime Recap`,
  description: `Browse episode recaps for ${animeInfo.value?.title}`,
});

const showMore = ref(false);

const displayedDescription = computed(() => {
  if (!animeInfo.value?.description) return "";

  if (showMore.value) {
    return animeInfo.value.description;
  }
  
  const words = animeInfo.value.description.split(" ");
  return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : animeInfo.value.description;
});

const shortenDescription = (description) => {
  if (!description) return "";

  const words = description.split(" ");
  return words.length > 40 ? words.slice(0, 40).join(" ") + "..." : description;
};
</script>

<template>
  <div>
    <div v-if="!animeInfo || error" class="text-center py-8">
      <p>Anime not found</p>
      <NuxtLink
        to="/anime"
        class="text-blue-600 hover:text-blue-800 mt-4 inline-block"
      >
        Back to Anime List
      </NuxtLink>
    </div>

    <div v-else-if="animeInfo">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <NuxtLink to="/" class="hover:text-gray-700">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/anime" class="hover:text-gray-700">Anime</NuxtLink>
        <span class="mx-2">/</span>
        <span class="">{{ animeInfo.title }}</span>
      </nav>

      <!-- Anime Header -->
      <header class="pb-6">
        <h1 class="text-4xl font-bold mb-4">
          {{ animeInfo.title }}
          <UBadge
            :color="
              animeInfo.meta.status === 'Completed'
                ? 'primary'
                : animeInfo.meta.status === 'Ongoing'
                  ? 'secondary'
                  : 'warning'
            "
            class="align-middle"
          >
            {{ animeInfo.meta.status }}
          </UBadge>
        </h1>

        <p class="text-lg text-gray-700 dark:text-gray-500 mb-4">
          {{ displayedDescription }}
          <button
            class="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            @click="showMore = !showMore"
          >
            {{ showMore ? "show less" : "show more" }}
          </button>
        </p>

        <div class="flex items-center space-x-4">
          <div
            v-if="animeInfo.genre && animeInfo.genre.length > 0"
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="genre in animeInfo.genre"
              :key="genre"
              class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {{ genre }}
            </span>
          </div>
        </div>
      </header>

      <!-- Episodes List -->
      <section>
        <div v-if="episodes.length > 0" class="space-y-4">
          <article
            v-for="episode in episodes"
            :key="episode.id"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow"
          >
            <h2
              class="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              <NuxtLink
                :to="episode.path"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Episode {{ episode.meta.episodeDisplay }}, "{{ episode.title }}"
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
                class="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                read more
              </NuxtLink>
            </p>
          </article>
        </div>

        <div v-else class="text-center py-8">
          <p class="text-gray-500">No episodes available yet.</p>
        </div>
      </section>

      <!-- Back to Anime List -->
      <footer class="mt-12 pt-6 border-t border-gray-200">
        <NuxtLink
          to="/anime"
          class="inline-flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-800 font-medium gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Back to Anime List
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>
