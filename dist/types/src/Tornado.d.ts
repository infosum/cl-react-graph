import { FC } from 'react';
import { EChartDirection } from './BarChart';
import { TTipFunc } from './components/ToolTip';
import { EGroupedBarLayout, IHistogramBar } from './Histogram';
export interface ITornadoDataSet {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: [number[], number[]];
}
export interface ITornadoData {
    bins: string[];
    counts: ITornadoDataSet[];
    colorScheme?: string[];
    title?: string;
}
export interface IProps {
    /** @description bar colour scheme */
    colorScheme?: string[];
    data: ITornadoData;
    direction?: EChartDirection;
    groupLayout: EGroupedBarLayout;
    height: number;
    id?: string;
    /** @description Height in px of the axis which labels the left/right values */
    splitAxisHeight?: number;
    /** @description labels for the left/right split axis  */
    splitBins: [string, string];
    visible?: Record<string, boolean>;
    xAxisHeight?: number;
    yAxisWidth?: number;
    width: number;
    /** @description Padding inside the chart svg */
    chartPadding?: number;
    /** @description bar chart bar padding */
    padding?: IHistogramBar;
    showBinPercentages: boolean;
    /** @description Chart <title /> */
    title?: string;
    tip?: TTipFunc;
}
export declare const Tornado: FC<IProps>;
export default Tornado;
