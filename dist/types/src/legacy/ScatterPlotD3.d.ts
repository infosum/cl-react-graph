import { IScatterPlotProps } from './ScatterPlot';
import { IChartAdaptor } from './types';
export declare type IChartPointValue = number | string | Date | object;
export declare const scatterPlotD3: () => IChartAdaptor<IScatterPlotProps>;
