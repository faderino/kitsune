import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const globalStyles = css({
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  '*': {
    boxSizing: 'border-box',
  },
  main: {
    padding: '5rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
