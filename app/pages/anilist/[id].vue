<script setup lang="ts">
const route = useRoute();
const { animeDetail } = useAnilistDetail({ id: route.params.id as string });

watch(animeDetail, (val) => {
  if (val) {
    navigateTo(`/anime/${val.idMal}`);
  }
})
</script>

<template>
  <div>
    Loading...
  </div>
</template>
