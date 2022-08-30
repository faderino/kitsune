import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Anime } from 'types/anime';
import { useCollection } from 'utils/collection';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { grid } from '@/styles/lib';
import AnimeCard from '@/components/anime/card';
import { FaTimesCircle } from 'react-icons/fa';

const header = css({
  position: 'relative',
  height: '342px',
  background: colors.dark,
});

const main = css({
  position: 'relative',
  zIndex: 2,
  margin: '-200px auto 0 auto',
  maxWidth: '1240px',
  padding: '0 30px',
});

export default function CollectionDetailPage() {
  const [collection, dispatch] = useCollection();
  const router = useRouter();
  const animeList: Anime[] = collection[router.query.name];

  return (
    <>
      <div css={header}>
        <div
          style={{
            backgroundImage: `url(${
              animeList
                ? animeList.length
                  ? animeList[0].bannerImage
                  : ''
                : ''
            })`,
          }}
          css={{
            position: 'absolute',
            zIndex: '1',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.1,
          }}
        ></div>
      </div>

      <main css={main}>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            gap: '0.8rem',
            marginBottom: '1rem',
            color: colors.textLight,

            [mq.sm]: {
              flexDirection: 'row',
            },
          }}
        >
          <h1>{router.query.name}</h1>
          <h4>({animeList?.length} Anime)</h4>
        </div>

        <div css={grid}>
          {animeList?.length &&
            animeList.map((anime) => (
              <div
                css={{
                  position: 'relative',

                  ':hover': {
                    button: {
                      visibility: 'visible',
                      opacity: 1,
                    },
                  },
                }}
              >
                <AnimeCard key={anime.id} anime={anime} />
                <button
                  onClick={() =>
                    dispatch({
                      type: 'deleteAnime',
                      payload: { name: router.query.name, animeId: anime.id },
                    })
                  }
                  css={{
                    background: 'transparent',
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    visibility: 'visible',
                    opacity: 1,
                    transition: 'opacity 0.3s ease',

                    [mq.md]: {
                      visibility: 'hidden',
                      opacity: 0,
                    },
                  }}
                >
                  <FaTimesCircle color="red" size={16} />
                </button>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

CollectionDetailPage.headerProps = {
  background: colors.seeThrough,
};
