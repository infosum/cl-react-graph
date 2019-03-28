import { IAxis, IChartAdaptor, IHistogramProps } from './Histogram';
export declare const shouldFormatTick: (axis: IAxis) => boolean;
export declare const formatTick: (axis: IAxis) => (v: string | number) => string;
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
