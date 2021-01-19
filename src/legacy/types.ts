

import { IAxis } from '../components/YAxis';
import { DeepPartial } from '../utils/types';

export interface IChartAdaptor<P> {
  create: (el: Element, props: DeepPartial<P>) => void;
  update: (props: DeepPartial<P>) => void;
  destroy: () => void;
}

export interface IChartState {
  parentWidth?: number;
}

export type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;

export interface IMargin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IStroke {
  color: ((d, i: number, colors: (i: number) => string) => string) | string;
  dasharray: string;
  linecap: 'butt' | 'round' | 'square';
  width: number;
}

interface ISVGTextStyle {
  fill?: string;
  'font-size'?: string;
  dy?: string | number;
  'stroke-opacity'?: number;
  'text-anchor'?: string;
  transform?: string;
  x?: string | number;
  y?: string | number;
}

export type Scale = 'LINEAR' | 'TIME' | 'LOG' | 'ORDINAL';

export interface IAxes {
  y: IAxis;
  x: IAxis;
}

export interface ISVGLineStyle {
  'stroke': string;
  'fill': string;
  'opacity': number;
  'stroke-width': number;
  'stroke-opacity': number;
  'shape-rendering': string;
  'visible': boolean;
}
