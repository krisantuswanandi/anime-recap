<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

type AnimeDoc = {
  path: string;
  title: string;
  description?: string;
  cover?: string;
  startDate?: string;
  endDate?: string;
  myanimelistId?: string;
  anilistId?: string;
  meta?: Record<string, unknown>;
};

type EpisodeDoc = {
  path: string;
  title: string;
  airedDate?: string;
  episode?: number;
  meta?: {
    episodeDisplay?: number | string;
    thumbnail?: string;
    animeTitle?: string;
  } & Record<string, unknown>;
};

// Load anime detail from Nuxt Content (animes collection)
const {
  data: anime,
  pending: animePending,
  error: animeError,
} = await useAsyncData<AnimeDoc | null>(
  `anime-${id}`,
  () =>
    queryCollection("animes")
      .path(`/anime/${id}`)
      .first() as Promise<AnimeDoc | null>
);

// Load all episodes then filter by anime id; sort by episode number if present
const { data: allEpisodes, pending: episodesPending } = await useAsyncData<
  EpisodeDoc[]
>(
  `episodes-${id}`,
  () =>
    queryCollection("episodes").order("airedDate", "ASC").all() as Promise<
      EpisodeDoc[]
    >
);

const episodes = computed(() => {
  const list = (allEpisodes.value ?? []).filter((e) =>
    e.path?.startsWith(`/anime/${id}/episode/`)
  );
  return list.sort((a, b) => {
    const ea = a.episode ?? Number(a.meta?.episodeDisplay ?? 0);
    const eb = b.episode ?? Number(b.meta?.episodeDisplay ?? 0);
    return ea - eb;
  });
});

// Collapsible description (show first paragraph or up to N chars)
const isDescriptionExpanded = ref(false);
const DESCRIPTION_CHAR_LIMIT = 280;

const fullDescription = computed(() => anime.value?.description?.trim() ?? "");

const firstParagraph = computed(() => {
  const d = fullDescription.value;
  if (!d) return "";
  const parts = d.split(/\n\s*\n/); // paragraphs separated by blank line
  return (parts[0] || d).trim();
});

const needsDescriptionToggle = computed(() => {
  const d = fullDescription.value;
  if (!d) return false;
  if (/\n\s*\n/.test(d)) return true; // multiple paragraphs
  return firstParagraph.value.length > DESCRIPTION_CHAR_LIMIT;
});

const collapsedDescription = computed(() => {
  const p = firstParagraph.value;
  if (p.length <= DESCRIPTION_CHAR_LIMIT) return p;
  return p.slice(0, DESCRIPTION_CHAR_LIMIT).trimEnd() + "…";
});

useSeoMeta({
  title: anime.value?.title
    ? `${anime.value.title} | Anime Recap`
    : "Anime Detail | Anime Recap",
  description: anime.value?.description,
});

const breadcrumbs = computed(() => [
  { label: "Home", to: "/" },
  { label: "Anime", to: "/anime" },
  { label: anime.value?.title || id },
]);
</script>

<template>
  <div>
    <Breadcrumbs :items="breadcrumbs" />
    <!-- Loading / Error States -->
    <div v-if="animePending" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Loading anime...</p>
    </div>

    <div v-else-if="animeError || !anime" class="text-center py-8">
      <p class="text-red-500 dark:text-red-400">Anime not found.</p>
      <NuxtLink
        to="/anime"
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >← Back to Anime</NuxtLink
      >
    </div>

    <!-- Anime Detail -->
    <div v-else class="mt-8">
      <div class="flex flex-col md:flex-row gap-4 items-start">
        <NuxtImg
          v-if="anime.cover"
          :src="anime.cover"
          class="rounded min-w-32 w-32 aspect-[3/4] object-cover"
        />
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ anime.title }}
          </h1>
          <div
            v-if="anime.description"
            class="text-gray-600 dark:text-gray-300 mt-2"
          >
            <p class="whitespace-pre-line">
              {{
                isDescriptionExpanded ? fullDescription : collapsedDescription
              }}
              <UButton
                v-if="needsDescriptionToggle"
                class="p-0"
                variant="link"
                color="secondary"
                @click="isDescriptionExpanded = !isDescriptionExpanded"
              >
                {{ isDescriptionExpanded ? "See less" : "See more" }}
              </UButton>
            </p>
          </div>
          <div class="mt-2 flex gap-2">
            <NuxtLink
              v-if="anime.myanimelistId"
              :to="`https://myanimelist.net/anime/${anime.myanimelistId}`"
              target="_blank"
            >
              <UIcon name="i-simple-icons-myanimelist" class="w-6 h-6" />
            </NuxtLink>
            <NuxtLink
              v-if="anime.anilistId"
              :to="`https://anilist.co/anime/${anime.anilistId}`"
              target="_blank"
            >
              <UIcon name="i-simple-icons-anilist" class="w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Episodes List -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          Episodes
        </h2>
        <div
          v-if="episodesPending"
          class="text-gray-500 dark:text-gray-400 mt-2"
        >
          Loading episodes...
        </div>
        <div
          v-else-if="episodes.length === 0"
          class="text-gray-500 dark:text-gray-400 mt-2"
        >
          No episodes yet.
        </div>
        <div v-else class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimeEpisodeCard
            v-for="ep in episodes"
            :key="ep.path"
            :to="ep.path"
            :title="ep.title"
            :episode-label="ep.meta?.episodeDisplay ?? ep.episode"
            :thumbnail="ep.meta?.thumbnail"
            :aired-date="ep.airedDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
