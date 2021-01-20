import {
  IAxes,
  IBarChartData,
} from '../../src';
import filterRange from '../../src/colors/filterRange';
import { ELabelOrientation } from '../../src/components/YAxis';
import {
  IGrid,
  IHistogramData,
} from '../../src/Histogram';
import { lineStyle } from '../../src/utils/defaults';
import { DeepPartial } from '../../src/utils/types';

export const grid: IGrid = {
  x: {
    height: 100,
    visible: true,
    style: {
      ...lineStyle,
      'stroke': '#ccc',
      'stroke-opacity': 0.4,
    },
    ticks: 5,
  },
  y: {
    visible: true,
    style: {
      ...lineStyle,
      'stroke': '#ccc',
      'stroke-opacity': 0.4,
    },
    ticks: 6,
  },
};

export const smallData: IBarChartData = {
  bins: ['Female long label test', 'Male', 'Other'],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [60000, 34230, 10000],
      label: 'Filtered',
    },
  ]
}

export const smallData2: IBarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [89200, 12400, 33300],
      label: 'Baseline',
    },
    {
      data: [70000, 24230, 40000],
      label: 'Filtered',
    },
  ]
}

export const smallDataContinuous: IHistogramData = {
  bins: [[0, 50], [50, 150], [150, 300]],
  counts: [
    {
      data: [500, 2000, 1500],
      label: 'Baseline',
    },
  ]
}

export const data: IBarChartData = {
  bins: ['Female', 'Male', 'Other', 'sdfdfg', 'dagdsg', 'sfsd', 'ds34fsdf', 'dfsfsd', 'sdfs34dfs', 'ghf34hfg', 'fd33gag', 'jg343hj', 'a343wes', 'ye343ye', 'fd343gjs', 'sdfd343fg', '34', 'sfsd', '433', '45245', '745'],
  counts: [
    {
      data: [58483, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [54932, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000],
      label: 'Filtered',
    },
  ]
}


export const analyticsAxis: DeepPartial<IAxes> = {
  x: {
    scale: 'linear',
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
  y: {
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
};

export const verticalXAxis: DeepPartial<IAxes> = {
  x: {
    scale: 'linear',
  },
  y: {
  },
}

export const axis: DeepPartial<IAxes> = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'time',
  },
  y: {
  },
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
      colors: ['red'],
      data: [100, 50, 40],
      label: 'Data 1',
    },
    {
      borderColors: ['red'],
      colors: ['blue'],
      data: [32, 1, 5, 0],
      label: 'Data 2',
    },
  ],
};

export const theme = filterRange(['rgba(255, 113, 1, 0.5)', '#fff6ef', 'rgba(0, 169, 123, 0.5)', '#f6fffd',
  '#D7263D', 'rgba(215, 38, 61, 0.05)',
  '#0f2629', '#ededed', 'rgba(86, 180, 191, 0.5)', '#f5fbfb', '#000000', '#0f2629', '#D7263D', '#FBD7D9',
  '#ffebec', '#963540', '#22545a', '#56b4bf', '#56b4bf', '#56b4bf', '#FF7101', '#449098', '#77c3cb', '#d4eef8',
  '#ff7101', '#FF7101', '#cc5a00', '#ff8d33', '#fef9e5', '#7d5d2e', '#00a97b', '#008762', '#33ba95', '#dbf1d6',
  '#227839', '#0f5e7b', '#d4eef8', '#0f5e7b', '#F9C80E', '#007656', '#c5e5e9', '#f9c80e', '#a9a9a9',
  '#dbdbdb', '#cccccc', '#e6e6e6', '#56b4bf', '#449098', '#77c3cb', '#22545a', '#ff7101', '#cdcdcd', '#ffffff',
  '#d7263d', '#00a97b', '#888888', '#e6e6e6', '#f2f2f2', '#f4f4f4']);
