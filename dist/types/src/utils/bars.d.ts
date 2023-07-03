import { ScaleBand } from 'd3-scale';
import { ExtendedGroupItem } from '../components/Bars/Bars';
import { EGroupedBarLayout, HistogramBar } from '../Histogram';
export type GroupedProps = {
    groupLayout: EGroupedBarLayout;
    stacked?: boolean;
};
export declare const groupedBarsUseSameXAxisValue: ({ groupLayout, stacked }: GroupedProps) => boolean;
/**
 *This is the inner padding between each grouped dataset or single datasets.
 */
export declare const paddingInner: (bar: HistogramBar) => number;
/**
 * Padding for the outside of grouped datasets or single datasets
 *
 */
export declare const paddingOuter: (bar: HistogramBar) => number;
/**
 * Get the bar width
 * Uses the (grouped)inner/outer padding bar properties.
 * if layout = OVERLAID then offset by the overlayMargin.
 * If the overlayMargin < 1 then use it as a percentage offset of the bar width
 * If its >= 1 then use as a pixel offset
 * @return number min of 1
 */
export declare const getBarWidth: (i: number, groupLayout: EGroupedBarLayout, bar: HistogramBar, innerScaleBand: ScaleBand<string>) => number;
/**
 * When grouping data this is the spacing between the group's bars.
 */
export declare const groupedPaddingInner: (bar: HistogramBar) => number;
/**
 * When grouping data this is the spacing to the left of the first and the right of the last bar.
 */
export declare const groupedPaddingOuter: (bar: HistogramBar) => number;
export declare const buildBarDatasets: ({ values, bins, visible, }: {
    values: any;
    bins: any;
    visible: any;
}) => {
    binLabels: any;
    dataSets: ExtendedGroupItem[];
};
