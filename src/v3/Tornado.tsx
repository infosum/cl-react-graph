import {
  scaleBand,
  scalePoint,
} from 'd3-scale';
import React, { FC } from 'react';

import Bars from '../components/Bars/Bars';
// import Bar from './components/Bar';
import Base from '../components/Base';
import XAxis from '../components/XAxis';
import YAxis from '../components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartDataSet,
} from '../Histogram';
import { ITornadoData } from '../Tornado';
import { applyDomainAffordance } from '../utils/domain';
import { useHistogramDomain } from '../utils/useDomain';
import { EChartDirection } from './BarChart';

interface IProps {
  data: ITornadoData;
  direction?: EChartDirection;
  groupLayout: EGroupedBarLayout;
  height: number;
  splitAxisHeight?: number;
  splitBins: [string, string];
  visible?: Record<string, boolean>;
  xAxisHeight?: number;
  yAxisWidth?: number;
  width: number;
}

const Tornado: FC<IProps> = ({
  data,
  direction = EChartDirection.horizontal,
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  splitBins = ['Left', 'Right'],
  width,
  visible = {},
  xAxisHeight,
  splitAxisHeight,
  yAxisWidth,
}) => {
  if (!yAxisWidth) {
    yAxisWidth = direction === EChartDirection.vertical ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.vertical ? 100 : 40;
  }
  if (!splitAxisHeight) {
    splitAxisHeight = direction === EChartDirection.vertical ? 100 : 40;
  }

  const domain = calculateDomain(data, true);
  const baseProps = {
    width,
    height,
    padding: 15,
  }


  const dataSets: any[] = []
  data.counts.forEach((count) => {
    count.data.forEach((value, genderIndex) => {
      value.forEach((aValue, rowIndex) => {
        if (!dataSets[rowIndex]) {
          dataSets[rowIndex] = [];
        }
        dataSets[rowIndex].push({
          side: genderIndex === 0 ? 'left' : 'right',
          groupLabel: count.label,
          colorRef: count.label,
          label: data.bins[rowIndex],
          value: visible[data.bins[rowIndex]] !== false && visible[count.label] !== false ? aValue : 0,
        });
      })

    });
  });

  const left: IBarChartDataSet[] = [
    {
      label: splitBins[0],
      data: data.counts[0].data[0].map((d) => d * -1),
    }

  ]

  return (
    <Base {...baseProps}
      width={width + 30}
    >
      <Bars values={left}
        left={(width + yAxisWidth) / 2}
        height={height - xAxisHeight - splitAxisHeight}
        width={(width - yAxisWidth) / 2}

        groupLayout={groupLayout}

        bins={data.bins}

        domain={domain}

      />
      {
        // Left hand axis
      }
      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight - splitAxisHeight}
        scale="band"
        path={{ opacity: 0 }}
        tickSize={0}
        values={direction === EChartDirection.horizontal ? data.bins : undefined}
      />

      {
        // Middle y axis
      }
      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight - splitAxisHeight}
        left={(width - yAxisWidth) / 2}
        labelFormat={() => ''}
        values={direction === EChartDirection.horizontal ? data.bins : undefined}
        scale="band"
      />

      {
        // Bottom values axis
      }
      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight - splitAxisHeight}
        left={yAxisWidth}
        scale="linear"
        domain={domain}
      />

      {
        // Bottom split bin axis (grouped labels)
        direction === EChartDirection.horizontal && <XAxis
          height={40}
          left={yAxisWidth}
          top={height - xAxisHeight}
          width={baseProps.width - yAxisWidth}
          values={splitBins}
          path={{ opacity: 0 }}
          scale='point'
        />
      }

    </Base>

  )
}

export default Tornado;

const calculateDomain = (data: ITornadoData, center = true) => {
  const leftValues = data.counts.reduce((prev, next) => prev.concat(next.data[0]), [] as number[]);
  const rightValues = data.counts.reduce((prev, next) => prev.concat(next.data[1]), [] as number[]);

  // Use applyDomainAffordance to allow space for percentage labels
  let domain = [
    applyDomainAffordance(-Math.max(...leftValues)),
    applyDomainAffordance(Math.max(...rightValues)),
  ];

  // Center the 0 axis value in the middle of the chart
  if (center) {
    const max = Math.max(Math.max(...leftValues), domain[1]);
    domain = [
      applyDomainAffordance(-max),
      applyDomainAffordance(max),
    ];
  }
  return domain;
}
