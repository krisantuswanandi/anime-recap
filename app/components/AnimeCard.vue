<script setup lang="ts">
defineProps<{ anime: AnilistMedia }>();
</script>

<template>
  <NuxtLink :to="`/anime/${anime.idMal}`" class="block">
    <NuxtImg :src="anime.coverImage.large" class="rounded w-full aspect-[3/4]" />
    <span class="font-bold">
      {{ anime.title.english }}
    </span>
  </NuxtLink>
</template>
