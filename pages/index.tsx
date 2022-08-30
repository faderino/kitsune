import { gql } from '@apollo/client';
import { css } from '@emotion/react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AnimeCard from '@/components/anime/card';
import { client } from 'utils/apollo';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { FilterGroup, FilterInput, SearchInput } from '@/components/filter';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { Button } from '@/components/lib';
import { useBreakpoint } from 'utils/window';
import { Anime, PageInfo } from 'types/anime';
import { useCollection } from 'utils/collection';
import { grid } from '@/styles/lib';

const container = css({
  margin: '75px auto 0 auto',
  padding: '0 10px',
  width: '100%',
  minWidth: '320px',
  maxWidth: '1040px',
  minHeight: '120vh',

  [mq.sm]: {
    padding: '0 20px',
  },

  [mq.xl]: {
    maxWidth: '1240px',
  },
});

const headerText = css({
  color: colors.textLighten,
  margin: '35px 0 0 0',
  paddingBottom: '30px',
  textAlign: 'center',

  [mq.sm]: {
    textAlign: 'left',
  },
});

const filters = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  gap: '24px',
  marginBottom: '25px',

  [mq.md]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});

export default function Home({
  page,
  animeList,
}: {
  page: PageInfo;
  animeList: Anime[];
}) {
  const breakpoint = useBreakpoint();
  const [animes, setAnimes] = useState(animeList);
  const [currentPage, setCurrentPage] = useState(page.currentPage);
  const [hasNextPage, setHasNextPage] = useState(page.hasNextPage);

  const getNextPage = async () => {
    const data = await fetch(
      `${window.location.origin}/api/anime-list/${currentPage + 1}`
    ).then((res) => res.json());
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

          {breakpoint.mdAndUp && (
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
          <AnimeCard key={anime.id} anime={anime} />
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
