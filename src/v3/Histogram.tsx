import { schemeSet3 } from 'd3-scale-chromatic';
import React, { FC } from 'react';
import { SpringConfig } from 'react-spring';

import Bars from '../components/Bars/Bars';
import Base from '../components/Base';
import Grid from '../components/Grid';
import { TTipFunc } from '../components/ToolTip';
import XAxis from '../components/XAxis';
import YAxis from '../components/YAxis';
import {
  EGroupedBarLayout,
  IGrid,
  IHistogramBar,
  IHistogramData,
} from '../Histogram';
import { useHistogramDomain } from '../utils/useDomain';

export enum EChartDirection {
  'horizontal',
  'vertical',
}
const defaultPadding: IHistogramBar = {
  grouped: {
    paddingInner: 0.1,
    paddingOuter: 0,
  },
  paddingInner: 0.1,
  paddingOuter: 0,
  overlayMargin: 5,
  hover: {
    lighten: 0.1,
  },
}

interface IProps {
  animation?: SpringConfig;
  binLabelFormat?: (bin: string) => string;
  colorScheme?: string[];
  data: IHistogramData;
  direction?: EChartDirection;
  grid?: IGrid;
  groupLayout?: EGroupedBarLayout;
  height: number;
  padding?: IHistogramBar;
  tip?: TTipFunc;
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
}

const Histogram: FC<IProps> = ({
  animation,
  binLabelFormat,
  colorScheme = schemeSet3,
  data,
  direction = EChartDirection.vertical,
  grid,
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  padding = defaultPadding,
  tip,
  visible,
  width,
  xAxisHeight = 60,
  yAxisWidth = 100,
}) => {
  const binLabels = binLabelFormat
    ? data.bins.map((b) => binLabelFormat(b))
    : data.bins;
  // TODO - do we want a chart context to contain the bounding x/y axis. 
  // Once we've build up standard components it would be good to asses this.

  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts
  });

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
          width={width - 100} />
      }

      <Bars
        colorScheme={colorScheme}
        left={yAxisWidth}
        height={height - xAxisHeight}
        width={width - yAxisWidth}
        padding={padding}
        groupLayout={groupLayout}
        values={data.counts}
        config={animation}
        bins={data.bins}
        direction={direction}
        domain={domain}
        tip={tip}
        visible={visible}
      />

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        scale={direction === EChartDirection.horizontal ? 'band' : 'linear'}
        values={direction === EChartDirection.horizontal ? binLabels : undefined}
        domain={direction === EChartDirection.horizontal ? undefined : domain}

        padding={padding}
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight}
        padding={padding}
        left={yAxisWidth}
        scale={direction === EChartDirection.horizontal ? 'linear' : 'band'}
        values={direction === EChartDirection.horizontal ? undefined : binLabels}
        domain={direction === EChartDirection.horizontal ? domain : undefined}
      />

    </Base>
  )

}

export default Histogram;
