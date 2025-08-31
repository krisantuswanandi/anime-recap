<script setup lang="ts">
type Props = {
  to: string;
  image?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  date?: string; // ISO string; will be formatted
  description?: string;
  ariaLabel?: string;
};

const props = defineProps<Props>();

const formattedDate = computed(() => {
  if (!props.date) return "";
  const d = new Date(props.date);
  if (Number.isNaN(d.getTime())) return props.date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block no-underline h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
    :aria-label="ariaLabel || title"
  >
    <article
      class="h-full flex flex-col md:flex-row md:gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-sm transition-shadow md:bg-transparent md:dark:bg-transparent md:border-0 md:rounded-none md:overflow-visible md:hover:shadow-none"
    >
      <div class="w-full h-40 sm:h-48 bg-gray-300 dark:bg-gray-700 overflow-hidden md:w-auto md:min-w-52 md:h-30 md:rounded">
        <NuxtImg
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="p-4 md:p-0 flex flex-col">
        <h2 class="font-semibold text-gray-900 dark:text-white md:text-xl">
          <template v-if="subtitle && title">
            {{ subtitle }}, "{{ title }}"
          </template>
          <template v-else>
            {{ title }}
          </template>
        </h2>

        <div v-if="formattedDate" class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {{ formattedDate }}
        </div>

        <p v-if="description" class="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 md:line-clamp-2">
          {{ description }}
        </p>
      </div>
    </article>
  </NuxtLink>
  
</template>
