import {
  ScaleBand,
  ScaleLinear,
} from 'd3';

import {
  EGroupedBarLayout,
  IHistogramDataSet,
} from '../../Histogram';
import { ExtendedGroupItem } from './Bars';

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
      const overlaidOffset = paddings.overlayMargin * datasetIndex;
      bandX = Number(innerScaleBand(String(innerDomain[0]))) + overlaidOffset;
      break;
    case EGroupedBarLayout.STACKED:
      bandX = Number(innerScaleBand(String(innerDomain[0])));
      break;
    case EGroupedBarLayout.GROUPED:
      bandX = Number(innerScaleBand(String(groupLabel)));
      break;
  }

  return bandX;
}
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
    const y = yOffset(yScale, groupLayout, height, values, item);
    return {

      from: {
        height: 0,
        fill: colorScheme[item.datasetIndex],
        x: x2 + x,
        y: y,
      },
      to: {
        height: yScale(item.value),
        fill: colorScheme[item.datasetIndex],
        x: x2 + x,
        y: y - yScale(item.value),
      }
    }
  });
  console.log('spring props', s);
  return s;
}

// @TODO not right!
export const yOffset = (
  yScale: ScaleLinear<any, any>,
  groupLayout: EGroupedBarLayout,
  height: number,
  values: IHistogramDataSet[],
  item: ExtendedGroupItem,
) => {
  if (groupLayout !== EGroupedBarLayout.STACKED) {
    return height;
  }
  const groupData = values.find((v) => v.label === item.groupLabel);
  const oSet = groupData ?
    groupData.data
      .filter((_, i) => i < item.datasetIndex)
      .reduce((prev, next) => prev + next, 0)
    : 0;
  console.log('oSet', oSet, height, yScale(oSet));
  return height - yScale(oSet) / 2
}
