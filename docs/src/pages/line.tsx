// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import {
  curveCatmullRom,
  curveStepAfter,
} from 'd3-shape';
import { Link } from 'gatsby';
import React, {
  FC,
  useState,
} from 'react';
import ReactDataSheet, { Cell } from 'react-datasheet';

import {
  IAxes,
  ILineChartDataSet,
  LineChart,
} from '../../../src';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  axis,
  grid,
} from './data';

const points: ILineChartDataSet[] = [
  {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 12 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ],
    label: 'test data',
    line: {
      curveType: curveCatmullRom,
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
  },
];

const points2: ILineChartDataSet[] = [
  {
    data: [
      { x: 1, y: 10 },
      { x: 2, y: 15 },
      { x: 3, y: 4 },
      { x: 4, y: 7 },
    ],
    label: 'test data',
    line: {
      curveType: curveCatmullRom,
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

const timeData = [
  {
    data: [
      { x: new Date('1-May-12'), y: 1 },
      { x: new Date('30-Apr-15'), y: 12 },
      { x: new Date('27-Apr-17'), y: 3 },
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
      { x: new Date('1-May-12'), y: 10 },
      { x: new Date('30-Apr-15'), y: 12 },
      { x: new Date('27-Apr-17'), y: 23 },
      { x: new Date('26-Apr-19'), y: 14 },
    ],
    label: 'test data 2',
  }];

const axisWithTime: IAxes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'TIME',
  },
  y: {
    numberFormat: '.2',
    scale: 'LOG',
  },
};

// const toggleData = [points, points2];

export interface IGridElement extends ReactDataSheet.Cell<IGridElement, number> {
  value: number | null | string;
}

const LineExample: FC<{}> = () => {
  const [dataPoints, setPoints] = useState([
    { x: 1, y: 10 },
    { x: 2, y: 15 },
    { x: 3, y: 4 },
    { x: 4, y: 7 },
  ]);

  const initialData: Cell[][] = dataPoints.map((point) => {
    return [{ value: Number(point.x) }, { value: Number(point.y) }];
  });

  const [data, setGrid] = useState(initialData);

  points[0].data = dataPoints;
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <h1>Line Chart</h1>
      <Link to="/">Go back to the homepage</Link>
      <div>
        <LineChart
          axis={axis}
          grid={grid}
          data={points}
          width={300} />

        {/* <LineChart
          data={timeData}
          axis={axisWithTime}
          width="100%" />
        <input onBlur={(e) => {
          e.preventDefault();
          this.setTimeData(e.target.value, 0);
        }}
          defaultValue={timeData[0].data[0].x.toString()} /> */}
      </div>
      <ReactDataSheet data={data}
        valueRenderer={(cell) => cell.value}
        sheetRenderer={(props) => (
          <table className={props.className + ' my-awesome-extra-class'}>
            <thead>
              <tr>
                {['x', 'y'].map((col) => (<th className="action-cell">{col}</th>))}
              </tr>
            </thead>
            <tbody>
              {props.children}
            </tbody>
          </table>
        )}
        onCellsChanged={(changes) => {
          const newData = data.map((row) => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            newData[row][col] = { ...newData[row][col], value };
          });
          setGrid(newData);
          const pts = newData.map((row) => ({ x: Number(row[0].value), y: Number(row[1].value) }));
          setPoints(pts);
        }} />
    </Layout>
  );
};

export default LineExample;
