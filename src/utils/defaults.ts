import { curveCatmullRom } from 'd3-shape';

import {
  Axes,
  Stroke,
} from '../';
import { Grid } from '../Histogram';
import { LineProps } from '../LineChart';
import { SVGLineStyle } from '../utils/types';

export const lineStyle: SVGLineStyle = {
  'fill': '#000',
  'opacity': 1,
  'shapeRendering': 'auto',
  'stroke': '#000',
  'strokeOpacity': 1,
  'strokeWidth': 1,
  'visible': 'true',
};

export const stroke: Stroke = {
  color: '#000',
  dasharray: '0',
  linecap: 'butt',
  width: 1,
};

export const line: LineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: '#000',
    show: true,
  },
  show: true,
  stroke: '#000',
  strokeDashArray: '0',
  strokeDashOffset: 0,
};


export const axis: Axes = {
  x: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'linear',
    tickSize: 0,
    width: 50,
  },
  y: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'linear',
    tickSize: 20,
    width: 50,
  },
};

export const grid: Grid = {
  x: {
    height: 1,
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'strokeOpacity': 0.7,
      'strokeWidth': 1,
    },
    ticks: 5,
    visible: true,
  },
  y: {
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'strokeOpacity': 0.7,
      'strokeWidth': 1,
    },
    ticks: 5,
    visible: true,
  },
};
