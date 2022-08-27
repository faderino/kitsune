import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';
import { useBreakpoint } from 'utils/window';

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
  padding: '0 20px',
  height: '100%',
  width: '100%',
  maxWidth: '1240px',

  [mq.sm]: {
    justifyContent: 'space-between',
    padding: '0 20px',
  },
});

const logoText = css({
  fontWeight: '700',
  fontSize: '1.5rem',
  letterSpacing: '0.01rem',

  [mq.sm]: {
    fontSize: '1.8rem',
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
  const breakpoint = useBreakpoint();
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
            }}
          >
            <Image
              src="/kitsune.png"
              width={breakpoint.xsAndDown ? '30' : '38'}
              height={breakpoint.xsAndDown ? '27' : '34'}
              layout="fixed"
              alt="logo"
              priority
            />
            <span
              css={[
                logoText,
                { marginLeft: '0.7rem', color: colors.textLight },
              ]}
            >
              kitsu
            </span>
            <span css={[logoText, { color: colors.magenta }]}>ne</span>
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
