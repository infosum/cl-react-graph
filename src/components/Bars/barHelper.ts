import {
  ScaleBand,
  ScaleLinear,
} from 'd3-scale';
import { SpringConfig } from 'react-spring';

import {
  EGroupedBarLayout,
  IHistogramBar,
  IHistogramDataSet,
} from '../../Histogram';
import { EChartDirection } from '../../HistogramNativeReact';
import { getBarWidth } from '../../utils/bars';
import { ExtendedGroupItem } from './Bars';

/**
 * Calculate the bar's band position based in the axis layout type.
 * This is the offset applied depending on the group layout setting.
 * x for vertical
 * y for horizontal
 */
const getBandPosition = (
  item: ExtendedGroupItem,
  props: IBarSpringProps,
) => {
  const { innerScaleBand, innerDomain, groupLayout, paddings } = props;
  const groupLabel = item.groupLabel ?? 'main';
  let bandX = 0;
  switch (groupLayout) {
    case EGroupedBarLayout.OVERLAID:
      // Move to the right for each subsequent dataset to reveal the previous dataset's bars.
      const overlaidOffset = paddings.overlayMargin * item.datasetIndex;
      bandX = Number(innerScaleBand(String(innerDomain[0]))) + overlaidOffset;
      break;
    case EGroupedBarLayout.STACKED:
      // Each bar will be on top of the other, so they should all have the same starting x value
      bandX = Number(innerScaleBand(String(innerDomain[0])));
      break;
    case EGroupedBarLayout.GROUPED:
      // Position bars next to each other using the x axis inner scale band
      bandX = Number(innerScaleBand(String(groupLabel)));
      break;
  }

  return bandX;
}

interface IBarSpringProps {
  values: IHistogramDataSet[];
  height: number;
  width: number;
  dataSets: ExtendedGroupItem[];
  numericScale: ScaleLinear<any, any>;
  bandScale: ScaleBand<string>;
  colorScheme: string[];
  hoverColorScheme?: string[];
  innerDomain: string[];
  innerScaleBand: ScaleBand<string>;
  groupLayout: EGroupedBarLayout;
  paddings: IHistogramBar,
  config: SpringConfig,
  direction: EChartDirection;
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildBarSprings = (props: IBarSpringProps) => {
  const { direction, width, config, values, height, dataSets, numericScale, bandScale, colorScheme, innerDomain, innerScaleBand, groupLayout, paddings, hoverColorScheme } = props;
  const s = dataSets.map((item) => {
    const bandValue = Number(bandScale(item.label));
    const bandPosition = getBandPosition(item, props);
    const valueOffset = getValueOffset(item, props);
    const itemWidth = getBarWidth(item.datasetIndex, groupLayout, paddings, innerScaleBand);
    const itemHeight = numericScale(item.value);
    if (direction === EChartDirection.horizontal) {
      return {
        from: {
          width: 0,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
          x: 0,
          y: bandPosition + bandValue,
          height: itemWidth,
        },
        to: {
          width: itemHeight,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
          x: valueOffset,
          y: bandPosition + bandValue,
          height: itemWidth,
        },
        config,
      }
    }
    return {

      from: {
        height: 0,
        fill: colorScheme[item.datasetIndex],
        hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
        x: bandPosition + bandValue,
        y: height,
        width: itemWidth,
      },
      to: {
        height: itemHeight,
        fill: colorScheme[item.datasetIndex],
        hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
        x: bandPosition + bandValue,
        y: valueOffset,
        width: itemWidth,
      },
      config,
    }
  });
  return s;
}

/**
 * If we are using a STACKED group layout the work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export const getValueOffset = (
  item: ExtendedGroupItem,
  props: IBarSpringProps,
) => {
  const { direction, numericScale, groupLayout, height, dataSets } = props;
  const offSet = dataSets
    .filter((d) => d.label === item.label)
    .filter((_, i) => direction === EChartDirection.horizontal ? i < item.datasetIndex : i <= item.datasetIndex)
    .reduce((p, n) => p + n.value, 0);

  if (direction === EChartDirection.horizontal) {
    if (groupLayout !== EGroupedBarLayout.STACKED) {
      return 0;
    }
    return numericScale(offSet);
  }

  if (groupLayout !== EGroupedBarLayout.STACKED) {
    return height - numericScale(item.value);
  }

  return height - numericScale(offSet);
}
