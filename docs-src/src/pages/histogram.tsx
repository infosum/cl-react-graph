import React from 'react';

import {
  EChartDirection,
  ELabelOrientation,
  GridProps,
  Histogram,
  HistogramData,
  SVGLineStyle,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  EChartDirection,
  ELabelOrientation,
  Histogram,
  IGrid,
  HistogramData,
  SVGLineStyle,
  useWidth,
} from 'cl-react-graph;

const data: HistogramData = {
  bins: [[0, 50], [50, 150], [150, 300]],
  counts: [
    {
      data: [500, 2000, 1500],
      label: 'Baseline',
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

const grid: IGrid = {
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

const MyComponent = () => {
  const [ref, width] = useWidth('90%');

  return (
    <div ref={ref}>
      <Histogram
        animation={{
          duration: 300,
        }}
        showLabels={[true, true]}
        LabelComponent={({ item }) => {
          return <g transform="translate(0, -10)"><g>
            <circle dy={10} r={4} fill="red"></circle>
            <text dx="10">{item.percentage}</text></g>
          </g>;
        }}
        direction={EChartDirection.HORIZONTAL}
        data={data}
        height={400}
        grid={grid}
        xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}
        width={width} />
    </div>
  )
};
`;

const data: HistogramData = {
  bins: [[0, 50], [50, 150], [150, 300]],
  counts: [
    {
      data: [500, 2000, 1500],
      label: 'Baseline',
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

const HistogramExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Histogram Chart</h2>
      <TwoColumns>
        <div ref={ref}>
          <Histogram
            animation={{
              duration: 300,
            }}
            showLabels={[true, true]}
            LabelComponent={({ item }) => {
              return <g transform="translate(0, -10)"><g>
                <circle dy={10} r={4} fill="red"></circle>
                <text dx="10">{item.percentage}</text></g>
              </g>;
            }}
            direction={EChartDirection.HORIZONTAL}
            data={data}
            height={400}
            grid={grid}
            xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}
            width={width}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  )
};

export default HistogramExample;
