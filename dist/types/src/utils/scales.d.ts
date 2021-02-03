import { ScaleBand, ScaleLinear, ScaleLogarithmic, ScalePoint, ScaleTime } from 'd3-scale';
import { IAxes } from '../';
export declare type AnyScale = ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any> | ScaleBand<string> | ScalePoint<string>;
export declare const buildScales: (axis: IAxes) => (ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any>)[];
