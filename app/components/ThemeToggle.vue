<template>
  <UButton
    :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
    size="sm"
    color="gray"
    variant="ghost"
    aria-label="Toggle theme"
    @click="toggleTheme"
  />
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>