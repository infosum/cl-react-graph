 import ReactDOM from 'react-dom';
 import * as d3 from 'd3';
 import {Histogram, LineChart, ScatterPlot} from '../src';

 const data = {
     bins: [1, 2, 3, 4],
     counts: [
       {
         label: 'Data 1',
         data: [1, 2, 3, 4]
       },
       {
         label: 'Data 2',
         data: [3, 2, 1, 5]
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
   element = <div>
  <div>
  <Histogram data={data} width={'100%'} />
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
