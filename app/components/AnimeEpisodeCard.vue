<script setup lang="ts">
defineProps<{ animeIdMal: string; episode: JikanEpisode }>();
</script>

<template>
  <div>
    <h3>
      {{ episode.mal_id }}. {{ episode.title }}
      <NuxtLink
        :to="`https://myanimelist.net/anime/${animeIdMal}/slug/episode/${episode.mal_id}`"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        MyAnimeList
      </NuxtLink>
      <NuxtLink
        :to="`/anime/${animeIdMal}/episode/${episode.mal_id}`"
        class="text-blue-500 hover:underline"
      >
        Read recap
      </NuxtLink>
    </h3>
  </div>
</template>
