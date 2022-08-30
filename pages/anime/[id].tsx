import { client } from 'utils/apollo';
import { gql } from '@apollo/client';
import { css } from '@emotion/react';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { GetServerSideProps, GetStaticProps } from 'next';
import Image from 'next/image';
import { FaChevronDown, FaHeart, FaPlus, FaPlusCircle } from 'react-icons/fa';
import { Button } from '@/components/lib';
import { Anime } from 'types/anime';
import CharacterCard from '@/components/anime/character-card';
import Card from '@/components/anime/card';
import { useBreakpoint } from 'utils/window';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'utils/collection';
import { GoPrimitiveDot } from 'react-icons/go';
import { useRouter } from 'next/router';

const banner = css({
  backgroundPosition: '50% 35%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '342px',
});

const shadow = css({
  background:
    'linear-gradient(180deg, rgba(6, 3, 14, 0) 40%, rgba(6, 3, 14, 0.6))',
  height: '100%',
  width: '100%',
});

const headerWrap = css({
  background: colors.white,
});

const header = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  columnGap: '30px',
  margin: '0 auto',
  padding: '0 30px',
  minHeight: '250px',
  maxWidth: '1240px',

  [mq.md]: {
    gridTemplateColumns: '215px auto',
  },
});

const cover = css({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '165px 35px',
  margin: '20px 0',
  columnGap: '15px',

  [mq.md]: {
    gridTemplateColumns: 'auto 35px',
  },
});

const coverImage = css({
  marginTop: '-75px',

  [mq.md]: {
    marginTop: '-125px',
  },
});

const imageWrap = css({
  display: 'none',
  position: 'relative',
  borderRadius: '2px',
  paddingTop: '140%',
  width: '100%',
  overflow: 'hidden',

  [mq.md]: {
    display: 'block',
  },
});

const dropButton = css({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '3px',
  height: '35px',
  background: colors.primary,
});

const description = css({
  display: 'grid',
  padding: '25px 0',
  gridTemplateRows: 'auto auto auto',
});

const title = css({
  display: 'flex',
  flexDirection: 'column',

  [mq.xs]: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
});

const summary = css({
  'p, li': {
    color: colors.textLighten,
    fontSize: '14px',
  },
  p: {
    textAlign: 'justify',
  },
});

const main = css({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '40px',
  padding: '0 20px',
  margin: '30px auto',
  maxWidth: '1240px',

  [mq.md]: {
    gridTemplateColumns: '208px auto',
    padding: '0 0 0 30px',
    gap: '40px',
  },
});

const sidebar = css({
  borderRadius: '3px',
  padding: '18px',
  background: colors.white,
});

const sidebarItem = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px ,1fr))',
  columnGap: '10px',
});

const content = css({
  marginBottom: '30px',

  h4: {
    marginBottom: '10px',
  },
});

