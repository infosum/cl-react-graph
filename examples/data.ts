
import { schemeCategory10, schemeDark2 } from 'd3-scale-chromatic';

export const grid = {
  x: {
    style: {
      'stroke': '#eeAA00',
      'stroke-opacity': 0.4,
    },
    ticks: 5,
  },
  y: {
    height: 20,
    style: {
      'stroke-opacity': 0.4,
    },
    ticks: 5,
  },
};

export const data = {
  bins: ['Data 1', 'Data 6', 'Data 3', 'Dat 4'],
  counts: [
    {
      data: [1, 2, 3, 4],
      label: 'DataSet 1',
    },
    {
      data: [13, 14, 15, 16],
      label: 'DataSet 2',
    },
  ],
  grid,
};

export const data2 = {
  bins: ['bin 1', 'bin 2', 'bin 3 with a long name', 'bin 4', 'bin 5', 'bin 6', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [1, 2, 3, 4, 5, 6, 7],
      label: 'Data 1',
    },
  ],
  title: 'Plot 1',
};

export const data3 = {
  bins: ['bin 1', 'bin 2', 'bin 3'],
  counts: [
    {
      borderColors: ['red'],
      data: [100, 50, 40],
      label: 'Data 1',
    },
    {
      borderColors: ['red'],
      data: [32, 1, 5, 0],
      label: 'Data 2',
    },
  ],
};

export const axis = {
  x: {
    height: 200,
    label: 'X Axis',
    margin: 200,
    text: {
      style: {
        'dy': '.35em',
        'text-anchor': 'start',
        'transform': 'rotate(90)',
        'x': 0,
        'y': 0,
      },
    },
    tickSize: 0,
  },
  y: {
    label: 'Y Axis!',
    style: {
      fill: 'none',
      stroke: '#eeAA00',
    },
    text: {
      style: {
        fill: '#eeAA00',
      },
    },
    tickSize: 20,
    ticks: 3,
    width: 50,
  },
};
