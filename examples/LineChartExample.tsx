import { curveStepAfter } from 'd3-shape';
import * as React from 'react';
import { LineChart } from '../src';
import { axis, grid } from './data';

const points: ILineChartDataSet[] = [
  {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ],
    label: 'test data',
  },
  {
    data: [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 3 },
      { x: 6, y: 4 },
    ],
    label: 'test data',
    line: {
      curveType: curveStepAfter,
      fill: {
        fill: 'rgba(10, 10, 10, 0.2)',
        show: true,
      },
      show: true,
      stroke: 'orange',
      strokeDashArray: '10 5',
      strokeDashOffset: 3,
    },
    point: {
      fill: 'black',
      radius: 10,
      show: true,
      stroke: 'red',
    },
  }];

const timeData: ILineChartDataSet[] = [
  {
    data: [
      { x: '1-May-12', y: 1 },
      { x: '30-Apr-15', y: 2 },
      { x: '27-Apr-17', y: 3 },
      { x: new Date(), y: 4 },
    ],
    label: 'test data',
  },
  {
    data: [
      { x: '1-May-12', y: 10 },
      { x: '30-Apr-15', y: 12 },
      { x: '27-Apr-17', y: 23 },
      { x: '26-Apr-19', y: 14 },
    ],
    label: 'test data 2',
  }];

const axisWithTime: IAxes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'TIME',
  },
  y: {},
};

const LineChartExample = () => {
  return (
    <div>
      <h3>Line Chart</h3>
      <LineChart
        axis={axis}
        grid={grid}
        data={points}
        width={300} />
      <LineChart
        data={timeData}
        axis={axisWithTime}
        width={300} />
    </div>
  );
};

export default LineChartExample;
