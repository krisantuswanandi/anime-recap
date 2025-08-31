<script setup lang="ts">
type Props = {
  to: string;
  title: string;
  episodeLabel?: number | string;
  thumbnail?: string;
  airedDate?: string;
};

defineProps<Props>();

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 hover:shadow-sm transition"
  >
    <NuxtImg
      v-if="thumbnail"
      :src="thumbnail"
      alt="Episode thumbnail"
      class="w-30 aspect-video rounded object-cover flex-shrink-0"
    />

    <div class="min-w-0">
      <div v-if="episodeLabel !== undefined" class="text-sm text-gray-500 dark:text-gray-400">
        Episode {{ episodeLabel }}
      </div>
      <h3
        class="font-medium text-gray-900 dark:text-white line-clamp-2"
      >
        {{ title }}
      </h3>
      <p v-if="airedDate" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {{ formatDate(airedDate) }}
      </p>
    </div>
  </NuxtLink>
</template>
