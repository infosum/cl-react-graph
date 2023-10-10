import React from 'react';

import {
  Axes,
  BarChart,
  BarChartData,
  DeepPartial,
  EChartDirection,
  EGroupedBarLayout,
  ELabelOrientation,
  GridProps,
  SVGLineStyle,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  BarChart,
  DeepPartial,
  EChartDirection,
  EGroupedBarLayout,
  ELabelOrientation,
  Axes,
  BarChartData,
  GridProps,
  SVGLineStyle,
  useWidth,
} from 'cl-react-graph;


export const axis: DeepPartial<Axes> = {
  x: {
    scale: 'linear',
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
  y: {
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
};

const data: BarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [58483, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [54932, 34230, 10000],
      label: 'Filtered',
    },
  ]
};

export const lineStyle: SVGLineStyle = {
  'fill': '#000',
  'opacity': 1,
  'shapeRendering': 'auto',
  'stroke': '#000',
  'strokeOpacity': 1,
  'strokeWidth': 1,
  'visible': 'true',
};

const grid: GridProps = {
  x: {
    height: 1,
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'strokeOpacity': 0.7,
      'strokeWidth': 1,
    },
    ticks: 5,
    visible: true,
  },
  y: {
    style: {
      ...lineStyle,
      'fill': 'none',
      'stroke': '#bbb',
      'strokeOpacity': 0.7,
      'strokeWidth': 5,
    },
    ticks: 5,
    visible: true,
  },
};

const MyComponent = () => {
  const [ref, width] = useWidth('90%');

  return (
    <div ref={ref}>
      <BarChart
        animation={{
          duration: 800,
        }}
        showLabels={[false, true]}
        direction={EChartDirection.HORIZONTAL}
        data={data}
        height={400}
        tickValues={[0, 40000, 89200]}
        grid={grid}
        colorScheme={[theme.brightBlue800, theme.green900]}
        groupLayout={EGroupedBarLayout.GROUPED}
        xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}
        width={width} />
    </div>
  )
};
`;

export const axis: DeepPartial<Axes> = {
  x: {
    scale: 'linear',
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
  y: {
    numberFormat: '.2s',
    labelOrientation: ELabelOrientation.HORIZONTAL,
  },
};

const data: BarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [58483, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [54932, 34230, 10000],
      label: 'Filtered',
    },
  ]
}

const lineStyle: SVGLineStyle = {
  fill: '#000',
  opacity: 1,
  shapeRendering: 'auto',
  stroke: '#000',
  strokeOpacity: 1,
  strokeWidth: 1,
  visible: 'true',
};

const grid: GridProps = {
  x: {
    height: 1,
    style: {
      ...lineStyle,
      fill: 'none',
      stroke: '#bbb',
      strokeOpacity: 0.7,
      strokeWidth: 1,
    },
    ticks: 5,
    visible: true,
  },
  y: {
    style: {
      ...lineStyle,
      fill: 'none',
      stroke: '#bbb',
      strokeOpacity: 0.7,
      strokeWidth: 5,
    },
    ticks: 5,
    visible: true,
  },
};


const BarChartExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Bar Chart</h2>
      <TwoColumns>
        <div ref={ref}>
          <BarChart
            animation={{
              duration: 800,
            }}
            showLabels={[false, true]}
            direction={EChartDirection.HORIZONTAL}
            data={data}
            height={400}
            tickValues={[0, 40000, 89200]}
            grid={grid}
            colorScheme={[theme.brightBlue800, theme.green900]}
            groupLayout={EGroupedBarLayout.GROUPED}
            xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}
            width={width}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  )
};

export default BarChartExample;
