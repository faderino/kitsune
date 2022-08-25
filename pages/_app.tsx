import { css, Global } from '@emotion/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import HeaderNav from '@/components/header-nav';
import BottomNav from '@/components/bottom-nav';
import * as colors from '@/styles/colors';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { HeaderProps } from '@/components/header-nav';
import { ApolloClientProvider } from 'utils/apollo';

const globalStyles = css({
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    color: colors.text,
    background: colors.base,
  },
  '*': {
    boxSizing: 'border-box',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  h1: {
    fontSize: '2rem',
  }
});

type AppPropsWithHeaderProps = AppProps & {
  Component: NextPage & {
    headerProps?: HeaderProps;
  };
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithHeaderProps) {
  const headerProps = Component.headerProps || {};

  return (
    <>
      <Global styles={globalStyles} />
      <ApolloClientProvider>
        <HeaderNav {...headerProps} />
        <Component {...pageProps} />
        <BottomNav />
      </ApolloClientProvider>
    </>
  );
}
