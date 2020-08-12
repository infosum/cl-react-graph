import { schemeSet3 } from 'd3-scale-chromatic';
import React, { FC } from 'react';
import { SpringConfig } from 'react-spring';

import Bars, { ExtendedGroupItem } from '../components/Bars/Bars';
import Base from '../components/Base';
import Grid from '../components/Grid';
import { TLabelComponent } from '../components/Label';
import { TTipFunc } from '../components/ToolTip';
import XAxis from '../components/XAxis';
import YAxis, {
  ELabelOrientation,
  TAxisLabelFormat,
} from '../components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartData,
  IGrid,
  IHistogramBar,
} from '../Histogram';
import { useHistogramDomain } from '../utils/useDomain';

export enum EChartDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
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
  axisLabelFormat?: TAxisLabelFormat;
  colorScheme?: string[];
  data: IBarChartData;
  direction?: EChartDirection;
  grid?: IGrid;
  groupLayout?: EGroupedBarLayout;
  height: number;
  LabelComponent?: TLabelComponent;
  padding?: IHistogramBar;
  tip?: TTipFunc;
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  xAxisLabelOrientation?: ELabelOrientation;
  yAxisWidth?: number;
}

const BarChart: FC<IProps> = ({
  animation,
  axisLabelFormat,
  colorScheme = schemeSet3,
  data,
  direction = EChartDirection.VERTICAL,
  grid,
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  LabelComponent,
  padding = defaultPadding,
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

      <Bars
        colorScheme={colorScheme}
        left={yAxisWidth}
        height={height - xAxisHeight}
        width={width - yAxisWidth}
        padding={padding}
        groupLayout={groupLayout}
        LabelComponent={LabelComponent}
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
