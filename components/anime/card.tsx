import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import * as colors from '@/styles/colors';
import { Anime } from 'types/anime';

const cardAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  '60%': {
    opacity: 1,
  },
  '100%': {
    transform: 'none',
  },
});

const Card = styled.div<{ color: string }>(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    animation: `${cardAnimation} 0.3s linear`,
  },
  (props) => ({
    ':hover': {
      div: {
        color: props.color,
      },
    },
  })
);

const cover = css({
  position: 'relative',
  borderRadius: '5px',
  paddingTop: '130%',
  width: '100%',
  overflow: 'hidden',
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

const shimmer = (w: number, h: number, color: string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${color}" offset="20%" />
      <stop stop-color="${color}" offset="50%" />
      <stop stop-color="${color}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${color}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <a>
        <Card color={anime.coverImage.color}>
          <div css={cover}>
            <Image
              src={anime.coverImage.extraLarge}
              alt={anime.title.english}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475, colors.textLight)
              )}`}
            />
          </div>

          <div css={title}>
            {anime.title.english || anime.title.romaji || anime.title.native}
          </div>
        </Card>
      </a>
    </Link>
  );
}
