import React, { FC } from 'react';

import { EChartDirection } from './BarChart';
import Bars from './components/Bars/Bars';
import Base from './components/Base';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartDataSet,
} from './Histogram';
import { ITornadoData } from './legacy/Tornado';
import { applyDomainAffordance } from './utils/domain';

interface IProps {
  data: ITornadoData;
  direction?: EChartDirection;
  groupLayout: EGroupedBarLayout;
  height: number;
  /** @description Height in px of the axis which labels the left/right values */
  splitAxisHeight?: number;
  /** @description labels for the left/right split axis  */
  splitBins: [string, string];
  visible?: Record<string, boolean>;
  xAxisHeight?: number;
  yAxisWidth?: number;
  width: number;
  padding?: number;
  showBinPercentages: boolean;
}

const Tornado: FC<IProps> = ({
  data,
  direction = EChartDirection.HORIZONTAL,
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  splitBins = ['Left', 'Right'],
  width,
  visible = {},
  xAxisHeight,
  splitAxisHeight,
  yAxisWidth,
  padding = 15,
  showBinPercentages = false,
}) => {
  if (!yAxisWidth) {
    yAxisWidth = direction === EChartDirection.VERTICAL ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.VERTICAL ? 100 : 40;
  }
  if (!splitAxisHeight) {
    splitAxisHeight = direction === EChartDirection.VERTICAL ? 100 : 40;
  }

  const domain = calculateDomain(data, true);
  const baseProps = {
    width,
    height,
    padding,
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

  const left: IBarChartDataSet[] = data.counts.map((counts, i) => {

    return {
      label: splitBins[0] + ' ' + counts.label,
      data: direction === EChartDirection.HORIZONTAL
        ? [...counts.data[0]].reverse()
        : [...counts.data[0]],
    }
  })

  const right: IBarChartDataSet[] = data.counts.map((counts, i) => {
    return {
      label: splitBins[1] + ' ' + counts.label,
      data: direction === EChartDirection.HORIZONTAL
        ? [...counts.data[1]].reverse()
        : [...counts.data[1]],
    }
  });

  const barWidth = direction === EChartDirection.VERTICAL
    ? (width - yAxisWidth) - (padding * 2)
    : ((width - (2 * padding)) - yAxisWidth) / 2;
  const barHeight = direction === EChartDirection.VERTICAL
    ? ((height - (2 * padding)) - xAxisHeight) / 2
    : (height - xAxisHeight - splitAxisHeight) - (padding * 2);
  return (
    <Base {...baseProps}
      width={width + 30}
    >
      <Bars values={left}
        direction={direction}
        inverse={direction !== EChartDirection.VERTICAL}
        left={direction === EChartDirection.VERTICAL
          ? splitAxisHeight + xAxisHeight
          : yAxisWidth}
        height={barHeight}
        width={barWidth}
        groupLayout={groupLayout}
        bins={data.bins}
        domain={domain}
        showLabels={showBinPercentages ? [true, true] : [false, false]}
      />

      <Bars values={right}
        direction={direction}
        inverse={direction === EChartDirection.VERTICAL}
        left={direction === EChartDirection.VERTICAL
          ? splitAxisHeight + xAxisHeight
          : (((width - (2 * padding)) + yAxisWidth) / 2)}
        height={barHeight}
        width={barWidth}
        groupLayout={groupLayout}
        bins={data.bins}
        domain={domain}
        top={direction === EChartDirection.HORIZONTAL ? 0 : barHeight}
        showLabels={showBinPercentages ? [true, true] : [false, false]}
      />

      {
        direction === EChartDirection.HORIZONTAL && <>
          {
            // Band axis (Left hand axis)
          }
          <YAxis
            width={yAxisWidth}
            height={barHeight}
            scale="band"
            path={{ opacity: 0 }}
            tickSize={0}
            values={[...data.bins].reverse()}
          />
          {
            // Middle y axis
          }
          <YAxis
            width={yAxisWidth}
            height={barHeight}
            left={barWidth}
            labelFormat={() => ''}
            values={direction === EChartDirection.HORIZONTAL ? data.bins : undefined}
            scale="band"
          />

          {
            // Bottom left values axis
          }
          <XAxis
            width={barWidth}
            inverse={true}
            height={xAxisHeight}
            top={barHeight}
            left={yAxisWidth}
            scale="linear"
            domain={domain}
          />

          {
            // Bottom right values axis
          }
          <XAxis
            width={barWidth}
            height={xAxisHeight}
            top={barHeight}
            left={((width - (2 * padding) + yAxisWidth) / 2)}
            scale="linear"
            domain={domain}
          />
          {
            // Bottom split bin axis (grouped labels)
          }
          <XAxis
            height={splitAxisHeight}
            left={yAxisWidth}
            top={barHeight + splitAxisHeight}
            width={baseProps.width - yAxisWidth}
            values={splitBins}
            path={{ opacity: 0 }}
            scale='point'
          />
        </>
      }
      {

        direction === EChartDirection.VERTICAL && <>
          {
            // Band axis (bottom axis)
          }
          <XAxis
            width={barWidth}
            height={yAxisWidth}
            scale="band"
            path={{ opacity: 0 }}
            tickSize={0}
            left={xAxisHeight + splitAxisHeight}
            top={(barHeight * 2)}
            values={[...data.bins]}
          />

          {
            // Middle x axis
          }
          <XAxis
            width={barWidth}
            height={yAxisWidth}
            left={xAxisHeight + splitAxisHeight}
            labelFormat={() => ''}
            values={data.bins}
            top={(barHeight)}
            scale="band"
          />

          {
            // Top left values axis
          }
          <YAxis
            width={xAxisHeight}
            height={barHeight}
            top={0}
            left={splitAxisHeight}
            scale="linear"
            domain={domain}
          />

          {
            // Bottom left values axis
          }
          <YAxis
            width={xAxisHeight}
            height={barHeight}
            inverse={true}
            top={barHeight}
            left={splitAxisHeight}
            scale="linear"
            domain={domain}
          />
          {
            // Left split bin axis (grouped labels)
          }
          <YAxis
            height={barHeight * 2}
            left={0}
            width={splitAxisHeight}
            values={splitBins}
            path={{ opacity: 0 }}
            scale='point'
          />
        </>
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
    0,
    applyDomainAffordance(Math.max(...rightValues)),
  ];

  // Center the 0 axis value in the middle of the chart
  if (center) {
    const max = Math.max(Math.max(...leftValues), domain[1]);
    domain = [
      0,
      applyDomainAffordance(max),
    ];
  }
  return domain;
}
