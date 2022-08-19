import Head from 'next/head';
import { css } from '@emotion/react';

import * as colors from '@/styles/colors';

const container = css({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const title = css({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem',
  textAlign: 'center',

  a: {
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
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}
