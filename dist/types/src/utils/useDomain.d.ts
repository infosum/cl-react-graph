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
}
export declare const useHistogramDomain: (props: IProps) => [number, number];
export declare const useLineDomain: (props: ILIneProps) => [number, number];
export declare const useScatterDomain: (props: IScatterProps) => [number, number];
export {};
