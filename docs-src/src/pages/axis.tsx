import React from 'react';

import {
  BarChart,
  BarChartData,
  Base,
  ELabelOrientation,
  useWidth,
  XAxis,
  YAxis,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const data: BarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: 'Baseline',
    },

  ]
}

const exampleCode = `import {
  BarChart, 
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <Base
    width={220}
    height={50}>
      <XAxis
        width={200}
        height={20}
        top={0}
        left={20}
        labelOrientation={ELabelOrientation.HORIZONTAL}
        scale="band"
        values={['Female', 'Male', 'Other']} />
    </Base>
  )
};
`;

const exampleYAxisCode = `import {
  BarChart, 
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <Base
      width={220}
      height={50}>
      <YAxis
        width={20}
        height={200}
        top={0}
        left={20}
        labelOrientation={ELabelOrientation.HORIZONTAL}
        scale="band"
        values={data.bins} />
    </Base>
  )
};
`;

const AxisExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Axis</h2>

      <p>An axis must be placed inside a Base component. Axis can be either XAxis or YAxis</p>
      <h3>XAxis</h3>
      <TwoColumns>
        <Base
          width={220}
          height={50}>
          <XAxis
            width={200}
            height={20}
            top={0}
            left={20}
            labelOrientation={ELabelOrientation.HORIZONTAL}
            scale="band"
            values={data.bins}
          />
        </Base>

        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>

      <h3>YAxis</h3>
      <TwoColumns>
        <Base
          width={220}
          height={50}>
          <YAxis
            width={20}
            height={200}
            top={0}
            left={20}
            labelOrientation={ELabelOrientation.HORIZONTAL}
            scale="band"
            values={data.bins}
          />
        </Base>

        <JSXCode exampleCode={exampleYAxisCode} />

      </TwoColumns>
    </Layout>
  )
};

export default AxisExample;
