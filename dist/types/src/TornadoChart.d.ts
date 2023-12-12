/// <reference types="react" />
import { EChartDirection } from "./BarChart";
import { TipFunc } from "./components/ToolTip";
import { EGroupedBarLayout, HistogramBar } from "./Histogram";
import { ColorScheme } from "./utils/colorScheme";
type TornadoDataSet = {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: [number[], number[]];
};
export type TornadoData = {
    bins: string[];
    counts: TornadoDataSet[];
    colorScheme?: ColorScheme;
    title?: string;
};
export type Props = {
    /** @description bar color scheme */
    colorScheme?: ColorScheme;
    data: TornadoData;
    direction?: EChartDirection;
    groupLayout: EGroupedBarLayout;
    height: number;
    id?: string;
    /** @description Height in px of the axis which labels the left/right values */
    splitAxisHeight?: number;
    /** @description labels for the left/right split axis  */
    splitBins?: [string, string];
    visible?: Record<string, boolean>;
    xAxisHeight?: number;
    yAxisWidth?: number;
    width: number;
    /** @description Padding inside the chart svg */
    chartPadding?: number;
    /** @description bar chart bar padding */
    padding?: HistogramBar;
    showBinPercentages: boolean;
    /** @description Chart <title /> */
    title?: string;
    tip?: TipFunc;
    bars?: {
        /** @description radius (px) of bar rounded end's curves. Default 0 - no rounded ends */
        radius?: number;
    };
};
export declare const TornadoChart: ({ colorScheme, data, id, direction, groupLayout, height, splitBins, width, visible, xAxisHeight, splitAxisHeight, yAxisWidth, chartPadding, padding, showBinPercentages, title, tip, bars, }: Props) => JSX.Element | null;
export {};
