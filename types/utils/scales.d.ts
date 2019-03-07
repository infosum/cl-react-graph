import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';
import { IAxes } from '../';
export declare type AnyScale = ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any>;
export declare const buildScales: (axis: IAxes) => AnyScale[];
