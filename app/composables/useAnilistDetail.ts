import { useQuery } from "@tanstack/vue-query";
import { gql, GraphQLClient } from "graphql-request";

export function useAnilistDetail({
  id,
  idMal,
}: {
  id?: string;
  idMal?: string;
}) {
  const client = new GraphQLClient("https://graphql.anilist.co");

  const { data: animeDetailResult, isLoading: loading } = useQuery<{
    Media: AnilistMedia;
  }>({
    queryKey: ["anime-detail", idMal || id],
    queryFn: () => {
      return client.request(gql`
        query Media {
          Media(${idMal ? `idMal: ${idMal}` : `id: ${id}`}, type: ANIME) {
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
      `);
    },
    retry: false,
  });

  const animeDetail = computed(() => {
    return animeDetailResult.value?.Media || null;
  });

  return {
    animeDetail,
    loading,
  };
}
