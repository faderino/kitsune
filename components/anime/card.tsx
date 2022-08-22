import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Anime } from '@/pages/index';
import { css } from '@emotion/react';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';

const Card = styled.div<{ color: string }>(
  {
    display: 'grid',
    gridTemplateRows: '155px auto',
    width: '100%',

    [mq.md]: {
      gridTemplateRows: '185px auto',
    },

    [mq.lg]: {
      gridTemplateRows: '256px auto',
      width: '185px',
    },
  },
  (props) => ({
    ':hover': {
      div: {
        color: props.color,
      },
    },
  })
);

const Cover = styled.div<{ background: string }>(
  (props) => ({
    background: props.background,
  }),
  {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  }
);

const image = css({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  verticalAlign: 'text-top',
});

const title = css({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  marginTop: '10px',
  fontWeight: '600',
  fontSize: '0.75rem',
  lineHeight: '17px',
  userSelect: 'none',
  color: colors.textLighten,
  transition: 'color 0.2s',
});

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link href={'/'}>
      <a>
        <Card color={anime.coverImage.color}>
          <Cover background={anime.coverImage.color}>
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.english}
              css={image}
            />
            {/* <Image
              src={anime.coverImage.extraLarge}
              alt={anime.title.english}
              layout="fill"
              objectFit="cover"
              css={image}
            /> */}
          </Cover>

          <div css={title}>{anime.title.english}</div>
        </Card>
      </a>
    </Link>
  );
}
