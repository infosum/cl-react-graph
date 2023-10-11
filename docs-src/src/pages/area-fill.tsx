import { curveCatmullRom } from 'd3-shape';
import React from 'react';

import {
  AreaFill,
  Base,
  defaultAxis as axis,
  LineProps,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  AreaFill,
  Base,
  defaultAxis as axis,
  LineProps,
  useWidth,
  Axis,
} from 'cl-react-graph;
import { curveCatmullRom } from 'd3-shape';

const axis: Axes = {
  x: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'linear',
    tickSize: 0,
    width: 50,
  },
  y: {
    dateFormat: '',
    height: 20,
    label: '',
    margin: 20,
    numberFormat: '',
    scale: 'linear',
    tickSize: 20,
    width: 50,
  },
};

const data = [
  { x: 0, y: 0 },
  { x: 10, y: 20 },
  { x: 20, y: 10 },
  { x: 30, y: 60 },
]

const line: LineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: 'hsla(208, 69%, 66%, 1)',
    show: true,
  },
  show: true,
  stroke: '#000',
  strokeDashArray: '0',
  strokeDashOffset: 0,
}

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
      <Base
        width={width}
        height={220}>
        <AreaFill
          axis={axis}
          label="Area fill"
          width={width}
          left={0}
          height={200}
          line={line}
          data={data} />
      </Base>
    </div>
  )
};
`;

const gradientFill = `<AreaFill
  axis={axis}
  label="Area fill"
  width={width}
  left={0}
  height={200}
  line={{
    ...line,
    fill: {
     fill: {
       gradientTransform: 'rotate(90)',
       stops: [
         { offset: "5%", stopColor:  theme.brightBlue700 },
         { offset: "95%", stopColor:  theme.brightBlue300, stopOpacity: 0 },
       ],
      },
      show: true,
    }
  }}
  data={data} />
`;

const data = [
  { x: 0, y: 0 },
  { x: 10, y: 20 },
  { x: 20, y: 10 },
  { x: 30, y: 60 },
];
const line: LineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: theme.brightBlue800,
    show: true,
  },
  show: true,
  stroke: "#000",
  strokeDashArray: "0",
  strokeDashOffset: 0,
};

const AreaFillExample = () => {
  const [ref, width] = useWidth("90%");
  return (
    <Layout>
      <h2>Area Fill</h2>
      <TwoColumns>
        <div ref={ref}>
          <Base width={width} height={220}>
            <AreaFill
              axis={axis}
              label="Area fill"
              width={width}
              left={0}
              height={200}
              line={line}
              data={data}
            />
          </Base>

          <h3>Gradients</h3>
          <p>You can supply a gradient to the line fill props</p>
          <Base width={width} height={220}>
            <AreaFill
              axis={axis}
              label="Area fill"
              width={width}
              left={0}
              height={200}
              line={{
                ...line,
                fill: {
                  fill: {
                    gradientTransform: "rotate(90)",
                    stops: [
                      { offset: "5%", stopColor: theme.brightBlue700 },
                      {
                        offset: "95%",
                        stopColor: theme.brightBlue300,
                        stopOpacity: 0,
                      },
                    ],
                  },
                  show: true,
                },
              }}
              data={data}
            />
          </Base>
          <JSXCode exampleCode={gradientFill} />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default AreaFillExample;
