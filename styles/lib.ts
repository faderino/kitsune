import { css } from '@emotion/react';
import styled from '@emotion/styled';
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

export const button = css({
  padding: '8px 12px',
  minWidth: '65px',
  background: 'transparent',
  border: `1px solid ${colors.text}`,
  borderRadius: '3px',
});

export const Modal = styled.div({
  position: 'fixed',
  zIndex: '999',
  height: '100vh',
  width: '100vw',
  background: `${colors.dark}AB`,
});

export const ModalContent = styled.div({
  position: 'absolute',
  zIndex: '1000',
  display: 'grid',
  gridTemplateRows: '60px auto 60px',
  width: '100%',
  maxWidth: '480px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '4px',
  background: colors.base,
});

export const ModalHeader = styled.div({
  display: 'grid',
  gridTemplateColumns: '32px auto 32px',
  alignItems: 'center',
  padding: '1rem',
  height: '60px',
  color: colors.textLight,
  background: colors.dark,
});

export const ModalFooter = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '20px',
  padding: '0 1rem',
  borderTop: `1px solid ${colors.textLight}`,
});
