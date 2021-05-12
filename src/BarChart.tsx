import { schemeSet3 } from 'd3-scale-chromatic';
import React, { FC } from 'react';
import { SpringConfig } from 'react-spring';

import Bars, { defaultPadding } from './components/Bars/Bars';
import Base from './components/Base';
import Grid from './components/Grid';
import { TLabelComponent } from './components/Label';
import { TTipFunc } from './components/ToolTip';
import XAxis from './components/XAxis';
import YAxis, {
  ELabelOrientation,
  TAxisLabelFormat,
} from './components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartData,
  IGrid,
  IHistogramBar,
} from './Histogram';
import { useHistogramDomain } from './utils/useDomain';

export enum EChartDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}
interface IProps {
  animation?: SpringConfig;
  axisLabelFormat?: TAxisLabelFormat;
  colorScheme?: string[];
  data: IBarChartData;
  direction?: EChartDirection;
  id?: string;
  grid?: IGrid;
  groupLayout?: EGroupedBarLayout;
  height: number;
  LabelComponent?: TLabelComponent;
  padding?: IHistogramBar;
  showLabels?: boolean[]
  tip?: TTipFunc;
  /** @description Chart <title /> */
  title?: string;
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  xAxisLabelOrientation?: ELabelOrientation;
  yAxisWidth?: number;
  bars?: {
    rx?: number;
    ry?: number;
  }
}

const BarChart: FC<IProps> = ({
  animation,
  axisLabelFormat,
  colorScheme = schemeSet3,
  data,
  direction = EChartDirection.VERTICAL,
  grid,
  id = '',
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  LabelComponent,
  padding = defaultPadding,
  showLabels = [],
  tip,
  visible,
  width,
  xAxisHeight,
  xAxisLabelOrientation = ELabelOrientation.HORIZONTAL,
  yAxisWidth,
  bars,
  title,
}) => {
  if (!yAxisWidth) {
    yAxisWidth = direction === EChartDirection.VERTICAL ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.VERTICAL ? 100 : 40;
  }

  // TODO - do we want a chart context to contain the bounding x/y axis. 
  // Once we've build up standard components it would be good to asses this.
  if (width === 0) {
    return null;
  }

  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts
  });

  return (
    <Base
      width={width + 30} // @TODO work out why without this the bars exceed the chart
      height={height}
      title={title}
      id={id}>

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

      <Bars
        bins={data.bins}
        colorScheme={colorScheme}
        config={animation}
        direction={direction}
        domain={domain}
        groupLayout={groupLayout}
        height={height - xAxisHeight}
        LabelComponent={LabelComponent}
        left={yAxisWidth}
        padding={padding}
        showLabels={showLabels}
        tip={tip}
        values={data.counts}
        visible={visible}
        width={width - yAxisWidth}
        rx={bars?.rx ?? 0}
        ry={bars?.ry ?? 0}
      />

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        labelFormat={axisLabelFormat}
        scale={direction === EChartDirection.HORIZONTAL ? 'band' : 'linear'}
        values={direction === EChartDirection.HORIZONTAL ? data.bins : undefined}
        domain={direction === EChartDirection.HORIZONTAL ? undefined : domain}

        padding={padding}
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight}
        padding={padding}
        left={yAxisWidth}
        labelFormat={axisLabelFormat}
        labelOrientation={xAxisLabelOrientation}
        scale={direction === EChartDirection.HORIZONTAL ? 'linear' : 'band'}
        values={direction === EChartDirection.HORIZONTAL ? undefined : data.bins}
        domain={direction === EChartDirection.HORIZONTAL ? domain : undefined}
      />

    </Base>
  )

}

export default BarChart;
