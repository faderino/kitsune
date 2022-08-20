import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';

import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';

const container = css({
  position: 'relative',
  paddingTop: '40px',
  width: '100%',
  height: '233px',
  backgroundColor: colors.indigo,
  userSelect: 'none',
});

const background = css({
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  left: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
  transition: 'opacity .5s ease-in-out',
  width: '100%',
  zIndex: 10,
});

const wrap = css({
  position: 'relative',
  zIndex: 30,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  margin: '0 12vw',

  [mq.sm]: {
    justifyContent: 'space-between',
  },
});

const navigation = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'none',

  [mq.sm]: {
    display: 'inline-flex',
  },

  a: {
    transition: 'color .25s ease-in-out, border .25s ease-in-out',
    padding: '1rem',
    cursor: 'pointer',
    fontWeight: 500,
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',
    color: colors.textLight,
    ':hover': {
      color: colors.magenta,
    },
  },
});

export default function HeaderNav() {
  return (
    <header css={container}>
      <div css={background} />
      <div css={wrap}>
        <Link href={'/'}>
          <a
            style={{
              alignItems: 'center',
              display: 'flex',
              width: 'fit-content',
              fontWeight: '700',
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
            }}
          >
            <Image
              src="/kitsune.png"
              width="48"
              height="43"
              layout="fixed"
              alt="logo"
              priority
            />
            <span css={{ marginLeft: '0.7rem', color: colors.textLight }}>
              kitsu
            </span>
            <span css={{ color: colors.magenta }}>ne</span>
          </a>
        </Link>
        <nav css={navigation}>
          <Link href={'/'}>
            <a>browse</a>
          </Link>
          <Link href={'/collections'}>
            <a>collections</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
