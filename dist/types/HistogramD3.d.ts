import { IAxis, IChartAdaptor, IHistogramProps } from './Histogram';
export declare const shouldFormatTick: (axis: IAxis) => boolean;
export declare const formatTick: (axis: IAxis) => (v: string | number) => string | number;
export interface IGroupDataItem {
    label: string;
    groupLabel?: string;
    value: number;
}
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
