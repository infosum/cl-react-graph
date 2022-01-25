import { EGroupedBarLayout, IBarChartDataSet } from '../Histogram';
import { ILineChartDataSet } from '../LineChart';
import { IScatterPlotDataSet } from '../ScatterPlot';
interface ILIneProps {
    values: ILineChartDataSet<any>[];
    clampToZero?: boolean;
}
interface IScatterProps {
    values: IScatterPlotDataSet<any>[];
    clampToZero?: boolean;
}
interface IProps {
    groupLayout: EGroupedBarLayout;
    bins: string[];
    values: IBarChartDataSet[];
    clampToZero?: boolean;
    /**
     * Axis tick values - these could have a greater extend than the chart data so should
     * be included in the domain calculation
     */
    tickValues: number[];
}
export declare const useHistogramDomain: (props: IProps) => [number, number];
export declare const useLineDomain: (props: ILIneProps) => [number, number];
export declare const useScatterDomain: (props: IScatterProps) => [number, number];
export {};
