import { css } from '@emotion/react';
import * as colors from './colors';
import * as mq from './media-queries';

export const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  justifyContent: 'center',
  gap: '20px 12px',
  padding: '25px 0',

  [mq.xs]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
    gap: '24px 16px',
  },

  [mq.sm]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
    gap: '32px 24px',
  },

  [mq.md]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
    gap: '40px 32px',
  },

  [mq.lg]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
    gap: '40px 32px',
  },

  [mq.xl]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
    gap: '40px 32px',
  },
});
