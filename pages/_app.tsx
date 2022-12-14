import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { HeaderProps } from '@/components/header-nav';
import HeaderNav from '@/components/header-nav';
import BottomNav from '@/components/bottom-nav';
import * as colors from '@/styles/colors';
import { useBreakpoint } from 'utils/window';
import { collectionReducer } from 'utils/collection';
import { createContext, useEffect, useReducer } from 'react';

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
  'h1, h2, h3, h4, h5': {
    margin: '0',
  },
  h1: {
    fontSize: '2rem',
  },
  button: {
    border: 'none',
    borderRadius: '3px',
    padding: '0',
    cursor: 'pointer',
  },
});

type AppPropsWithHeaderProps = AppProps & {
  Component: NextPage & {
    headerProps?: HeaderProps;
  };
};

export const CollectionContext = createContext({});

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithHeaderProps) {
  const [collection, dispatch] = useReducer(collectionReducer, {});
  const breakpoint = useBreakpoint();
  const headerProps = Component.headerProps || {};

  useEffect(() => {
    dispatch({ type: 'getAll' });
  }, []);

  return (
    <>
      <Global styles={globalStyles} />
      <HeaderNav {...headerProps} />
      <CollectionContext.Provider value={[collection, dispatch]}>
        <Component {...pageProps} />
      </CollectionContext.Provider>
      <BottomNav />
      <div
        css={{
          paddingTop: breakpoint.mdAndDown ? '80px' : '0',
        }}
      ></div>
    </>
  );
}
