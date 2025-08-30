export interface AnilistMedia {
  id: number;
  idMal: number;
  title: {
    english: string;
    romaji: string;
  };
  bannerImage: string;
  coverImage: {
    medium: string;
    large: string;
    extraLarge: string;
    color: string;
  };
  episodes: number;
  nextAiringEpisode: {
    episode: number;
  };
}

export interface JikanEpisode {
  mal_id: number;
  title: string;
  title_japanese: string;
  title_romanji: string;
  url: string;
}