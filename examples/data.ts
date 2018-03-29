
import * as d3 from 'd3';

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
      borderColors: d3.schemeCategory20,
      colors: d3.schemeCategory20,
      data: [1, 2, 3, 4],
      label: 'Data 1',
    },
    {
      borderColors: d3.schemeCategory20,
      colors: d3.schemeCategory20b,
      data: [13, 2, 1, 5],
      label: 'Data 2',
    },
  ],
  grid,
};

export const data2 = {
  bins: ['bin 1', 'bin 2', 'bin 3', 'bin 4', 'bin 5', 'bin 9', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [999, 9000, 15000, 25000, 15000, 9000, 888],
      label: 'Data 1',
    },
  ],
};

export const data3 = {
  bins: ['bin 1', 'bin 2', 'bin 3'],
  counts: [
    {
      borderColors: ['red'],
      data: [100, 50, 40],
      label: 'Data 1',
    },
    // {
    //   borderColors: ['red'],
    //   data: [32, 1, 5, 0],
    //   label: 'Data 2',
    // },
  ],
};
