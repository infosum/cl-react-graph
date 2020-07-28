import { ScaleBand } from 'd3-scale';

import {
  EGroupedBarLayout,
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
 *This is the inner padding between each grouped dataset or single datasetes.
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
 * Get the bar width - using the innerScale and offsetting it layout = OVERLAID
 * Note: this did use bar.width - but its not compatible with the way scale bands work.
 * Instead use the (grouped)inner/outer padding bar properties. 
 */
export const getBarWidth = (
  i: number,
  groupLayout: EGroupedBarLayout,
  bar: IHistogramBar,
  innerScaleBand: ScaleBand<string>,
) => {
  const overlay = (groupLayout === EGroupedBarLayout.OVERLAID)
    ? i * bar.overlayMargin * 2
    : 0;

  const w = innerScaleBand.bandwidth();
  return w - overlay;
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
