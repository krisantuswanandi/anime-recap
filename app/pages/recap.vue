<script setup lang="ts">
const PAGE_SIZE = 6;

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

// Note: date formatting is handled inside ArticleCard

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

const recapBreadcrumbs = [
  { label: "Home", to: "/" },
  { label: "Recaps" },
];
</script>

<template>
  <div>
    <Breadcrumbs :items="recapBreadcrumbs" />
    <div class="mt-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        All Recaps
      </h1>
      <p class="text-gray-600 dark:text-gray-300">Browse episode recaps</p>
    </div>

    <div v-if="initialPending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading episodes...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">
        Error loading episodes: {{ error }}
      </p>
    </div>

    <div v-else>
      <div
        v-if="episodes.length"
        class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
      >
        <ArticleCard
          v-for="episode in episodes"
          :key="episode.id"
          :to="episode.path"
          :image="episode.meta?.thumbnail || undefined"
          :image-alt="`${episode.meta?.animeTitle} episode ${episode.meta?.episodeDisplay} thumbnail`"
          :title="episode.title"
          :subtitle="`${episode.meta?.animeTitle} Episode ${episode.meta?.episodeDisplay}`"
          :date="episode.airedDate"
          :description="episode.description"
          :aria-label="`${episode.meta?.animeTitle} Episode ${episode.meta?.episodeDisplay}, ${episode.title}`"
        />
      </div>

      <div v-else class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No episodes found.</p>
      </div>

      <div class="mt-6 flex justify-center">
        <UButton
          v-if="!noMore"
          color="neutral"
          variant="soft"
          :loading="loadingMore"
          :disabled="noMore"
          @click="loadMore"
        >
          Load more
        </UButton>
        <span v-else class="italic text-gray-400 text-sm">No more recap</span>
      </div>
    </div>
  </div>
</template>
