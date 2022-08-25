import Link from 'next/link';
import { css } from '@emotion/react';
import { FaSearch } from 'react-icons/fa';
import { BsCollectionPlayFill } from 'react-icons/bs';

import * as colors from '@/styles/colors';
import * as mq from '@/styles/media-queries';

const container = css({
  position: 'fixed',
  width: '100%',
  bottom: 0,
  padding: '2rem 1rem 1rem 1rem',
  zIndex: 999,

  [mq.md]: {
    display: 'none',
  },
});

const navigation = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  borderRadius: '5px',
  height: '55px',
  backgroundColor: colors.dark,
});

const navText = css({
  fontSize: '0.8rem',
  paddingTop: '0.2rem',
  textTransform: 'capitalize',
  letterSpacing: '0.05rem',
  color: colors.textLight,
});

export default function BottomNav() {
  return (
    <footer css={container}>
      <nav css={navigation}>
        <Link href={'/'}>
          <a
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FaSearch color={colors.textLight} size="20" />
            <span css={navText}>browse</span>
          </a>
        </Link>
        <Link href={'/collections'}>
          <a
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <BsCollectionPlayFill color={colors.textLight} size="20" />
            <span css={navText}>collections</span>
          </a>
        </Link>
      </nav>
    </footer>
  );
}
