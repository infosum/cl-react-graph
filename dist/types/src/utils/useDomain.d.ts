import { BarChartDataSet, EGroupedBarLayout } from '../Histogram';
import { LineChartDataSet } from '../LineChart';
import { ScatterPlotDataSet } from '../ScatterPlot';
type LineProps = {
    values: LineChartDataSet<any>[];
    clampToZero?: boolean;
};
type ScatterProps = {
    values: ScatterPlotDataSet<any>[];
    clampToZero?: boolean;
};
type Props = {
    groupLayout: EGroupedBarLayout;
    bins: string[];
    values: BarChartDataSet[];
    clampToZero?: boolean;
    /**
     * Axis tick values - these could have a greater extend than the chart data so should
     * be included in the domain calculation
     */
    tickValues: number[];
};
export declare const useHistogramDomain: (props: Props) => [number, number];
export declare const useLineDomain: (props: LineProps) => [number, number];
export declare const useScatterDomain: (props: ScatterProps) => [number, number];
export {};
