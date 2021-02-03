import {
  ScaleBand,
  ScaleLinear,
} from 'd3-scale';
import { SpringConfig } from 'react-spring';

import { EChartDirection } from '../../BarChart';
import {
  EGroupedBarLayout,
  IBarChartDataSet,
  IHistogramBar,
} from '../../Histogram';
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
  itemWidths: number[],
) => {
  const { innerScaleBand, innerDomain, groupLayout, paddings } = props;
  const groupLabel = item.groupLabel ?? 'main';
  let bandX = 0;
  switch (groupLayout) {
    case EGroupedBarLayout.OVERLAID:
      // Move to the right for each subsequent dataset to reveal the previous dataset's bars.
      const overlaidOffset = item.datasetIndex == 0
        ? 0
        : Math.floor((itemWidths[item.datasetIndex - 1] - itemWidths[item.datasetIndex]) / 2)

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

export interface IBarSpringProps {
  values: IBarChartDataSet[];
  height: number;
  width: number;
  dataSets: ExtendedGroupItem[];
  numericScale: ScaleLinear<any, any>;
  bandScale: ScaleBand<string>;
  colorScheme: readonly string[];
  hoverColorScheme?: readonly string[];
  innerDomain: string[];
  innerScaleBand: ScaleBand<string>;
  groupLayout: EGroupedBarLayout;
  paddings: IHistogramBar,
  config: SpringConfig,
  direction: EChartDirection;
  /** @description - inverse the bars e.g if direction = horizontal run the bars from right to left */
  inverse?: boolean;
  itemWidths: number[];
}
/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildBarSprings = (props: IBarSpringProps) => {
  const { direction, config, height, dataSets, numericScale, bandScale, colorScheme,
    hoverColorScheme,
    inverse = false,
    itemWidths,
  } = props;
  const [_, width] = numericScale.range();

  const s = dataSets.map((item) => {
    const bandValue = Number(bandScale(item.label));
    const bandPosition = getBandPosition(item, props, itemWidths);
    const valueOffset = getValueOffset(item, props);
    const itemWidth = itemWidths[item.datasetIndex];
    const itemHeight = numericScale(item.value);
    if (direction === EChartDirection.HORIZONTAL) {
      return {
        from: {
          width: 0,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
          x: inverse ? width : 0,
          y: bandPosition + bandValue,
          height: itemWidth,
        },
        to: {
          width: itemHeight,
          fill: colorScheme[item.datasetIndex],
          hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
          x: inverse ? width - itemHeight - valueOffset : valueOffset,
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
        y: inverse ? 0 : height,
        width: itemWidth,
      },
      to: {
        height: itemHeight,
        fill: colorScheme[item.datasetIndex],
        hoverFill: hoverColorScheme?.[item.datasetIndex] ?? colorScheme[item.datasetIndex],
        x: bandPosition + bandValue,
        y: inverse ? 0 : valueOffset,
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
    .filter((_, i) => direction === EChartDirection.HORIZONTAL ? i < item.datasetIndex : i <= item.datasetIndex)
    .reduce((p, n) => p + n.value, 0);

  if (direction === EChartDirection.HORIZONTAL) {
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
