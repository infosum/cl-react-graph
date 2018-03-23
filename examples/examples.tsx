import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Histogram, HorizontalHistogram, LineChart, PieChart, ScatterPlot } from '../src';

const grid = {
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

const data = {
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

const data2 = {
  bins: ['bin 1', 'bin 2', 'bin 3', 'bin 4', 'bin 5', 'bin 9', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [999, 9000, 15000, 25000, 15000, 9000, 888],
      label: 'Data 1',
    },
  ],
};

const data3 = {
  bins: ['bin 1', 'bin 2', 'bin 3'],
  counts: [
    {
      borderColors: ['red'],
      data: [100, 50, 40],
      label: 'Data 1',
    },

  ],
};

const points = [
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
      curveType: d3.curveStepAfter,
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

const scatter = [

];
const axis = {
  x: {
    label: 'X Axis',
    text: {
      style: {
        'dy': '.35em',
        'text-anchor': 'start',
        'transform': 'rotate(45)',
        'x': 4,
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

const legend = {
  display: true,
  fontSize: '10px',
  rectSize: 12,
  spacing: 4,
};

const labels = {
  display: true,
};

const App: React.SFC<{}> = (): JSX.Element => <div style={{ padding: '20px' }}>
  <h3>Pie Chart</h3>
  {/* <PieChart
    width={300}
    height={300}
    data={data} /> */}

  <h4>Donut</h4>
  <PieChart width={200}
    height={200}
    donutWidth={10}
    data={data3}
    legend={legend}
    labels={labels} />
  <div>
    <HorizontalHistogram data={data2} width={500} height={400} margin={{
      left: 30,
      top: 30,
    }} />
    <Histogram data={data2} width={400} height={400} margin={{
      left: 30,
      top: 30,
    }}
      domain={{ min: 0, max: 50000 }} />
  </div>
  <div>
    <Histogram data={data} grid={grid} width={700} height={150} tipContentFn={tipContentFn} />
    <Histogram data={data2} bar={{ margin: 4 }} width={700} height={150} axis={axis} />
  </div>
  <div>
    <LineChart axis={axis} grid={grid} data={points} width={300} />
  </div>
  {/* <div>
    <ScatterPlot data={scatter} width={300} height={300} />
  </div> */}
</div>;
const tipContentFn = (bins: string[], i, d) =>
  bins[i] + '<br />HI THere ' + d.toFixed(2);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
