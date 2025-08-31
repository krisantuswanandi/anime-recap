<script setup lang="ts">
interface Props {
  // Anilist media object (optional for flexibility)
  anime?: AnilistMedia;
  // Optional overrides for content-based docs
  to?: string;
  cover?: string;
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="to || (anime?.idMal ? `/anime/${anime.idMal}` : '#')"
    class="group relative block overflow-hidden rounded"
  >
    <NuxtImg
      :src="cover || anime?.coverImage?.large"
      :alt="title || anime?.title?.english || anime?.title?.romaji || 'Anime cover'"
      class="w-full aspect-[3/4] object-cover"
    />

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
    />

    <!-- Title overlay -->
    <span
  class="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white font-semibold text-xs md:text-sm leading-snug drop-shadow-sm"
    >
      {{ title || anime?.title?.english || anime?.title?.romaji }}
    </span>
  </NuxtLink>
</template>
 
