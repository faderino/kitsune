import Head from 'next/head';
import { css } from '@emotion/react';
import * as colors from '@/styles/colors';
import { client } from 'utils/apollo';
import { gql } from '@apollo/client';
import { GetStaticProps } from 'next';
import Card from '@/components/anime/card';
import * as mq from '@/styles/media-queries';

const container = css({
  margin: '75px auto 0 auto',
  padding: 0,
  width: '100%',
  minWidth: '320px',
  maxWidth: '1140px',

  [mq.lg]: {
    padding: '0 30px',
  },

  [mq.xxl]: {
    padding: '0 100px',
    maxWidth: '1520px',
  },
});

const title = css({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem',
  textAlign: 'center',

  a: {
    tarnsition: 'all 0.2s',
    color: colors.magenta,
    textDecoration: 'none',
    ':hover, :focus, :active': {
      textDecoration: 'underline',
    },
  },
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '20px 12px',
  padding: '0 10px',
  justifyContent: 'center',

  [mq.sm]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
    gap: '25px 20px',
  },

  [mq.md]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
  },

  [mq.lg]: {
    gridTemplateColumns: 'repeat(auto-fill, 185px)',
    gap: '28px 30px',
  },

  [mq.xl]: {
    justifyContent: 'space-between',
  },
});

export interface PageInfo {
  currentPage: number;
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
  return (
    <div css={container}>
      <Head>
        <title>Kitsune | Discover and Collect Anime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1 css={title}>
          Welcome to <a href="https://nextjs.org">Kitsune!</a>
        </h1>
      </section>

      <main css={grid}>
        {animeList.map((anime) => (
          <Card key={anime.id} anime={anime} />
        ))}
      </main>

      <section>
        <pre>{JSON.stringify(page, null, 2)}</pre>
        <pre>{JSON.stringify(animeList[0], null, 2)}</pre>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const GET_ANIME_LIST = gql`
    {
      Page(page: 1, perPage: 10) {
        pageInfo {
          currentPage
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
