import { useQuery } from "@tanstack/vue-query";
import { gql, GraphQLClient } from "graphql-request";

export function useAnilistList() {
  const client = new GraphQLClient("https://graphql.anilist.co");

  const { data: animeListResult, isLoading: loading } = useQuery<{
    Page: { media: AnilistMedia[] };
  }>({
    queryKey: ["anime-list"],
    queryFn: () => {
      return client.request(gql`
        query Page {
          Page(page: 1, perPage: 10) {
            media(
              season: SUMMER
              seasonYear: 2025
              type: ANIME
              sort: POPULARITY_DESC
            ) {
              id
              idMal
              title {
                english
                romaji
              }
              bannerImage
              coverImage {
                medium
                large
                extraLarge
                color
              }
              episodes
              nextAiringEpisode {
                episode
              }
            }
          }
        }
      `);
    },
    retry: false,
  });

  const animeList = computed(() => {
    return animeListResult.value?.Page.media || [];
  });

  return {
    animeList,
    loading,
  };
}
