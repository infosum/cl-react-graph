import React, { FC } from 'react';

import {
  IAxes,
  IChartPointValue,
  IPointProps,
  IScatterPlotDataSet,
  ScatterPlot,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  IAxes,
  IChartPointValue,
  IScatterPlotDataSet,
  ScatterPlot,
  useWidth,
} from 'cl-react-graph;

const data: IScatterPlotDataSet<IChartPointValue> = {
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

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
    <ScatterPlot
      axis={axis}
      height={400}
      width={400}
      data={[data]}
    />
    </div>
  )
}
`;


const exampleCodeCustom = `import {
  IAxes,
  IChartPointValue,
  IPointProps,
  IScatterPlotDataSet,
  ScatterPlot,
  useWidth,
} from 'cl-react-graph;

const data: IScatterPlotDataSet<IChartPointValue> = {
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

const Fruit: FC<IPointProps> = ({
  x,
  y,
  z,
  cx,
  cy,
  children,
}) => <text x={cx} y={cy} fontSize={z * 4}>
    {(x ?? 0) > 2 ? "🍎" : "🍐"}
    {children}
  </text>
  
const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
    <ScatterPlot
      PointComponent={(props: IPointProps) => <Fruit {...props} />}
      axis={axis}
      height={400}
      width={400}
      data={[data]} />
    </div>
  )
};
`;
const data: IScatterPlotDataSet<IChartPointValue> = {
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
const Fruit: FC<IPointProps> = ({
  x,
  y,
  z,
  cx,
  cy,
  children,
}) => <text x={cx} y={cy} fontSize={z * 4}>
    {(x ?? 0) > 2 ? "🍎" : "🍐"}
    {children}
  </text>


const RadarExample = () => {
  const [ref, width] = useWidth('90%');
  const axis: IAxes = {
    x: {
      height: 20,
      width: width,
      scale: 'linear',
    },
    y: {
      width: 20,
      height: width,
      scale: 'linear',
    },
  }
  return (
    <Layout>
      <h2>Scatter Chart</h2>
      <TwoColumns>
        <div ref={ref}>
          <ScatterPlot
            axis={axis}
            height={400}
            width={width}
            data={[data]}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
      <TwoColumns>
        <div>
          <h3>With a custom point component</h3>
          <ScatterPlot
            axis={axis}
            PointComponent={(props: IPointProps) => <Fruit {...props} />}
            height={400}
            width={width}
            data={[data]} />
          </div>
        <JSXCode exampleCode={exampleCodeCustom} />
      </TwoColumns>
    </Layout>
  )
};

export default RadarExample;
