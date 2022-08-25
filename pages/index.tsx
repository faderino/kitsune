import { gql } from '@apollo/client';
import { css } from '@emotion/react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '@/components/anime/card';
import { client } from 'utils/apollo';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { FilterGroup, FilterInput, SearchInput } from '@/components/filter';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { Button } from '@/components/lib';
import { useWindowDimensions } from 'utils/window';

const container = css({
  margin: '75px auto 0 auto',
  padding: '0 10px',
  width: '100%',
  minWidth: '320px',
  maxWidth: '1040px',
  minHeight: '120vh',

  [mq.xl]: {
    maxWidth: '1240px',
  },
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  justifyContent: 'center',
  gap: '20px 12px',
  padding: '25px 0',

  [mq.xs]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
    gap: '24px 16px',
  },

  [mq.sm]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
    gap: '32px 24px',
  },

  [mq.md]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
    gap: '40px 32px',
  },

  [mq.lg]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
    justifyContent: 'space-between',
  },

  [mq.xl]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
    justifyContent: 'space-between',
  },
});

const headerText = css({
  color: colors.textLighten,
  margin: '35px 0 0 0',
  paddingBottom: '30px',
});

const filters = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  alignItems: 'center',
  gap: '24px',
  marginBottom: '25px',
});

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
}

export default function Home({
  page,
  animeList,
}: {
  page: PageInfo;
  animeList: Anime[];
}) {
  const { width: screenWidth, height: screenHight } = useWindowDimensions();
  const [animes, setAnimes] = useState(animeList);
  const [currentPage, setCurrentPage] = useState(page.currentPage);
  const [hasNextPage, setHasNextPage] = useState(page.hasNextPage);

  const getNextPage = async () => {
    const data = await fetch(
      `${window.location.origin}/api/anime-list/${currentPage + 1}`
    ).then((res) => res.json());
    console.log(data);
    setAnimes((animes) => [...animes, ...data.Page.media]);
    setCurrentPage(data.Page.pageInfo.currentPage);
    setHasNextPage(data.Page.pageInfo.hasNextPage);
  };

  return (
    <InfiniteScroll
      dataLength={animes.length}
      next={getNextPage}
      hasMore={hasNextPage}
      css={container}
      loader
    >
      <Head>
        <title>Kitsune | Discover and Collect Anime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1 css={headerText}>Trending Anime</h1>
        <div css={filters}>
          <FilterGroup label="Search">
            <SearchInput
              prependIcon={<FaSearch color={colors.textLight} size="13" />}
            ></SearchInput>
          </FilterGroup>

          {screenWidth && screenWidth >= mq.breakpoints.lg && (
            <>
              <FilterGroup label="Genre">
                <FilterInput
                  appendIcon={
                    <FaChevronDown color={colors.textLight} size="13" />
                  }
                ></FilterInput>
              </FilterGroup>

              <FilterGroup label="Year">
                <FilterInput
                  appendIcon={
                    <FaChevronDown color={colors.textLight} size="13" />
                  }
                ></FilterInput>
              </FilterGroup>

              <FilterGroup label="Season">
                <FilterInput
                  appendIcon={
                    <FaChevronDown color={colors.textLight} size="13" />
                  }
                ></FilterInput>
              </FilterGroup>

              <FilterGroup label="Format">
                <FilterInput
                  appendIcon={
                    <FaChevronDown color={colors.textLight} size="13" />
                  }
                ></FilterInput>
              </FilterGroup>
            </>
          )}
        </div>
      </section>

      <main css={grid}>
        {animes.map((anime) => (
          <Card key={anime.id} anime={anime} />
        ))}
      </main>
    </InfiniteScroll>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const GET_ANIME_LIST = gql`
    {
      Page(page: 1, perPage: 12) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          coverImage {
            extraLarge
            color
          }
          title {
            english
            romaji
            native
          }
          status
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
          seasonYear
          endDate {
            year
          }
          meanScore
          studios {
            edges {
              node {
                id
                name
                isAnimationStudio
              }
            }
          }
          format
          episodes
          genres
        }
      }
    }
  `;
  const { data } = await client.query({ query: GET_ANIME_LIST });

  return {
    props: {
      page: data.Page.pageInfo,
      animeList: data.Page.media,
    },
    revalidate: 3600,
  };
};
