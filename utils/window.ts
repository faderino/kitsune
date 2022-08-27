import { useState, useEffect } from 'react';
import * as mq from '@/styles/media-queries';

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== undefined) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}

function useBreakpoint() {
  const { width = 0 } = useWindowDimensions();
  const [breakpoint, setBreakpoint] = useState({
    xsAndDown: false,
    xsAndUp: false,
    smAndDown: false,
    smAndUp: false,
    mdAndDown: false,
    mdAndUp: false,
    lgAndDown: false,
    lgAndUp: false,
    xlAndDown: false,
    xlAndUp: false,
    xxlAndDown: false,
    xxlAndUp: false,
  });

  useEffect(() => {
    setBreakpoint((breakpoint) => ({
      ...breakpoint,
      xsAndDown: width < mq.breakpoints.sm,
      xsAndUp: width >= mq.breakpoints.xs,
      smAndDown: width < mq.breakpoints.md,
      smAndUp: width >= mq.breakpoints.sm,
      mdAndDown: width < mq.breakpoints.lg,
      mdAndUp: width >= mq.breakpoints.md,
      lgAndDown: width < mq.breakpoints.xl,
      lgAndUp: width >= mq.breakpoints.lg,
      xlAndDown: width < mq.breakpoints.xxl,
      xlAndUp: width >= mq.breakpoints.xl,
      xxlAndDown: width < mq.breakpoints.xxxl,
      xxlAndUp: width >= mq.breakpoints.xxl,
    }));
  }, [width]);

  return breakpoint;
}

export { useWindowDimensions, useBreakpoint };
