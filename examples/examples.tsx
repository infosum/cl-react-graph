import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HorizontalHistogram, Legend, LineChart, PieChart, ScatterPlot } from '../src';
import filterRange from '../src/colors/filterRange';
import { axis, data, data2, data3, grid } from './data';
import Histogram from './Histogram';
import Pie from './Pie';

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

const theme = filterRange(['rgba(255, 113, 1, 0.5)', '#fff6ef', 'rgba(0, 169, 123, 0.5)', '#f6fffd',
  '#D7263D', 'rgba(215, 38, 61, 0.05)',
  '#0f2629', '#ededed', 'rgba(86, 180, 191, 0.5)', '#f5fbfb', '#000000', '#0f2629', '#D7263D', '#FBD7D9',
  '#ffebec', '#963540', '#22545a', '#56b4bf', '#56b4bf', '#56b4bf', '#FF7101', '#449098', '#77c3cb', '#d4eef8',
  '#ff7101', '#FF7101', '#cc5a00', '#ff8d33', '#fef9e5', '#7d5d2e', '#00a97b', '#008762', '#33ba95', '#dbf1d6',
  '#227839', '#0f5e7b', '#d4eef8', '#0f5e7b', '#F9C80E', ' 63.75rem', '#007656', '#c5e5e9', '#f9c80e', '#a9a9a9',
  '#dbdbdb', '#cccccc', '#e6e6e6', '#56b4bf', '#449098', '#77c3cb', '#22545a', '#ff7101', '#cdcdcd', '#ffffff',
  'd7263d', '#00a97b', '#888888', '#e6e6e6', '#f2f2f2', '#f4f4f4']);

const App: React.SFC<{}> = (): JSX.Element => <div style={{ padding: '20px' }}>
  <Pie theme={theme} />
  <Histogram theme={theme} />
  {/* <div>
    <HorizontalHistogram data={data2} width={500} height={400} margin={{
      left: 30,
      top: 30,
    }} />
  </div> */}

  {/* <div>
    <LineChart axis={axis} grid={grid} data={points} width={300} />
  </div> */}
  {/* <div>
    <ScatterPlot data={scatter} width={300} height={300} />
  </div> */}
</div>;

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
