import {
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';

import { ResizeObserver } from '@juggle/resize-observer';

import { IChartAdaptor } from '../Histogram';

const getDOMNode = (ref: MutableRefObject<any>) => {
  const node = ReactDOM.findDOMNode(ref.current);
  if (node instanceof HTMLElement) {
    return node;
  }
  return undefined;
}

export const useChart = <C, T>(localRef: any, chart: IChartAdaptor<any>, props: any) => {
  const [ref, { width }] = useMeasure({
    debounce: 20,
    polyfill: ResizeObserver,
  });
  const refs = mergeRefs([localRef, ref]);

  useEffect(() => {
    const el = getDOMNode(localRef);
    if (!el) {
      return;
    }
    console.log('create', props.width === '100%' ? width : 300)
    chart.create(el, {
      ...props,
      width: props.width === '100%' ? width : 300,
    });
  }, []);

  useEffect(() => {
    console.log('update', props.width === '100%' ? width : 300);
    chart.update({
      ...props,
      width: props.width === '100%' ? width : 300,
    });
  }, [props])

  return [
    refs,
    width,
  ]
}
