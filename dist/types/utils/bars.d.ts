import { ScaleBand } from 'd3-scale';
import { EGroupedBarLayout, IHistogramBar } from '../Histogram';
export interface IGroupedProps {
    groupLayout: EGroupedBarLayout;
    stacked?: boolean;
}
export declare const groupedBarsUseSameXAxisValue: ({ groupLayout, stacked }: IGroupedProps) => boolean;
/**
 *This is the inner padding between each grouped dataset or single datasets.
 */
export declare const paddingInner: (bar: IHistogramBar) => number;
/**
 * Padding for the outside of grouped datasets or single datasets
 *
 */
export declare const paddingOuter: (bar: IHistogramBar) => number;
/**
 * Get the bar width - using the innerScale and offsetting it layout = OVERLAID
 * Note: this did use bar.width - but its not compatible with the way scale bands work.
 * Instead use the (grouped)inner/outer padding bar properties.
 */
export declare const getBarWidth: (i: number, groupLayout: EGroupedBarLayout, bar: IHistogramBar, innerScaleBand: ScaleBand<string>) => number;
/**
 * When grouping data this is the spacing between the group's bars.
 */
export declare const groupedPaddingInner: (bar: IHistogramBar) => number;
/**
 * When grouping data this is the spacing to the left of the first and the right of the last bar.
 */
export declare const groupedPaddingOuter: (bar: IHistogramBar) => number;
