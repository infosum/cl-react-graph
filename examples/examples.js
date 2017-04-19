/* @flow */
 import ReactDOM from 'react-dom';
 import * as d3 from 'd3';
 import {Histogram, LineChart, ScatterPlot} from '../src';

 const data = {
     bins: [1, 2, 3, 4],
     counts: [
       {
         label: 'Data 1',
         data: [1, 2, 3, 4],
         colors: d3.schemeCategory20,
         borderColors: d3.schemeCategory20,
       },
       {
         label: 'Data 2',
         data: [3, 2, 1, 5],
         colors: d3.schemeCategory20b,
         borderColors: d3.schemeCategory20,
       }
     ]
   },

   data2 = {
     bins: ['1', '10', '25', '50', '75', '90', '99'],
     counts: [
       {
         label: 'Data 1',
         data: [999, 9000, 15000, 25000, 15000, 9000, 888],
         borderColors: ['red'],
       }
     ]
   },

   points = [
     {
       label: 'test data',
       data: [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 4}
       ]
     },
     {
       label: 'test data',
       point: {
         show: true,
         fill: 'black',
         radius: 10,
         stroke: 'red'
       },
       line: {
         curveType: d3.curveStepAfter,
         show: true,
         strokeDashArray: '10 5',
         strokeDashOffset: 3,
         stroke: 'orange'
       },

       data: [
        {x: 2, y: 1},
        {x: 3, y: 2},
        {x: 4, y: 3},
        {x: 6, y: 4}
       ]
     }],

   scatter = [

   ],
   axis = {
    y: {
      ticks: 3,
      width: 50
    }
   },
   element = <div>
  <div>
  <Histogram data={data} width={700} height={150} />
  <Histogram data={data2} width={700} height={150} axis={axis} />
  </div>
  <div>
   <LineChart data={points} width={300} />
   </div>
   <div>
    <ScatterPlot data={scatter} />
  </div>
  </div>;

 ReactDOM.render(
    element,
    document.getElementById('root')
  );
