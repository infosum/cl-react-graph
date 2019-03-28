import { curveCatmullRom } from 'd3-shape';

import {
  IAxes,
  IStroke,
} from '../';
import {
  IGrid,
  ISVGLineStyle,
} from '../Histogram';
import { ILineProps } from '../LineChart';

export const lineStyle: ISVGLineStyle = {
  'fill': '#000',
  'opacity': 1,
  'shape-rendering': 'auto',
  'stroke': '#000',
  'stroke-opacity': 1,
  'stroke-width': 1,
  'visible': true,
};

export const stroke: IStroke = {
  color: '#000',
  dasharray: '0',
  linecap: 'butt',
  width: 1,
};

export const line: ILineProps = {
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

export const axis: IAxes = {
  x: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'LINEAR',
    style: {
      ...lineStyle,
      fill: 'none',
      stroke: '#666',
    },
    text: {
      style: {
        dy: '.35em',
        transform: 'rotate(0)',
        x: 0,
        y: 10,
      },
    },
    tickSize: 0,
    ticks: 3,
    visible: true,
    width: 50,
  },
  y: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'LINEAR',
    style: {
      ...lineStyle,
      fill: 'none',
      stroke: '#666',
    },
    text: {
      style: {
        fill: '#666',
      },
    },
    tickSize: 20,
    ticks: 3,
    visible: true,
    width: 50,
  },
};

export const grid: IGrid = {
  x: {
    height: 1,
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'stroke-opacity': 0.7,
      'stroke-width': 1,
    },
    ticks: 5,
    visible: true,
  },
  y: {
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'stroke-opacity': 0.7,
      'stroke-width': 1,
    },
    ticks: 5,
    visible: true,
  },
};
