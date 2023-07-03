import {
  curveCatmullRom,
  curveStepBefore,
} from 'd3-shape';

import {
  BarChartData,
  LineChartDataSet,
} from '../src';
import { HistogramData } from '../src/Histogram';
import { ChartPointValue } from '../src/LineChart';
import { RadarChartData } from '../src/RadarChart';
import { ScatterPlotDataSet } from '../src/ScatterPlot';
import { TornadoData } from '../src/TornadoChart';

const now = new Date();
const xs = new Array(100).fill('').map((_, i) => new Date(new Date().setDate(now.getDate() + i)))
const dateValues = xs.map((v, i) => ({
  x: v, y: i * 1000,
}));

export const lineChartData: LineChartDataSet<any>[] = [
  {
    "label": "cdd7c30f-4d9b-433c-a5d4-12bb39df89c6 usage",
    "line": {
      "fill": {
        "fill": "rgba(11, 85, 167, 0.7)",
        "show": true
      },
      "show": true,
      "stroke": "#000",
      "strokeDashArray": "0",
      "strokeDashOffset": 0,
      curveType: curveStepBefore,
    },
    "point": {
      "fill": "#000",
      "radius": 2,
      "show": true,
      "stroke": "#000"
    },
    "data": dateValues
  }
]

export const histogramData: HistogramData = {
  bins: [[0, 50], [50, 150], [150, 300]],
  counts: [
    {
      data: [500, 2000, 1500],
      label: 'Baseline',
    },
  ]
}

export const barChartData: BarChartData = {
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

export const data3: LineChartDataSet<any>[] = [{
  'label': 'rob Allocation',
  'line': {
    'curveType': curveCatmullRom,
    fill: { fill: 'rgba(11, 85, 167, 0.2)', show: true },
    show: true,
    stroke: 'rgb(11, 85, 167)',
    'strokeDashArray': '0',
    'strokeDashOffset': 0
  },
  'point':
    { fill: '#000', radius: 4, show: true, stroke: '' },
  'data': dateValues,
}, {
  'label': 'rob\'',
  'line': {
    'curveType': curveCatmullRom,
    fill: { fill: 'rgba(11, 85, 167, 0.7)', show: true },
    show: true, stroke: '#000', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { fill: '', radius: 0, show: false, stroke: '' },
  'data': [
    { x: new Date('2019-08-20T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-21T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-22T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-23T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-24T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-25T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-26T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-27T00:00:00.000Z'), y: 0 }]
},
{
  'label': 'Their Allocation',
  'line': {
    'curveType': curveCatmullRom,
    fill: { fill: 'rgba(0, 169, 123, 0.2)', show: true },
    show: true, stroke: 'rgb(0, 169, 123)', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { fill: '', radius: 0, show: false, stroke: '' }, 'data': [
    { x: new Date('2019-08-20T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-21T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-22T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-23T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-24T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-25T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-26T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-27T00:00:00.000Z'), y: 0 }]
}, {
  'label': 'Theirs',
  'line': {
    'curveType': curveCatmullRom,
    fill: { fill: 'rgba(0, 169, 123, 0.7)', show: true },
    show: true, stroke: '#000', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { fill: '', radius: 0, show: false, stroke: '' }, 'data': [
    { x: new Date('2019-08-20T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-21T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-22T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-23T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-24T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-25T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-26T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-27T00:00:00.000Z'), y: 0 }]
}];

export const tornadoData: TornadoData = {
  bins: ['16-18', '18-25', '25-35', '35-50', '50-65', '65-∞'],
  counts: [
    {
      label: 'Background',
      data: [
        [200, 2600, 5100, 9700, 8400, 6700], // Male bin 1, Male bin 2,
        [2002, 2100, 4700, 8700, 4900, 1400], // Female bin 1, Female bin 2,
      ],
    },
    {
      label: 'Foreground',
      data: [
        [100, 260, 510, 970, 840, 670], // Male bin 1, Male bin 2,
        [1000, 5500, 470, 870, 490, 140], // Female bin 1, Female bin 2,
      ],
    },

  ],
}
export const scatterData: ScatterPlotDataSet<ChartPointValue> = {
  label: 'Scatter data',
  point: { fill: '#000', radius: 4, show: true, stroke: '' },
  data: [
    { x: 0, y: 1, z: 5 },
    { x: 2, y: 1, z: 5 },
    { x: 3, y: 3, z: 10 },
    { x: 4, y: 4, z: 5 },
    { x: 5, y: 1, z: 15 },
    { x: 6, y: 6, z: 5 },
    { x: 7, y: 7, z: 15 },
  ]
}

export const radarData: RadarChartData[] = [{
  label: 'Germany',
  axes: [
    { axis: "strength", value: 13 },
    { axis: "intelligence", value: 6 },
    { axis: "charisma", value: 5 },
    { axis: "dexterity", value: 9 },
    { axis: "luck", value: 2 }
  ]
},
{
  label: 'Argentina',
  axes: [
    { axis: "strength", value: 6 },
    { axis: "intelligence", value: 7 },
    { axis: "charisma", value: 10 },
    { axis: "dexterity", value: 13 },
    { axis: "luck", value: 9 }
  ]
}];
