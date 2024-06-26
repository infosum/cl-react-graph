import { schemeSet3 } from "d3-scale-chromatic";
import React from "react";

import { SpringConfig } from "@react-spring/web";

import { Bars, defaultPadding } from "./components/Bars/Bars";
import { Base } from "./components/Base";
import { Grid } from "./components/Grid";
import { TLabelComponent } from "./components/Label";
import { TipFunc } from "./components/ToolTip";
import { XAxis } from "./components/XAxis";
import {
  Axis,
  ELabelOrientation,
  TAxisLabelFormat,
  TTickFormat,
  YAxis,
} from "./components/YAxis";
import {
  BarChartData,
  EGroupedBarLayout,
  Grid as GridProps,
  HistogramBar,
} from "./Histogram";
import { ColorScheme } from "./utils/colorScheme";
import { useHistogramDomain } from "./utils/useDomain";

export enum EChartDirection {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}
type Props = {
  animation?: SpringConfig;
  axisLabelFormat?: TAxisLabelFormat;
  colorScheme?: ColorScheme;
  data: BarChartData;
  direction?: EChartDirection;
  id?: string;
  grid?: GridProps;
  axis?: {
    x?: {
      path?: Axis["path"];
      labelOrientation: ELabelOrientation;
      tickSize?: number;
      tickFormat?: TTickFormat;
    };
    y?: {
      path?: Axis["path"];
      labelOrientation: ELabelOrientation;
      tickSize?: number;
      tickFormat?: TTickFormat;
    };
  };
  groupLayout?: EGroupedBarLayout;
  height: number;
  LabelComponent?: TLabelComponent;
  padding?: HistogramBar;
  showLabels?: boolean[];
  /** An array of tick values to show on the numerical axis */
  tickValues?: number[];
  tip?: TipFunc;
  /** @description Chart <title /> */
  title?: string;
  visible?: Record<string, boolean>;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  bars?: {
    /** @description radius (px) of bar rounded end's curves. Default 0 - no rounded ends */
    radius?: number;
  };
  /** @description nodes rendered after/above the bars */
  labels?: string[];
};

const defaultTickValues = [];

export const BarChart = ({
  animation,
  axisLabelFormat,
  colorScheme = schemeSet3,
  data,
  direction = EChartDirection.VERTICAL,
  grid,
  id = "",
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  LabelComponent,
  padding = defaultPadding,
  showLabels = [],
  tip,
  visible,
  width,
  xAxisHeight,
  yAxisWidth,
  tickValues,
  bars,
  title,
  axis,
  labels,
}: Props) => {
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
    values: data.counts,
    tickValues: tickValues ?? defaultTickValues,
  });

  return (
    <Base
      width={width + 30} // @TODO work out why without this the bars exceed the chart
      height={height}
      title={title}
      id={id}
    >
      {grid && (
        <Grid
          left={yAxisWidth}
          height={height - xAxisHeight}
          width={width - yAxisWidth}
          {...grid}
        />
      )}

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
        labels={labels}
        tip={tip}
        values={data.counts}
        visible={visible}
        width={width - yAxisWidth}
        radius={bars?.radius ?? 0}
      />

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        labelFormat={axisLabelFormat}
        labelOrientation={axis?.y?.labelOrientation}
        scale={direction === EChartDirection.HORIZONTAL ? "band" : "linear"}
        values={
          direction === EChartDirection.HORIZONTAL ? data.bins : tickValues
        }
        domain={direction === EChartDirection.HORIZONTAL ? tickValues : domain}
        padding={padding}
        path={axis?.y?.path}
        tickSize={axis?.y?.tickSize}
        tickFormat={axis?.y?.tickFormat}
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight}
        padding={padding}
        left={yAxisWidth}
        labelFormat={axisLabelFormat}
        labelOrientation={axis?.x?.labelOrientation}
        scale={direction === EChartDirection.HORIZONTAL ? "linear" : "band"}
        values={
          direction === EChartDirection.HORIZONTAL ? tickValues : data.bins
        }
        domain={direction === EChartDirection.HORIZONTAL ? domain : tickValues}
        path={axis?.x?.path}
        tickSize={axis?.x?.tickSize}
        tickFormat={axis?.x?.tickFormat}
      />
    </Base>
  );
};
