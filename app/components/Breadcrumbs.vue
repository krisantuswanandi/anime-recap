<script setup lang="ts">
type Crumb = {
  label: string;
  to?: string;
};

const props = defineProps<{ items: Crumb[] }>();
defineOptions({ name: "AppBreadcrumbs" });
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="mb-4 text-sm text-gray-500 dark:text-gray-400"
  >
    <ol class="flex items-center flex-wrap gap-2">
      <template v-for="(item, idx) in props.items" :key="idx">
        <span v-if="idx > 0">/</span>

        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="transition-colors hover:text-gray-700 dark:hover:text-gray-300"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          :aria-current="idx === props.items.length - 1 ? 'page' : undefined"
          class="transition-colors text-gray-900 dark:text-white"
        >
          {{ item.label }}
        </span>
      </template>
    </ol>
  </nav>
</template>
