import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import HeaderNav from '@/components/header-nav';
import BottomNav from '@/components/bottom-nav';
import * as colors from '@/styles/colors';

const globalStyles = css({
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    color: colors.text,
  },
  '*': {
    boxSizing: 'border-box',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ApolloProvider client={client}>
        <HeaderNav />
        <Component {...pageProps} />
        <BottomNav />
      </ApolloProvider>
    </>
  );
}
