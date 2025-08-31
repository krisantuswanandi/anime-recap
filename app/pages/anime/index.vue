<script setup lang="ts">
const PAGE_SIZE = 5;

type AnimeItem = {
  path: string;
  title: string;
  cover?: string;
  startDate: string;
};

const {
  data: initial,
  pending: initialPending,
  error,
} = await useAsyncData("anime-initial", () =>
  queryCollection("animes").order("startDate", "DESC").limit(PAGE_SIZE).all()
);

const items = ref<AnimeItem[]>((initial.value as unknown as AnimeItem[]) ?? []);
const loadingMore = ref(false);
const noMore = ref(false);

async function loadMore() {
  if (loadingMore.value || noMore.value) return;
  loadingMore.value = true;
  try {
    if (items.value.length === 0) {
      noMore.value = true;
      return;
    }
    const last = items.value[items.value.length - 1];
    if (!last) {
      noMore.value = true;
      return;
    }
    const next = await queryCollection("animes")
      .order("startDate", "DESC")
      .where("startDate", "<", last.startDate)
      .limit(PAGE_SIZE)
      .all();
    if (!next || (Array.isArray(next) && next.length === 0)) {
      noMore.value = true;
      return;
    }
    const nextItems = next as unknown as AnimeItem[];
    items.value = items.value.concat(nextItems);
    if (nextItems.length < PAGE_SIZE) noMore.value = true;
  } finally {
    loadingMore.value = false;
  }
}

useSeoMeta({
  title: "All Anime | Anime Recap",
  description: "Browse anime from our Nuxt Content library.",
});

const animeIndexBreadcrumbs = [
  { label: "Home", to: "/" },
  { label: "Anime" },
];
</script>

<template>
  <div>
    <Breadcrumbs :items="animeIndexBreadcrumbs" />
    <div class="mt-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
        All Anime
      </h1>
      <p class="text-gray-600 dark:text-gray-300">Browse anime series</p>
    </div>

    <div v-if="initialPending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading anime...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">
        Error loading anime: {{ error }}
      </p>
    </div>

  <div v-else-if="items.length" class="grid grid-cols-5 gap-4 mt-4">
      <AnimeCard
        v-for="anime in items"
        :key="anime.path"
        :to="anime.path"
        :cover="anime.cover"
        :title="anime.title"
      />
    </div>

    <div v-if="!initialPending && !error" class="mt-6 flex justify-center">
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
      <span v-else class="italic text-gray-400 text-sm">No more anime</span>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">No anime found.</p>
    </div>
  </div>
</template>
