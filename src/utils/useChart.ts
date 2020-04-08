import {
  MutableRefObject,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';

import { ResizeObserver } from '@juggle/resize-observer';

import { IChartAdaptor } from '../Histogram';

const getDOMNode = (ref: MutableRefObject<any>) => {
  const node = ReactDOM.findDOMNode(ref.current);
  try {
    if (node instanceof Text) {
      return undefined;
    }
    return node;
  } catch (e) {
    // instanceof Text not working when running tests - just presume its ok
    return node as Element;
  }
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
    chart.create(el, {
      ...props,
      width: props.width === '100%' ? width : 300,
    });
    return () => chart.destroy();
  }, []);

  useEffect(() => {
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
