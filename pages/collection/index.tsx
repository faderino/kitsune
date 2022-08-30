import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaPlus, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Anime } from 'types/anime';
import { useCollection } from 'utils/collection';
import { useBreakpoint } from 'utils/window';

const Card = styled.div({
  position: 'relative',
  padding: '120% 16px 16px 16px',
  borderRadius: '4px',
  color: colors.white,
  overflow: 'hidden',
  transition: 'transform .3s ease-in-out',
  cursor: 'pointer',

  ':hover': {
    transform: 'scale(1.03)',
    button: {
      visibility: 'visible',
      opacity: '1',
    },
  },
});

function CollectionCard({
  collection,
  setShowDeleteModal,
  setDeletePayload,
}: {
  collection: { name: string; animeList: Anime[] };
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setDeletePayload: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const anime = collection.animeList.length ? collection.animeList[0] : null;

  return (
    <button style={{ background: 'none', border: 'none', textAlign: 'start' }}>
      <Card>
        <div
          onClick={() => router.push(`/collection/${collection.name}`)}
          css={{
            position: 'absolute',
            zIndex: '1',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%',
            background: 'rgba(41, 41, 41, 0.65)',
          }}
        ></div>
        <button
          css={{
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            zIndex: '2',
            top: '0.5rem',
            right: '0.5rem',
            background: 'transparent',
            border: 'none',
            padding: '0',
            color: 'inherit',
            transition: 'opacity 0.2s ease',

            [mq.md]: {
              visibility: 'hidden',
              opacity: '0',
            },
          }}
        >
          <FaTimesCircle
            onClick={() => {
              setShowDeleteModal(true);
              setDeletePayload(collection.name);
            }}
            css={{
              margin: 'auto',
              color: colors.magenta,
              transition: 'color 0.15s ease',
              cursor: 'pointer',
              ':hover': {
                color: 'red',
              },
            }}
            size={16}
          />
        </button>
        <Image
          src={
            anime
              ? anime.coverImage.extraLarge
              : 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png'
          }
          alt={anime ? anime.title.english : 'Anime'}
          layout="fill"
          objectFit="cover"
        />
        <div css={{ position: 'relative', zIndex: 2, fontWeight: 'bold' }}>
          {collection.name}
        </div>
        <div css={{ position: 'relative', zIndex: 2 }}>
          {collection.animeList.length} Anime
        </div>
      </Card>
    </button>
  );
}

const Modal = styled.div({
  position: 'fixed',
  zIndex: '999',
  height: '100vh',
  width: '100vw',
  background: `${colors.dark}AB`,
});

const ModalContent = styled.div({
  position: 'absolute',
  zIndex: '1000',
  display: 'grid',
  gridTemplateRows: '60px auto 60px',
  width: '100%',
  maxWidth: '480px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '4px',
  background: colors.base,
});

const ModalHeader = styled.div({
  display: 'grid',
  gridTemplateColumns: '32px auto 32px',
  alignItems: 'center',
  padding: '1rem',
  height: '60px',
  color: colors.textLight,
  background: colors.dark,
});

const ModalFooter = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '20px',
  padding: '0 1rem',
  borderTop: `1px solid ${colors.textLight}`,
});

const button = css({
  padding: '8px 12px',
  minWidth: '65px',
  background: 'transparent',
  border: `1px solid ${colors.text}`,
  borderRadius: '3px',
});

const header = css({
  height: '342px',
  background: colors.dark,
});

const main = css({
  margin: '-200px auto 0 auto',
  maxWidth: '1240px',
  padding: '0 30px',
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px 16px',

  [mq.xs]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [mq.sm]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  [mq.md]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px 24px',
  },

  [mq.lg]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '40px 36px',
  },
});

const AddNewCollection = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
  background: `${colors.primary}A8`,
  borderRadius: '4px',
  border: 'none',
  color: colors.white,
  transition: 'background 0.3s ease-in-out',

  ':hover': {
    background: `${colors.primary}`,
  },

  [mq.xs]: {
    flexDirection: 'column',
  },
});

