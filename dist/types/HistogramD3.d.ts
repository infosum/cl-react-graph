/// <reference types="react" />
import { IAxis, IChartAdaptor, IHistogramProps } from './Histogram';
export declare const formatTickTime: (axis: IAxis) => (v: import("react").ReactText) => string;
export declare const histogramD3: () => IChartAdaptor<IHistogramProps>;
