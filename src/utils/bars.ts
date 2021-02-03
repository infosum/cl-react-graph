import { ScaleBand } from 'd3-scale';

import { ExtendedGroupItem } from '../components/Bars/Bars';
import {
  EGroupedBarLayout,
  IBarChartDataSet,
  IHistogramBar,
} from '../Histogram';

export interface IGroupedProps {
  groupLayout: EGroupedBarLayout,
  stacked?: boolean;
}
export const groupedBarsUseSameXAxisValue = ({ groupLayout, stacked }: IGroupedProps): boolean => {
  return stacked || groupLayout === EGroupedBarLayout.STACKED || groupLayout === EGroupedBarLayout.OVERLAID;
};

/**
 *This is the inner padding between each grouped dataset or single datasets.
 */
export const paddingInner = (bar: IHistogramBar): number => {
  const m = bar?.paddingInner ?? 0;
  return m >= 0 && m <= 1
    ? m
    : 0.1;
}

/**
 * Padding for the outside of grouped datasets or single datasets
 * 
 */
export const paddingOuter = (bar: IHistogramBar): number => {
  const m = bar?.paddingOuter ?? 0;
  return m >= 0 && m <= 1
    ? m
    : 0.1;
}

/**
 * Get the bar width
 * Uses the (grouped)inner/outer padding bar properties. 
 * if layout = OVERLAID then offset by the overlayMargin.
 * If the overlayMargin < 1 then use it as a percentage offset of the bar width
 * If its >= 1 then use as a pixel offset 
 * @return number min of 1
 */
export const getBarWidth = (
  i: number,
  groupLayout: EGroupedBarLayout,
  bar: IHistogramBar,
  innerScaleBand: ScaleBand<string>,
) => {
  const w = innerScaleBand.bandwidth();
  let overlay = (groupLayout !== EGroupedBarLayout.OVERLAID)
    ? 0
    : bar.overlayMargin >= 1
      ? i * bar.overlayMargin * 2
      : Math.round(i * bar.overlayMargin * w);

  if (groupLayout === EGroupedBarLayout.OVERLAID && overlay === 1 && w > 4) {
    overlay = 2;
  }
  return Math.max(1, w - overlay);
};

/**
 * When grouping data this is the spacing between the group's bars.
 */
export const groupedPaddingInner = (bar: IHistogramBar): number => {
  const m = bar?.grouped?.paddingInner ?? 0.1;
  return m >= 0 && m <= 1
    ? m
    : 0.1;
}

/**
 * When grouping data this is the spacing to the left of the first and the right of the last bar.
 */
export const groupedPaddingOuter = (bar: IHistogramBar): number => {
  const m = bar?.grouped?.paddingOuter ?? 0.1;
  return m >= 0 && m <= 1
    ? m
    : 0.1;
}

interface P {
  bins: (string | [number, number])[];
  values: IBarChartDataSet[];
  visible: Record<string, boolean>;
}
export const buildBarDatasets = ({
  values,
  bins,
  visible,
}) => {
  const dataSets: ExtendedGroupItem[] = [];

  const binLabels = bins.reduce((p, n) => p.concat(Array.isArray(n) ? n : [n]), [] as (number | string)[]);

  values.forEach((count, datasetIndex) => {
    const total = count.data.reduce((p, n) => p + n, 0);
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: String(binLabels[i]),
        binIndex: i,
        percentage: total === 0 ? '0' : ((value / total) * 100).toFixed(2),
        value: visible[binLabels[i]] !== false && visible[count.label] !== false ? value : 0,
      });
    });
  });
  return { binLabels, dataSets };
}