export default function CollectionPage() {
  const [collection, dispatch] = useCollection();
  const breakpoint = useBreakpoint();
  const [showAddModal, setShowAddModal] = useState(false);
  const [collectionName, setCollectionName] = useState('Collection name');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePayload, setDeletePayload] = useState('');

  const closeModal = () => {
    setShowAddModal(false);
    setCollectionName('Collection name');
    setShowError(false);
  };

  const addNewCollection = () => {
    if (Object.keys(collection).includes(collectionName)) {
      setErrorMsg('Name already used!');
      setShowError(true);
      return;
    }
    for (const c of collectionName) {
      if (
        ('a'.charCodeAt(0) <= c.charCodeAt(0) &&
          c.charCodeAt(0) <= 'z'.charCodeAt(0)) ||
        ('A'.charCodeAt(0) <= c.charCodeAt(0) &&
          c.charCodeAt(0) <= 'Z'.charCodeAt(0))
      ) {
        continue;
      }
      setErrorMsg('Cannot use special characters');
      setShowError(true);
      return;
    }
    dispatch({ type: 'add', payload: { name: collectionName } });
    closeModal();
  };

  const deleteCollection = () => {
    dispatch({ type: 'delete', payload: deletePayload });
    setDeletePayload('');
    setShowDeleteModal(false);
  };

  return (
    <>
      {showAddModal && (
        <>
          <Modal onClick={() => closeModal()}></Modal>
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
                  onClick={() => closeModal()}
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
              <h4 css={{ textAlign: 'center' }}>Add a Collection</h4>
            </ModalHeader>

            <div
              css={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem',
                padding: '1rem',

                [mq.sm]: {
                  gridTemplateColumns: '1fr 2fr',
                },
              }}
            >
              <div
                css={{
                  position: 'relative',
                  margin: 'auto',
                  padding: '50% 16px 16px 16px',
                  width: '92%',
                  borderRadius: '4px',
                  color: colors.white,
                  overflow: 'hidden',

                  ':before': {
                    position: 'absolute',
                    content: '""',
                    zIndex: '1',
                    top: '0',
                    left: '0',
                    height: '100%',
                    width: '100%',
                    background: 'rgba(41, 41, 41, 0.65)',
                  },

                  [mq.sm]: {
                    padding: '100% 16px 16px 16px',
                    width: '100%',
                  },
                }}
              >
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png"
                  alt="New collection"
                  layout="fill"
                  objectFit="cover"
                />
                <div
                  css={{ position: 'relative', zIndex: 2, fontWeight: 'bold' }}
                >
                  {collectionName}
                </div>
                <div css={{ position: 'relative', zIndex: 2 }}>0 Anime</div>
              </div>

              <div css={{ padding: '0 1rem' }}>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',

                    label: {
                      fontWeight: '500',
                      marginBottom: '0.6rem',
                    },

                    input: {
                      padding: '0.5rem',
                    },
                  }}
                >
                  <label htmlFor="collectionName">Collection name:</label>
                  <input
                    id="collectionName"
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addNewCollection();
                      }
                    }}
                  />
                  {showError && (
                    <div
                      css={{
                        fontSize: '0.8rem',
                        color: 'red',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ModalFooter>
              <button css={button} onClick={() => closeModal()}>
                Cancel
              </button>
              <button
                css={[
                  button,
                  {
                    background: colors.magenta,
                    border: `1px solid ${colors.magenta}`,
                    borderRadius: '3px',
                    color: colors.white,
                  },
                ]}
                onClick={addNewCollection}
              >
                OK
              </button>
            </ModalFooter>
          </ModalContent>
        </>
      )}

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
              Are you sure you want to delete this Collection?
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
                onClick={deleteCollection}
              >
                Delete
              </button>
            </ModalFooter>
          </ModalContent>
        </>
      )}

      <div css={header} />

      <main css={main}>
        <h2 css={{ marginBottom: '2.5rem', color: colors.textLight }}>
          Your collection
        </h2>

        <section css={grid}>
          <AddNewCollection onClick={() => setShowAddModal(true)}>
            <FaPlus size={breakpoint.xsAndUp ? 16 : 14} />
            <h4>Add a Collection</h4>
          </AddNewCollection>

          {Object.keys(collection).map((name) => (
            <CollectionCard
              key={name}
              collection={{ name, animeList: collection[name] }}
              setShowDeleteModal={setShowDeleteModal}
              setDeletePayload={setDeletePayload}
            />
          ))}
        </section>
      </main>
    </>
  );
}

CollectionPage.headerProps = {
  background: colors.seeThrough,
};
