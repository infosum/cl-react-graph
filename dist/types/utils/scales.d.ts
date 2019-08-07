import { ScaleLinear, ScaleLogarithmic, ScaleTime, ScaleBand } from 'd3-scale';
import { IAxes } from '../';
export declare type AnyScale = ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any> | ScaleBand<string>;
export declare const buildScales: (axis: IAxes) => (ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any>)[];
