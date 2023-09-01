import { schemeSet3 } from 'd3-scale-chromatic';
import React from 'react';

import { Base } from './components/Base';
import {
  Ring,
  RingItem,
} from './components/Ring';
import { TipFunc } from './components/ToolTip';
import { BarChartDataSet } from './Histogram';
import { getHoverColorScheme } from './utils/hoverColorScheme';

/**
 * get the inner and outer radius for each pie segment.
 * Nested donuts (when setIndex > 0) will return smaller values
 * enabling us to layer donuts in concentric rings
 */
const getRadii = (props: {setIndex: number, donutWidth?: number, width: number, height: number}) => {
  const { donutWidth = 0, width, height, setIndex } = props;

  const radius = Math.min(Number(width), height) / 2;
  const outerRadius = donutWidth === 0
    ? radius - 10
    : radius - 10 - (setIndex * (donutWidth + 10));
    const innerRadius = Math.max(0, donutWidth === 0
    ? 0
    : radius - 10 - donutWidth - (setIndex * (donutWidth + 10)));
  return {outerRadius, innerRadius}
};

export type Props = {
  data: {
    bins: string[],
    counts: BarChartDataSet[];
  };
  backgroundColor?: string;
  className?: string;
  colorScheme?: readonly string[];
  donutWidth?: number;
  height: number;
  hoverColorScheme?: readonly string[];
  tip?: TipFunc;
  visible?: { [key: string]: boolean };
  width: number;
  /** @description Chart <title /> */
  title?: string;
  description?: string;
  id?: string;
  /** @description Format the label that appears above each pie chart's segment */
  labelFormat?: (item: RingItem) => string;
}

export const PieChart = (props: Props) => {
  const {width, height, id, title, description, data} = props;
  if (width === 0 || height === 0) {
    return null;
  }
return (
  <Base
    width={width}
    title={title}
    description={description}
    id={id}
    height={height}>
    {
      data.counts.map((d, i) => {
        const radii = getRadii({
          donutWidth: props.donutWidth,
          width,
          height,
          setIndex: i,
        });
      return (
      <Ring
        key={d.label}
        {...props}
        data={d}
        bins={data.bins}
        setIndex={i}
        {...radii}
        hoverColorScheme={props.hoverColorScheme ?? getHoverColorScheme(props.colorScheme ?? schemeSet3)}
      />)
})
    }
  </Base>
  );
}
