import { ScaleBand, ScaleLinear, ScaleLogarithmic, ScalePoint, ScaleSymLog, ScaleTime } from "d3-scale";
import { Axes } from "../";
export type AnyScale = ScaleLinear<number, number> | ScaleTime<any, any> | ScaleLogarithmic<any, any> | ScaleSymLog<any, any> | ScaleBand<string> | ScalePoint<string>;
export declare const buildScales: (axis: Axes) => (ScaleLinear<number, number, never> | ScaleTime<any, any, never> | ScaleSymLog<any, any, never>)[];
