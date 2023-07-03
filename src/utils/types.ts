export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : DeepPartial<T[P]>
};

import { Axis } from '../components/YAxis';

export type Stroke = {
  color: ((d, i: number, colors: (i: number) => string) => string) | string;
  dasharray: string;
  linecap: 'butt' | 'round' | 'square';
  width: number;
}

export type SVGTextStyle = {
  fill?: string;
  'font-size'?: string;
  dy?: string | number;
  'stroke-opacity'?: number;
  'text-anchor'?: string;
  transform?: string;
  x?: string | number;
  y?: string | number;
}

export type Axes = {
  y: Axis;
  x: Axis;
}

export type SVGLineStyle = {
  'stroke': string;
  'fill': string;
  'opacity': number;
  'strokeWidth': number;
  'strokeOpacity': number;
  'shapeRendering': string;
  'visible': string;
}
