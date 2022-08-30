export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
}

export interface AnimeCoverImage {
  extraLarge: string;
  color: string;
}

export interface AnimeTitle {
  english: string;
  romaji: string;
  native: string;
}

export interface AiringSchedule {
  episode: number;
  timeUntilAiring: number;
}

export interface FuzzyDate {
  year: number;
  month?: number;
  day?: number;
}
export interface StudioConnection {
  edges: StudioEdge[];
}

export interface StudioEdge {
  node: Studio;
}

export interface Studio {
  id: number;
  name: string;
  isAnimationStudio: boolean;
}
export interface Character {
  voiceActors: {
    image: {
      medium: string;
    };
    language: string;
    name: {
      full: string;
      native: string;
    };
    id: number;
  }[];
  role: string;
  node: {
    image: {
      medium: string;
    };
    name: {
      first: string;
      last: string;
      full: string;
      native: string;
    };
    id: number;
  };
  id: number;
}

export interface Characters {
  edges: Character[];
}

export interface Anime {
  id: number;
  coverImage: AnimeCoverImage;
  title: AnimeTitle;
  status: string;
  nextAiringEpisode: AiringSchedule;
  seasonYear: number;
  endDate: FuzzyDate;
  meanScore: number;
  studios: StudioConnection;
  format: string;
  episodes: number;
  genres: string[];
  bannerImage?: string;
  description: string;
  characters?: {
    edges: {
      voiceActors: {
        image: {
          medium: string;
        };
        language: string;
        name: {
          full: string;
          native: string;
        };
        id: number;
      }[];
      role: string;
      node: {
        image: {
          medium: string;
        };
        name: {
          first: string;
          last: string;
          full: string;
          native: string;
        };
        id: number;
      };
      id: number;
    }[];
  };
  trailer?: {
    id: number;
    site: string;
  };
  recommendations: {
    edges: {
      node: {
        id: number;
        mediaRecommendation: {
          title: {
            romaji: string;
          };
          coverImage: {
            extraLarge: string;
            large: string;
            medium: string;
            color: string;
          };
        };
      };
    }[];
  };
  streamingEpisodes?: {
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }[];
  averageScore?: number;
  popularity?: number;
  duration?: number;
  startDate: FuzzyDate;
  season?: string;
  hashtag?: string;
  source?: string;
  synonyms: string[];
  favourites?: number;
}
