import {
  ScaleBand,
  ScaleLinear,
} from 'd3';

import {
  EGroupedBarLayout,
  IHistogramDataSet,
} from '../../Histogram';
import { ExtendedGroupItem } from './Bars';

/**
 * Depending on the axis group layout we need to take the values and work out what the 
 * y axis domain bounds need to be.
 */
export const getYDomain = (
  groupLayout: EGroupedBarLayout,
  bins: string[],
  dataSets: ExtendedGroupItem[],
  values: IHistogramDataSet[],
) => {

  let allValues: number[] = []
  if (groupLayout === EGroupedBarLayout.STACKED) {
    // work out total per bin 

    const binTotals: Array<{ bin: string, value: number }> = [];
    bins.forEach((bin, binIndex) => {
      const v = dataSets.filter((d) => d.label === bin).reduce((prev, next) => prev + next.value, 0);
      if (!binTotals[binIndex]) {
        binTotals[binIndex] = { bin, value: v };
      } else {
        binTotals[binIndex].value += v;
      }
    })
    allValues = binTotals.map((b) => b.value);
  } else {
    allValues = values.reduce((prev, dataset) => {
      return prev.concat(dataset.data);
    }, [] as number[]);
  }
  return [Math.min(...allValues as number[]), Math.max(...allValues as number[])];
}

/**
 * Calculate the bar's x position based in the axis layout type.
 */
const xPosition = (
  innerScaleBand: ScaleBand<string>,
  innerDomain: string[],
  groupLayout: EGroupedBarLayout,
  datasetIndex: number,
  groupLabel: string,
  paddings,
) => {
  let bandX = 0;
  switch (groupLayout) {
    case EGroupedBarLayout.OVERLAID:
      // Move to the right for each subsequent dataset to reveal the previous dataset's bars.
      const overlaidOffset = paddings.overlayMargin * datasetIndex;
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

/**
 * Build the from / to spring animation properties to animate the bars.
 */
export const buildBarSprings = (props: {
  values: IHistogramDataSet[];
  height: number;
  dataSets: ExtendedGroupItem[];
  yScale: ScaleLinear<any, any>;
  xScale: ScaleBand<string>;
  colorScheme: string[]
  innerDomain: string[];
  innerScaleBand: ScaleBand<string>;
  groupLayout: EGroupedBarLayout;
  paddings: any,
}) => {
  const { values, height, dataSets, yScale, xScale, colorScheme, innerDomain, innerScaleBand, groupLayout, paddings } = props;
  const s = dataSets.map((item) => {
    const x = Number(xScale(item.label));
    const x2 = xPosition(innerScaleBand, innerDomain, groupLayout, item.datasetIndex, item.groupLabel ?? 'main', paddings);
    const y = yOffset(yScale, groupLayout, height, item, dataSets);
    return {

      from: {
        height: 0,
        fill: colorScheme[item.datasetIndex],
        x: x2 + x,
        y: height,
      },
      to: {
        height: yScale(item.value),
        fill: colorScheme[item.datasetIndex],
        x: x2 + x,
        y: y - yScale(item.value),
      }
    }
  });
  return s;
}

/**
 * If we are using a STACKED group layout the work out the total height
 * of the bars which should be stacked under the current item.
 * This should provide us with the finishing location for the bar's y position.
 */
export const yOffset = (
  yScale: ScaleLinear<any, any>,
  groupLayout: EGroupedBarLayout,
  height: number,
  item: ExtendedGroupItem,
  dataSets: ExtendedGroupItem[],
) => {
  const offSet = groupLayout !== EGroupedBarLayout.STACKED
    ? 0
    : dataSets
      .filter((d) => d.label === item.label)
      .filter((_, i) => i < item.datasetIndex)
      .reduce((p, n) => p + n.value, 0);
  return height - yScale(offSet);
}
