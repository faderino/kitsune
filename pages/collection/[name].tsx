import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Anime } from 'types/anime';
import { useCollection } from 'utils/collection';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import {
  button,
  grid,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/styles/lib';
import AnimeCard from '@/components/anime/card';
import { FaTimes, FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePayload, setDeletePayload] = useState<{
    id?: number;
    title: string;
  }>({ id: undefined, title: '' });

  const deleteAnime = () => {
    dispatch({
      type: 'deleteAnime',
      payload: { name: router.query.name, animeId: deletePayload.id },
    });
    setShowDeleteModal(false);
    setDeletePayload({ id: undefined, title: '' });
  };
  return (
    <>
      {showDeleteModal && (
        <>
          <Modal onClick={() => setShowDeleteModal(false)}></Modal>
          <ModalContent>
            <ModalHeader>
              <button
                css={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0',
                  color: 'inherit',
                }}
              >
                <FaTimes
                  onClick={() => setShowDeleteModal(false)}
                  css={{
                    margin: 'auto',
                    transition: 'color 0.15s ease',
                    cursor: 'pointer',
                    ':hover': {
                      color: colors.magenta,
                    },
                  }}
                  size={16}
                />
              </button>
              <h4 css={{ textAlign: 'center' }}>Confirm deletion</h4>
            </ModalHeader>

            <div
              css={{
                padding: '1rem',
              }}
            >
              Are you sure you want to delete "{deletePayload.title}"?
            </div>

            <ModalFooter>
              <button css={button} onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                css={[
                  button,
                  {
                    background: 'red',
                    border: '1px solid red',
                    borderRadius: '3px',
                    color: colors.white,
                  },
                ]}
                onClick={deleteAnime}
              >
                Delete
              </button>
            </ModalFooter>
          </ModalContent>
        </>
      )}

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
            animeList.map((anime: Anime) => (
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
                  onClick={() => {
                    setShowDeleteModal(true);
                    setDeletePayload((state) => ({
                      ...state,
                      id: anime.id,
                      title:
                        anime.title.english ||
                        anime.title.native ||
                        anime.title.romaji,
                    }));
                  }}
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
