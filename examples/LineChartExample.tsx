import { curveStepAfter } from 'd3-shape';
import * as React from 'react';
import { LineChart } from '../src';
import { IAxes, ILineChartDataSet } from '../src/index';
import { axis, grid } from './data';

const points: ILineChartDataSet[] = [
  {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 12 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ],
    label: 'test data',
  },
  {
    data: [
      { x: 1, y: 10 },
      { x: 3, y: 12 },
      { x: 5, y: 23 },
      { x: 9, y: 14 },
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

const axisWithTime: IAxes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'TIME',
  },
  y: {},
};

interface IState {
  timeData: ILineChartDataSet[];
}

class LineChartExample extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.setTimeData = this.setTimeData.bind(this);
    this.state = {
      timeData: [
        {
          data: [
            { x: '1-May-12', y: 1 },
            { x: '30-Apr-15', y: 12 },
            { x: '27-Apr-17', y: 3 },
            { x: new Date(), y: 4 },
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
        },
        {
          data: [
            { x: '1-May-12', y: 10 },
            { x: '30-Apr-15', y: 12 },
            { x: '27-Apr-17', y: 23 },
            { x: '26-Apr-19', y: 14 },
          ],
          label: 'test data 2',
        }],
    };
  }

  private setTimeData(v, i) {
    const s = [...this.state.timeData];
    s[0].data[i].x = v;
    this.setState({
      timeData: s,
    });
  }
  public render() {
    console.log('render line chart example');
    return (
      <div>
        <h3>Line Chart</h3>
        <LineChart
          axis={axis}
          grid={grid}
          data={points}
          width={300} />
        <LineChart
          data={this.state.timeData}
          axis={axisWithTime}
          width="100%" />
        <input onBlur={(e) => {
          e.preventDefault();
          this.setTimeData(e.target.value, 0);
        }}
          defaultValue={this.state.timeData[0].data[0].x.toString()} />
      </div>
    );
  }
}

export default LineChartExample;
