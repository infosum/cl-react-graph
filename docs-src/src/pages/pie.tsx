import React from 'react';

import {
  PieChart,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  PieChart,
  useWidth,
} from 'cl-react-graph;

const data = {
  bins: [
    'bin 1',
    'bin 2',
    'bin 3 with a long name',
    'bin 4',
    'bin 5',
    'bin 6',
    'bin 7'
  ],
  counts: [
    {
      data: [1, 2, 3, 4, 5, 6, 7],
    },
  ],
};

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
      <PieChart
        width={400}
        height={400}
        labels={{
          display: true,
        }}
        data={data} />
    </div>
  )
};
`;

const data = {
  bins: [
    'bin 1',
    'bin 2',
    'bin 3 with a long name',
    'bin 4',
    'bin 5',
    'bin 6',
    'bin 7'
  ],
  counts: [
    {
      data: [1, 2, 3, 4, 5, 6, 7],
      label: 'Set 1',
    },
    {
      data: [4, 32, 23, 14, 2, 1, 22],
      label: 'Set 2',
    },
  ],
};

const PieChartExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Pie Chart</h2>

      <TwoColumns>
        <div ref={ref}>
          <PieChart
            width={400}
            height={400}
            donutWidth={30}
            data={data}
            labelFormat={(item) => item.percentage + '%'}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
};

export default PieChartExample;
