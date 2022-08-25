import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';

type ContainerProps = {
  background?: string;
  scrolledPastHeader: boolean;
};
const Container = styled.header<ContainerProps>(
  {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    height: '75px',
    width: '100%',
    zIndex: 999,
    transition: 'background 0.8s ease 0s, top 0.5s ease 0s',
    userSelect: 'none',
    ':hover': {
      background: colors.dark,
    },
  },
  (props) => ({
    background: props.background ?? colors.dark,
    top: props.scrolledPastHeader ? '-75px' : 0,
  })
);

const wrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  maxWidth: '1240px',

  [mq.sm]: {
    justifyContent: 'space-between',
  },
});

const navigation = css({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'none',

  [mq.md]: {
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

export type HeaderProps = {
  background?: string;
};

export default function HeaderNav({ background }: HeaderProps) {
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setScrolledPastHeader(window.scrollY > 75);
    });
  }, []);

  return (
    <Container background={background} scrolledPastHeader={scrolledPastHeader}>
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
    </Container>
  );
}
