<script setup lang="ts">
const route = useRoute();
const { animeDetail } = useAnilistDetail({ idMal: route.params.id as string });
const malId = computed(() => parseInt(route.params.id as string));
const { episodes } = useJikanDetail(malId.value);
</script>

<template>
  <div>
    <div v-if="animeDetail">
      <div>{{ animeDetail.title.english }} ({{ animeDetail.episodes }})</div>
      <NuxtImg :src="animeDetail.coverImage.large" />
      <NuxtLink
        :to="`https://myanimelist.net/anime/${animeDetail.idMal}`"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        MyAnimeList
      </NuxtLink>
      <NuxtLink
        :to="`https://anilist.co/anime/${animeDetail.id}`"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        Anilist
      </NuxtLink>
    </div>
    <AnimeEpisodeCard v-for="episode in episodes" :key="episode.mal_id" :anime-id-mal="route.params.id as string" :episode="episode" />
  </div>
</template>
