import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Histogram, LineChart, ScatterPlot} from '../src';

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
console.log(d3.schemeCategory20);
const data = {
     bins: ['1', '2', '3', '4'],
     counts: [
       {
         borderColors: d3.schemeCategory20,
         colors: d3.schemeCategory20,
         data: [1, 2, 3, 4, 5],
         label: 'Data 1',
       },
       {
         borderColors: d3.schemeCategory20,
         colors: d3.schemeCategory20b,
         data: [3, 2, 1, 5],
         label: 'Data 2',
       },
     ],
     grid,
   };

const data2 = {
  bins: ['1', '10', '25', '50', '75', '90', '99'],
  counts: [
    {
      borderColors: ['red'],
      data: [999, 9000, 15000, 25000, 15000, 9000, 888],
      label: 'Data 1',
    },
  ],
};

const points = [
  {
    data: [
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 4},
    ],
    label: 'test data',
  },
  {
    data: [
      {x: 2, y: 1},
      {x: 3, y: 2},
      {x: 4, y: 3},
      {x: 6, y: 4},
    ],
    label: 'test data',
    line: {
      curveType: d3.curveStepAfter,
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
  y: {
    ticks: 3,
    width: 50,
  },
  };
const element = <div>
  <div>
  <Histogram data={data} grid={grid} width={700} height={150} />
  <Histogram data={data2} bar={{margin: 4}} width={700} height={150} axis={axis} />
  </div>
  <div>
   <LineChart data={points} width={300} />
   </div>
   <div>
    <ScatterPlot data={scatter} width={300} height={300} />
  </div>
  </div>;

ReactDOM.render(
    element,
    document.getElementById('root'),
  );
