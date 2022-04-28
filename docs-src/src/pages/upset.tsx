import React from 'react';

import {
  IUpsetChartProps,
  UpsetChart,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  IUpsetChartProps,
  UpsetChart,
  useWidth,
} from 'cl-react-graph;

const data: IUpsetChartProps['data'] = [
  { keys: ['Email'], value: 10 },
  { keys: ['Email', 'MAID'], value: 14 },
  { keys: ['Email', 'MAID', 'Postcode'], value: 1 },
  { keys: ['MAID'], value: 10 },
  { keys: ['Email', 'Postcode'], value: 14 },
  { keys: ['Postcode'], value: 12 },
];


const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
    <UpsetChart
    title="example upset chart"
    description="more info for accessibility"
    width={width}
    height={400}
    distribution={{
      colorScheme: ['hsla(140, 60%, 88%, 1)],
      fill: {
        active: 'hsla(6, 90%, 70%, 1)',
        inactive: 'hsla(208, 32%, 91%, 1)',
      },
    }}
    setSize={{
      dimensions: { chartWidth: width / 6, axisWidth: 120, height: 150 },
      colorScheme: ['rgb(154, 218, 172)'],
    }}
    data={data} />
    </div>
  )
};
`;
const data: IUpsetChartProps['data'] = [
  { keys: ['Email'], value: 10 },
  { keys: ['Email', 'MAID'], value: 14 },
  { keys: ['Email', 'MAID', 'Postcode'], value: 1 },
  { keys: ['MAID'], value: 10 },
  { keys: ['Email', 'Postcode'], value: 14 },
  { keys: ['Postcode'], value: 12 },
];

const UpsetChartExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Upset Chart</h2>

      <TwoColumns>
        <div ref={ref}>
          <UpsetChart
            title="example upset chart"
            description="more info for accessibility"
            width={width}
            height={400}
            distribution={{
              colorScheme: [theme.green900],
              fill: {
                active: theme.red700,
                inactive: theme.grey600,
              },
            }}
            setSize={{
              dimensions: { chartWidth: width / 6, axisWidth: 120, height: 150 },
              colorScheme: ['rgb(154, 218, 172)'],
            }}
            data={data} />
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
};

export default UpsetChartExample;
