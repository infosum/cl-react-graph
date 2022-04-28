import { curveCatmullRom } from 'd3-shape';
import React from 'react';

import {
  Base,
  IAxes,
  ILineProps,
  Line,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  Base,
  IAxes,
  ILineProps,
  useWidth,
  Line,
} from 'cl-react-graph;
import { curveCatmullRom } from 'd3-shape';

const axis: IAxes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'time',
    width: width,
    height: 20,
  },
  y: {
    label: 'Count',
    numberFormat: 'd',
    scale: 'log',
    height: 200,
    width: 20,
  },
};

const line: ILineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: theme.brightBlue800,
    show: false,
  },
  show: true,
  stroke: theme.brightBlue800,
  strokeDashArray: '0',
  strokeDashOffset: 0,
}

const now = new Date();
const xs = new Array(100).fill('')
  .map((_, i) => new Date(new Date().setDate(now.getDate() + i)));
const data = xs.map((v, i) => ({
  x: v,
  y: i * Math.random() * 1000,
}));

const MyComponent = () => {
  const [ref, width] = useWidth('90%');

  return (
    <div ref={ref}>
      <Base
        width={width}
        height={200}
        title="Line example">
        <Line
          axis={axis}
          label="brushed data"
          line={line}
          width={width}
          left={0}
          animate={false}
          height={200}
          data={data} />
      </Base>
    </div>
  )
};
`;



const LineExample = () => {
  const [ref, width] = useWidth('90%');
  const axis: IAxes = {
    x: {
      dateFormat: '%d-%b-%y',
      scale: 'time',
      width: width,
      height: 20,
    },
    y: {
      label: 'Count',
      numberFormat: 'd',
      scale: 'log',
      height: 200,
      width: 20,
    },
  };

  const line: ILineProps = {
    curveType: curveCatmullRom,
    fill: {
      fill: theme.brightBlue800,
      show: false,
    },
    show: true,
    stroke: theme.brightBlue800,
    strokeDashArray: '0',
    strokeDashOffset: 0,
  }

  const now = new Date();
  const xs = new Array(100).fill('')
    .map((_, i) => new Date(new Date().setDate(now.getDate() + i)));
  const data = xs.map((v, i) => ({
    x: v,
    y: i * Math.random() * 1000,
  }));

  return (
    <Layout>
      <h2>Line Chart</h2>


      <TwoColumns>
        <div ref={ref}>
          <Base
            width={width}
            height={200}
            title="Line example"
          >
            <Line
              axis={axis}
              label="brushed data"
              line={line}
              width={width}
              left={0}
              animate={false}
              height={200}
              data={data} />

          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
};

export default LineExample;
