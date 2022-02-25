import React from 'react';

import {
  Base,
  JoyPlot,
  PieChart,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  Base, 
  Grid,
} from 'cl-react-graph;

const data = {
  bins: ['bin 1', 'bin 2', 'bin 3 with a long name', 'bin 4', 'bin 5', 'bin 6', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [1, 2, 3, 4, 5, 6, 7],
      label: 'Data 1',
    },
  ],
  title: 'Plot 1',
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
        data={data}
      />
    </div>
  )
}
`;

const data = {
  bins: ['bin 1', 'bin 2', 'bin 3 with a long name', 'bin 4', 'bin 5', 'bin 6', 'bin 7'],
  counts: [
    {
      borderColors: ['red'],
      data: [1, 2, 3, 4, 5, 6, 7],
      label: 'Data 1',
    },
  ],
  title: 'Plot 1',
};

const JoyPlotExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Pie Chart</h2>

      <TwoColumns>
        <div ref={ref}>
          <PieChart
            width={400}
            height={400}
            labels={{
              display: true,
            }}
            data={data}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
}

export default JoyPlotExample;
