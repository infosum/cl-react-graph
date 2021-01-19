import { curveCatmullRom } from 'd3-shape';
import { timeFormat } from 'd3-time-format';

import { ILineChartDataSet } from '../src';

const dateFormat = '%d-%b-%y';
const now = new Date();
const xs = new Array(100).fill('').map((_, i) => new Date(new Date().setDate(now.getDate() + i)))
const dateValues = xs.map((v) => ({
  x: v, y: Math.random() * 1000,
}));

export const data3: ILineChartDataSet<any>[] = [{
  'label': 'rob Allocation',
  'line': {
    'curveType': curveCatmullRom,
    'fill': { 'fill': 'rgba(11, 85, 167, 0.2)', 'show': true },
    'show': true,
    'stroke': 'rgb(11, 85, 167)',
    'strokeDashArray': '0',
    'strokeDashOffset': 0
  },
  'point':
    { 'fill': '#000', 'radius': 4, 'show': true, 'stroke': '' },
  'data': dateValues,
}, {
  'label': 'rob\'',
  'line': {
    'curveType': curveCatmullRom,
    'fill': { 'fill': 'rgba(11, 85, 167, 0.7)', 'show': true },
    'show': true, 'stroke': '#000', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { 'fill': '', 'radius': 0, 'show': false, 'stroke': '' },
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
    'fill': { 'fill': 'rgba(0, 169, 123, 0.2)', 'show': true },
    'show': true, 'stroke': 'rgb(0, 169, 123)', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { 'fill': '', 'radius': 0, 'show': false, 'stroke': '' }, 'data': [
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
    'fill': { 'fill': 'rgba(0, 169, 123, 0.7)', 'show': true },
    'show': true, 'stroke': '#000', 'strokeDashArray': '0', 'strokeDashOffset': 0
  },
  'point': { 'fill': '', 'radius': 0, 'show': false, 'stroke': '' }, 'data': [
    { x: new Date('2019-08-20T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-21T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-22T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-23T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-24T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-25T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-26T00:00:00.000Z'), y: 0 },
    { x: new Date('2019-08-27T00:00:00.000Z'), y: 0 }]
}];
