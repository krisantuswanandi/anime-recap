import { useInfiniteQuery } from "@tanstack/vue-query";
import { gql, GraphQLClient } from "graphql-request";

type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export function useAnilistPaginatedList(options?: {
  season?: Season;
  seasonYear?: number;
  sort?: "POPULARITY_DESC" | "TRENDING_DESC" | "SCORE_DESC" | "START_DATE_DESC";
  perPage?: number;
}) {
  const client = new GraphQLClient("https://graphql.anilist.co");

  const season = options?.season ?? "SUMMER";
  const seasonYear = options?.seasonYear ?? new Date().getFullYear();
  const sort = options?.sort ?? "POPULARITY_DESC";
  const perPage = options?.perPage ?? 10;

  const query = gql`
    query Page($page: Int!, $perPage: Int!, $season: MediaSeason!, $seasonYear: Int!, $sort: [MediaSort!]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: $sort) {
          id
          idMal
          title { english romaji }
          bannerImage
          coverImage { medium large extraLarge color }
          episodes
          nextAiringEpisode { episode }
        }
      }
    }
  `;

  const infinite = useInfiniteQuery<{ Page: { pageInfo: { currentPage: number; hasNextPage: boolean }; media: AnilistMedia[] } }>({
    queryKey: ["anilist-list", { season, seasonYear, sort, perPage }],
    queryFn: ({ pageParam }) =>
      client.request(query, {
        page: pageParam ?? 1,
        perPage,
        season,
        seasonYear,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.Page.pageInfo.hasNextPage ? lastPage.Page.pageInfo.currentPage + 1 : undefined,
    retry: false,
  });

  const items = computed(() => infinite.data.value?.pages.flatMap((p) => p.Page.media) ?? []);

  return {
    items,
    fetchNextPage: infinite.fetchNextPage,
    hasNextPage: infinite.hasNextPage,
    isFetchingNextPage: infinite.isFetchingNextPage,
    isLoading: infinite.isLoading,
    error: infinite.error,
  };
}
