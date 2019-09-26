import { IChartAdaptor } from './Histogram';
import { ITornadoDataSet, ITornadoProps } from './Tornado';
export declare const maxValueCount: (counts: ITornadoDataSet[]) => number;
export declare const tornadoD3: () => IChartAdaptor<ITornadoProps>;
