import { extent } from 'd3-array';
import { schemeSet3 } from 'd3-scale-chromatic';
import React, { FC } from 'react';
import { SpringConfig } from 'react-spring';

import HistogramBars from '../components/Bars/HistogramBars';
import Base from '../components/Base';
import Grid from '../components/Grid';
import { TTipFunc } from '../components/ToolTip';
import XAxis from '../components/XAxis';
import YAxis, {
  ELabelOrientation,
  TAxisLabelFormat,
} from '../components/YAxis';
import {
  IGrid,
  IHistogramData,
} from '../Histogram';
import { EChartDirection } from './BarChart';

export interface IHistogramProps {
  animation?: SpringConfig;
  axisLabelFormat?: TAxisLabelFormat;
  colorScheme?: string[];
  data: IHistogramData;
  direction?: EChartDirection;
  grid?: IGrid;
  height: number;
  hoverColorScheme?: string[];
  tip?: TTipFunc;
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  xAxisLabelOrientation?: ELabelOrientation;
  yAxisWidth?: number;
}

/**
 * A Histogram renders continuous data and thus use a ScaleLinear x & y axis 
 */
const Histogram: FC<IHistogramProps> = ({
  animation,
  axisLabelFormat,
  colorScheme = schemeSet3,
  data,
  direction = EChartDirection.VERTICAL,
  grid,
  height,
  hoverColorScheme,
  tip,
  visible,
  width,
  xAxisHeight,
  xAxisLabelOrientation = ELabelOrientation.HORIZONTAL,
  yAxisWidth,
}) => {
  if (!yAxisWidth) {
    yAxisWidth = direction === EChartDirection.VERTICAL ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.VERTICAL ? 100 : 40;
  }

  if (width === 0) {
    return null;
  }

  const bins = data.bins.reduce((p, n) => p.concat(Array.isArray(n) ? n : [n]), [] as number[]);
  const continuousDomain = extent(bins) as [number, number];
  const domain = extent([0].concat(data.counts.reduce((p, n) => p.concat(n.data), [] as number[]))) as [number, number];
  return (
    <Base
      width={width + 30} // @TODO work out why without this the bars exceed the chart
      height={height}>

      {
        grid && <Grid
          left={yAxisWidth}
          height={height - xAxisHeight}
          svgProps={{ ...grid.x.style }}
          lines={{
            vertical: grid.y.ticks,
            horizontal: grid.x.ticks,
          }}
          width={width - yAxisWidth} />
      }

      <HistogramBars
        colorScheme={colorScheme}
        hoverColorScheme={hoverColorScheme}
        left={yAxisWidth}
        height={height - xAxisHeight}
        width={width - yAxisWidth}
        values={data.counts}
        config={animation}
        bins={data.bins}
        direction={direction}
        domain={domain}
        continuousDomain={continuousDomain}
        tip={tip}
        visible={visible}
      />

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        labelFormat={axisLabelFormat}
        scale="linear"
        domain={direction === EChartDirection.HORIZONTAL ? continuousDomain : domain}
        values={direction === EChartDirection.HORIZONTAL
          ? [
            continuousDomain[0],
            ((continuousDomain[1] - continuousDomain[0]) * 1) / 3,
            ((continuousDomain[1] - continuousDomain[0]) * 2) / 3,
            continuousDomain[1],
          ]
          : domain
        }
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight}
        left={yAxisWidth}
        labelFormat={axisLabelFormat}
        labelOrientation={xAxisLabelOrientation}
        scale="linear"
        domain={direction === EChartDirection.HORIZONTAL ? domain : continuousDomain}
        values={direction === EChartDirection.HORIZONTAL
          ? domain
          : [
            continuousDomain[0],
            ((continuousDomain[1] - continuousDomain[0]) * 1) / 3,
            ((continuousDomain[1] - continuousDomain[0]) * 2) / 3,
            continuousDomain[1],
          ]}
      />

    </Base>
  )

}

export default Histogram;
