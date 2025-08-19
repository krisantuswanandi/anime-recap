<script setup>
const colorMode = useColorMode()
</script>

<template>
  <UButton
    :icon="colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
    size="sm"
    color="neutral"
    variant="ghost"
    aria-label="Toggle theme"
    @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
  />
</template>

