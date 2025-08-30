import { useQuery } from "@tanstack/vue-query";

export function useJikanDetail(id: number) {
  const { data: episodesResult, isLoading: loading } = useQuery<{
    data: JikanEpisode[];
  }>({
    queryKey: ["anime-episodes", id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
      return response.json();
    },
    retry: false,
  });

  const episodes = computed(() => {
    return episodesResult.value?.data || [];
  })

  return {
    episodesResult,
    episodes,
    loading,
  };
}
