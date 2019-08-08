import { ScaleBand } from 'd3-scale';
import { EGroupedBarLayout, IHistogramBar } from '../Histogram';
export interface IGroupedProps {
    groupLayout: EGroupedBarLayout;
    stacked: boolean;
}
export declare const groupedBarsUseSameXAxisValue: ({ groupLayout, stacked }: IGroupedProps) => boolean;
export declare const barMargin: (bar: IHistogramBar) => number;
export declare const getBarWidth: (i: number, groupLayout: EGroupedBarLayout, bar: IHistogramBar, innerScaleBand: ScaleBand<string>) => number;
export declare const groupedMargin: (bar: IHistogramBar) => number;
