import { IAxis, IChartAdaptor, IHistogramProps } from './Histogram';
export declare const formatTickTime: (axis: IAxis) => (v: string | number) => string;
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
