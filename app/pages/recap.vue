<script setup lang="ts">
const PAGE_SIZE = 5;

type EpisodeMeta = {
  animeTitle?: string;
  episodeDisplay?: string | number;
  thumbnail?: string;
};

type Episode = {
  id: string;
  title: string;
  description?: string;
  path: string;
  airedDate: string;
  meta?: EpisodeMeta & Record<string, unknown>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const {
  data: initial,
  pending: initialPending,
  error,
} = await useAsyncData<Episode[]>("recap-initial", () =>
  queryCollection("episodes").order("airedDate", "DESC").limit(PAGE_SIZE).all()
);

const episodes = ref<Episode[]>(initial.value ?? []);
const loadingMore = ref(false);
const noMore = ref(false);

async function loadMore() {
  if (loadingMore.value || noMore.value) return;
  loadingMore.value = true;
  try {
    if (episodes.value.length === 0) {
      noMore.value = true;
      return;
    }
    const last = episodes.value[episodes.value.length - 1];
    if (!last) {
      noMore.value = true;
      return;
    }
    const next = await queryCollection("episodes")
      .order("airedDate", "DESC")
      .where("airedDate", "<", last.airedDate)
      .limit(PAGE_SIZE)
      .all();
    if (!next || next.length === 0) {
      noMore.value = true;
      return;
    }
    episodes.value = episodes.value.concat(next as Episode[]);
    if (next.length < PAGE_SIZE) noMore.value = true;
  } finally {
    loadingMore.value = false;
  }
}

useSeoMeta({
  title: "All Recaps | Anime Recap",
  description: "Browse all anime episode recaps with simple pagination.",
});
</script>

<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">All Recaps</h1>
      <p class="text-gray-600 dark:text-gray-300">Browse episode recaps</p>
    </div>

    <div v-if="initialPending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading episodes...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">Error loading episodes: {{ error }}</p>
    </div>

    <div v-else>
      <div v-if="episodes.length" class="mt-4 space-y-4">
        <NuxtLink
          v-for="episode in episodes"
          :key="episode.id"
          :to="episode.path"
          class="block no-underline"
          :aria-label="`${episode.meta?.animeTitle} Episode ${episode.meta?.episodeDisplay}, ${episode.title}`"
        >
          <article class="flex gap-4">
            <div class="rounded min-w-52 h-30 bg-gray-300 overflow-hidden">
              <NuxtImg v-if="episode.meta?.thumbnail" :src="episode.meta.thumbnail" class="w-full h-full" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ episode.meta?.animeTitle }} Episode {{ episode.meta?.episodeDisplay }}, "{{ episode.title }}"
              </h2>
              <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
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

      <div class="mt-6 flex justify-center">
        <UButton
          color="primary"
          :loading="loadingMore"
          :disabled="noMore"
          @click="loadMore"
        >
          <span v-if="!noMore">See more</span>
          <span v-else>No more recaps</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
