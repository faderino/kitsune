import Head from 'next/head';
import { css } from '@emotion/react';

import * as colors from '@/styles/colors';

const container = css({
  minHeight: '200vh',
  padding: '0 0.5rem',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  main: {
    zIndex: 60,
    padding: '5rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const title = css({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem',
  textAlign: 'center',

  a: {
    tarnsition: 'all 0.2s',
    color: colors.magenta,
    textDecoration: 'none',
    ':hover, :focus, :active': {
      textDecoration: 'underline',
    },
  },
});

export default function Home() {
  return (
    <div css={container}>
      <Head>
        <title>Kitsune | Discover and Collect Anime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={title}>
          Welcome to <a href="https://nextjs.org">Kitsune!</a>
        </h1>
      </main>
    </div>
  );
}
