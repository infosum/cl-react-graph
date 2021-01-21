import {
  useLayoutEffect,
  useState,
} from 'react';
import useMeasure from 'react-use-measure';

import { ResizeObserver } from '@juggle/resize-observer';

// Helper hook to monitor container ref width and calculate pixel value from percent or number.
export const useWidth = (origWidth: string | number) => {
  const [ref, { width }] = useMeasure({
    debounce: 20,
    polyfill: ResizeObserver,
  });
  const [r, setR] = useState<any>(width);
  useLayoutEffect(() => {
    const w = typeof origWidth === 'number'
      ? origWidth
      : origWidth.includes('%')
        ? width * (parseInt(origWidth, 10) / 100)
        : parseInt(origWidth, 10);
    setR(w);
  }, [origWidth, width]);
  return [ref, r];
}
