import React from 'react';

import {
  Bars,
  Base,
  EChartDirection,
  EGroupedBarLayout,
  IBarChartData,
  useHistogramDomain,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  Bars,
  Base,
  EChartDirection,
  EGroupedBarLayout,
  IBarChartData,
  useHistogramDomain,
  useWidth,
} from 'cl-react-graph;

const data: IBarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [60000, 34230, 10000],
      label: 'Filtered',
    },
  ],
};

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  const groupLayout = EGroupedBarLayout.GROUPED;
  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts,
    tickValues: [],
  });

  return (
    <div ref={ref}>
      <Base
        width={width}
        height={220}>
        <BarsComponent
          bins={data.bins}
          colorScheme={[theme.green900, theme.brightBlue800]}
          direction={EChartDirection.HORIZONTAL}
          domain={domain}
          groupLayout={groupLayout}
          height={200}
          showLabels={[true, true]}
          values={data.counts}
          width={width}
          />
      </Base>
    </div>
  )
}
`;

const data: IBarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [60000, 34230, 10000],
      label: 'Filtered',
    },
  ],
};


const BarsExample = () => {
  const [ref, width] = useWidth('90%');
  const groupLayout = EGroupedBarLayout.GROUPED;
  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts,
    tickValues: [],
  });

  return (
    <Layout>
      <h2>Bars</h2>
      <TwoColumns>
        <div ref={ref}>
          <Base
            width={width}
            height={220}>
            <Bars
             bins={data.bins}
             colorScheme={[theme.green900, theme.brightBlue800]}
             direction={EChartDirection.HORIZONTAL}
             domain={domain}
             groupLayout={groupLayout}
             height={200}
             showLabels={[true, true]}
             values={data.counts}
             width={width}
              />
          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  )
}

export default BarsExample;
