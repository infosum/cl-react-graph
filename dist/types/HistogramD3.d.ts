import { IChartAdaptor, IHistogramProps } from './Histogram';
export interface IGroupDataItem {
    label: string;
    groupLabel?: string;
    value: number;
}
export declare type IGroupData = IGroupDataItem[][];
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
