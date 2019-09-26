import { IChartAdaptor, IHistogramProps } from './Histogram';
export interface IGroupDataItem {
    label: string;
    groupLabel?: string;
    colorRef?: string;
    value: number;
    side?: 'left' | 'right';
}
export declare type IGroupData = IGroupDataItem[][];
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