function DetailListItem({
  type,
  value,
}: {
  type: string;
  value: string | number;
}) {
  return (
    <div css={{ paddingBottom: '14px' }}>
      <div
        css={{
          paddingBottom: '5px',
          fontWeight: '500',
          fontSize: '0.9rem',
        }}
      >
        {type}
      </div>
      <div
        css={{
          fontSize: '0.7rem',
          color: colors.textLighten,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function AnimeDetailPage({ anime }: { anime: Anime }) {
  const [collection, dispatch] = useCollection();
  const router = useRouter();
  const [showDropdown, toggleDropdown] = useState(false);

  const getEmojiAndColor = (score: number) => {
    if (score >= 80) {
      return ['😃', colors.green];
    } else if (score >= 60) {
      return ['🙂', colors.orange];
    } else if (score >= 50) {
      return ['😐', colors.yellow];
    } else {
      return ['😭', colors.red];
    }
  };

  const addToCollection = (
    e: React.FormEvent<HTMLFormElement>,
    anime: Anime
  ) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    dispatch({
      type: 'add',
      payload: {
        name,
        anime,
      },
    });
    e.target.elements.name.value = '';
    toggleDropdown(!showDropdown);
  };

  return (
    <>
      <div
        css={banner}
        style={{ backgroundImage: `url(${anime.bannerImage})` }}
      >
        <div css={shadow}></div>
      </div>

      <section css={headerWrap}>
        <div css={header}>
          <div css={coverImage}>
            <div css={imageWrap}>
              <Image
                src={anime.coverImage.extraLarge}
                alt={
                  anime.title.english ||
                  anime.title.native ||
                  anime.title.romaji
                }
                objectFit="cover"
                layout="fill"
              />
            </div>

            <div css={cover}>
              <div
                css={dropButton}
                onClick={() => toggleDropdown(!showDropdown)}
              >
                <button
                  css={{
                    height: '100%',
                    width: '75%',
                    background: colors.primary,
                    color: colors.white,
                  }}
                >
                  Add to Collection
                </button>
                <button
                  css={{
                    borderRadius: '0 3px 3px 0',
                    height: '100%',
                    width: '25%',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <FaChevronDown color="white" />
                </button>
              </div>

              {showDropdown && (
                <div
                  css={{
                    position: 'absolute',
                    zIndex: '4000',
                    top: 'calc(100% + 8px)',
                    right: '50px',
                    padding: '8px 0',
                    maxWidth: '100%',
                    borderRadius: '3px',
                    background: colors.white,
                    boxShadow: '0 2px 12px 0 rgb(0 0 0 / 10%)',
                  }}
                >
                  <ul
                    css={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',

                      li: {
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: 'auto 24px',
                        width: '100%',
                        color: colors.textLighten,
                        lineHeight: '30px',
                        padding: '0 0 0 1rem',
                        cursor: 'default',

                        ':hover': {
                          color: colors.white,
                          background: colors.primary,

                          div: {
                            visibility: 'visible',
                            opacity: 100,
                            transition: '',
                          },
                        },

                        span: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '14px',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',

                          ':hover': {
                            textDecoration: 'underline',
                          },
                        },
                      },
                    }}
                  >
                    <h5 css={{ padding: '0 1rem', marginBottom: '0.5rem' }}>
                      Collection List
                    </h5>
                    {Object.keys(collection).length ? (
                      [
                        ...Object.keys(collection).filter((name) =>
                          Boolean(
                            collection[name].find(
                              (animeCollection: Anime) =>
                                animeCollection.id === anime.id
                            )
                          )
                        ),
                        ...Object.keys(collection).filter(
                          (name) =>
                            !Boolean(
                              collection[name].find(
                                (animeCollection: Anime) =>
                                  animeCollection.id === anime.id
                              )
                            )
                        ),
                        ,
                      ].map((name, i) => {
                        if (i < 4) {
                          return (
                            <li key={name}>
                              <span
                                onClick={() =>
                                  router.push(`/collection/${name}`)
                                }
                              >
                                {name}
                              </span>

                              {!Boolean(
                                collection[name!].find(
                                  (animeCollection: Anime) =>
                                    animeCollection.id === anime.id
                                )
                              ) ? (
                                <div
                                  css={{
                                    marginLeft: '4px',
                                    visibility: 'hidden',
                                    opacity: 0,
                                    transition:
                                      'visibility 0s, opacity 0.2s ease-in-out',
                                  }}
                                >
                                  <FaPlus
                                    onClick={() => {
                                      dispatch({
                                        type: 'add',
                                        payload: {
                                          name,
                                          anime,
                                        },
                                      });
                                      toggleDropdown(!showDropdown);
                                    }}
                                    size={14}
                                    css={{ cursor: 'pointer' }}
                                  />
                                </div>
                              ) : (
                                <GoPrimitiveDot
                                  color={colors.green}
                                  size={18}
                                />
                              )}
                            </li>
                          );
                        } else if (i === 4) {
                          return (
                            <div
                              onClick={() => router.push(`/collection`)}
                              css={{
                                margin: '0 auto',
                                padding: '0.05rem 1rem',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                textAlign: 'center',
                                cursor: 'pointer',

                                ':hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              See more...
                            </div>
                          );
                        }
                      })
                    ) : (
                      <span
                        css={{
                          fontSize: '14px',
                          color: colors.textLighten,
                          padding: '0 1rem',
                        }}
                      >
                        Empty.
                      </span>
                    )}
                    <div
                      css={{
                        margin: '0.8rem 0',
                        height: '1px',
                        width: '100%',
                        background: colors.textLight,
                      }}
                    ></div>
                    <form
                      css={{
                        padding: '0 1rem',
                      }}
                      onSubmit={(e) => addToCollection(e, anime)}
                    >
                      <div
                        css={{
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '3px',
                          border: `1px solid ${colors.textLight}`,
                          padding: '6px 8px',
                        }}
                      >
                        <button
                          type="submit"
                          css={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FaPlusCircle
                            size={14}
                            color={colors.primary}
                            css={{ marginRight: '4px' }}
                          />
                        </button>
                        <input
                          id="name"
                          type="text"
                          placeholder="Add new collection"
                          css={{
                            width: '100%',
                            outline: 'none',
                            border: 'none',
                            color: colors.textLighten,
                            backgroundColor: 'inherit',
                            transition: 'border 0.3s ease',

                            ':focus': {
                              borderColor: colors.text,
                            },

                            '::placeholder': {
                              color: colors.textLight,
                              fontSize: '11px',
                            },
                          }}
                        />
                      </div>
                    </form>
                  </ul>
                </div>
              )}

              <button
                css={{
                  height: '100%',
                  width: '100%',
                  background: colors.magenta,
                }}
              >
                <FaHeart color="white" />
              </button>
            </div>
          </div>

          <div css={description}>
            <div css={title}>
              <h2
                css={{
                  color: colors.text,
                  fontSize: '1.2rem',
                  fontWeight: '500',

                  [mq.sm]: {
                    fontSize: '1.5rem',
                  },
                }}
              >
                {anime.title.english ||
                  anime.title.romaji ||
                  anime.title.native}
                <span
                  css={{
                    marginLeft: '0.6rem',
                    fontSize: '0.9rem',
                    color: colors.textLighten,

                    [mq.sm]: {
                      fontSize: '1.2rem',
                    },
                  }}
                >
                  {`(${anime.startDate.year})`}
                </span>
              </h2>
              {anime.meanScore && (
                <h3
                  style={{
                    color: getEmojiAndColor(anime.meanScore)[1],
                  }}
                  css={{
                    fontWeight: '600',
                    fontSize: '0.8rem',

                    [mq.sm]: {
                      fontSize: '1.17rem',
                    },
                  }}
                >
                  {getEmojiAndColor(anime.meanScore)[0]} {anime.meanScore}%
                </h3>
              )}
            </div>
            <div
              css={summary}
              dangerouslySetInnerHTML={{
                __html: anime.description.split('<br />').join(''),
              }}
            ></div>
          </div>
        </div>
      </section>

      <main css={main}>
        <div css={sidebar}>
          <h5 css={{ marginBottom: '1rem' }}>Anime details</h5>
          <div css={sidebarItem}>
            {anime.format && (
              <DetailListItem type="Format" value={anime.format} />
            )}
            {anime.episodes && (
              <DetailListItem type="Episodes" value={anime.episodes} />
            )}
            {anime.duration && (
              <DetailListItem
                type="Episode Duration"
                value={`${anime.duration} minutes`}
              />
            )}
            {anime.status && (
              <DetailListItem
                type="Status"
                value={anime.status.split('_').join(' ').toLowerCase()}
              />
            )}
            {anime.startDate.year &&
              anime.startDate.month &&
              anime.startDate.day && (
                <DetailListItem
                  type="Start Date"
                  value={new Date(
                    anime.startDate.year,
                    anime.startDate.month - 1,
                    anime.startDate.day
                  )
                    .toDateString()
                    .split(' ')
                    .map((num, i) => (i === 0 ? '' : i === 2 ? `${num},` : num))
                    .join(' ')}
                />
              )}
            {anime.endDate.year && anime.endDate.month && anime.endDate.day && (
              <DetailListItem
                type="End Date"
                value={new Date(
                  anime.endDate.year,
                  anime.endDate.month - 1,
                  anime.endDate.day
                )
                  .toDateString()
                  .split(' ')
                  .map((num, i) => (i === 0 ? '' : i === 2 ? `${num},` : num))
                  .join(' ')}
              />
            )}
            {anime.season && (
              <DetailListItem
                type="Season"
                value={anime.season.toLowerCase() + ' ' + anime.seasonYear}
              />
            )}
            {anime.averageScore && (
              <DetailListItem
                type="Average Score"
                value={`${anime.averageScore}%`}
              />
            )}
            {anime.meanScore && (
              <DetailListItem type="Mean Score" value={`${anime.meanScore}%`} />
            )}
            {anime.popularity && (
              <DetailListItem type="Popularity" value={anime.popularity} />
            )}
            {anime.favourites && (
              <DetailListItem type="Favorites" value={anime.favourites} />
            )}
            {anime.studios && (
              <DetailListItem
                type="Studios"
                value={anime.studios.edges
                  .filter((studio) => studio.node.isAnimationStudio)
                  .map((studio) => studio.node.name)
                  .join(', ')}
              />
            )}
            {anime.studios && (
              <DetailListItem
                type="Producers"
                value={anime.studios.edges
                  .filter((studio) => !studio.node.isAnimationStudio)
                  .map((studio) => studio.node.name)
                  .join(', ')}
              />
            )}
            {anime.source && (
              <DetailListItem type="Source" value={anime.source} />
            )}
            {anime.hashtag && (
              <DetailListItem type="Hashtag" value={anime.hashtag} />
            )}
            {anime.genres && (
              <DetailListItem type="Genres" value={anime.genres.join(', ')} />
            )}
            {anime.title.romaji && (
              <DetailListItem type="Romaji" value={anime.title.romaji} />
            )}
            {anime.title.english && (
              <DetailListItem type="English" value={anime.title.english} />
            )}
            {anime.title.native && (
              <DetailListItem type="Native" value={anime.title.native} />
            )}
            {anime.synonyms.length > 0 && (
              <DetailListItem
                type="Synonyms"
                value={anime.synonyms.join(', ')}
              />
            )}
          </div>
        </div>

        <section>
          {anime.characters && (
            <div css={content}>
              <h4>Characters</h4>
              <div
                css={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '15px',

                  [mq.lg]: {
                    gridTemplateColumns: '1fr 1fr',
                  },

                  [mq.xl]: {
                    gridTemplateColumns: '1fr 1fr 1fr',
                  },
                }}
              >
                {anime.characters.edges.map((character, i) => {
                  if (i < 10) {
                    return (
                      <CharacterCard key={character.id} character={character} />
                    );
                  }
                })}
              </div>
            </div>
          )}

          {anime.trailer && (
            <div css={content}>
              <h4>Trailer</h4>
              <div
                css={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '40px',

                  [mq.md]: {
                    gridTemplateColumns: 'minmax(300px, 420px) auto',
                  },

                  [mq.lg]: {
                    gridTemplateColumns: '1fr 1fr',
                  },
                }}
              >
                <iframe
                  css={{
                    border: 'none',
                    borderRadius: '3px',
                    height: '280px',
                    width: '100%',
                  }}
                  src={`https://www.${anime.trailer.site}.com/embed/${anime.trailer.id}`}
                ></iframe>
              </div>
            </div>
          )}

          {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
            <div css={content}>
              <h4>Watch</h4>
              <div
                css={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '15px 30px',

                  [mq.sm]: {
                    gridTemplateColumns: '1fr 1fr',
                  },

                  [mq.lg]: {
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  },
                }}
              >
                {anime.streamingEpisodes.map((episode, i) => {
                  if (i < 4) {
                    return (
                      <a
                        key={episode.title}
                        style={{
                          backgroundImage: `url(${episode.thumbnail})`,
                        }}
                        css={{
                          position: 'relative',
                          display: 'inline-block',
                          borderRadius: '3px',
                          height: '100px',
                          backgroundPosition: '50%',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          verticalAlign: 'text-bottom',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          css={{
                            position: 'absolute',
                            overflow: 'hidden',
                            left: 0,
                            bottom: 0,
                            padding: '11px',
                            width: '100%',
                            fontWeight: '500',
                            fontSize: '0.7rem',
                            color: colors.textLight,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            background: 'rgba(0, 0, 0, 0.65)',
                          }}
                        >
                          {episode.title}
                        </div>
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          )}

          {anime.recommendations.edges &&
            anime.recommendations.edges.length > 0 && (
              <div css={content}>
                <h4>Recommendations</h4>
                <div
                  css={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 125px)',
                    justifyContent: 'space-between',
                    gap: '20px',
                  }}
                >
                  {anime.recommendations.edges.map((anime, i) => {
                    if (i < 7) {
                      return (
                        <Card
                          key={anime.node.id}
                          anime={anime.node.mediaRecommendation}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            )}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const GET_ANIME_DETAIL = gql`
  {
    Media(id: ${query.id}, type: ANIME) {
      id
      bannerImage
      description(asHtml: true)
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        english
        romaji
        native
      }
      characters(sort: ID) {
        edges {
          voiceActors(language: JAPANESE) {
            image {
              medium
            }
            language
            name {
              full
              native
            }
            id
          }
          role
          node {
            image {
              medium
            }
            name {
              first
              last
              full
              native
            }
            id
          }
          id
        }
      }
      trailer {
        id
        site
      }
      recommendations {
        edges {
          node {
            id
            mediaRecommendation {
              id
              title {
                romaji
              }
              coverImage {
                extraLarge
                large
                medium
                color
              }
            }
          }
        }
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      genres
      meanScore
      averageScore
      popularity
      format
      episodes
      duration
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      status
      hashtag
      studios {
        edges {
          node {
            id
            name
            isAnimationStudio
          }
        }
      }
      source
      synonyms
      favourites
    }
  }
  
  `;

  const { data } = await client.query({ query: GET_ANIME_DETAIL });
  return {
    props: {
      anime: data.Media,
    },
  };
};

AnimeDetailPage.headerProps = {
  background: colors.seeThrough,
};
