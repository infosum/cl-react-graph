import { EGroupedBarLayout, IHistogramDataSet } from '../Histogram';
import { ILineChartDataSet } from '../LineChart';
interface ILIneProps {
    values: ILineChartDataSet<any>[];
    clampToZero?: boolean;
}
interface IProps {
    groupLayout: EGroupedBarLayout;
    bins: string[];
    values: IHistogramDataSet[];
    clampToZero?: boolean;
}
export declare const useHistogramDomain: (props: IProps) => [number, number];
export declare const useLineDomain: (props: ILIneProps) => [number, number];
export {};
