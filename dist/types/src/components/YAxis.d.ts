import { ScaleBand } from 'd3-scale';
import { FC, SVGAttributes } from 'react';
import { IHistogramBar } from '../Histogram';
import { ISVGLineStyle, ISVGTextStyle } from '../legacy/types';
export declare type TAxisValue = string | number;
export declare type TAxisLabelFormat = (axis: 'x' | 'y', bin: string, i: number) => string;
export declare enum ELabelOrientation {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
declare type TTickFormat = (label: string, i: number) => {
    stroke: string;
    fontSize?: string;
};
export interface IAxis {
    stroke?: string;
    height: number;
    width: number;
    values?: string[] | number[];
    tickSize?: number;
    path?: SVGAttributes<SVGPathElement>;
    scale?: 'linear' | 'band' | 'point' | 'log' | 'time';
    top?: number;
    domain?: TAxisValue[];
    left?: number;
    padding?: IHistogramBar;
    labelFormat?: TAxisLabelFormat;
    /** @description make the axis ticks display in the opposite direction */
    inverse?: boolean;
    tickFormat?: {
        stroke: string;
        fontSize?: string;
    } | TTickFormat;
    labelOrientation?: ELabelOrientation;
    /** @deprecated used for backwards compat with legacy v2 components */
    numberFormat?: string;
    dateFormat?: string;
    label?: string;
    margin?: number;
    text?: {
        style: ISVGTextStyle;
    };
    style?: ISVGLineStyle;
}
export declare const defaultTickFormat: {
    stroke: string;
    fontSize: string;
};
export declare const defaultPath: SVGAttributes<SVGPathElement>;
interface IBuildScale {
    domain?: TAxisValue[];
    /** @description width for x axis, height for y axis */
    length: number;
    padding: IHistogramBar;
    scale: 'linear' | 'band' | 'point' | 'log' | 'time';
    values: string[] | number[];
    range: [number, number];
}
export declare const buildScale: ({ domain, length, padding, scale, values, range, }: IBuildScale) => ScaleBand<string> | import("d3-scale").ScaleLinear<number, number, never> | import("d3-scale").ScaleTime<any, any, never> | import("d3-scale").ScaleSymLog<any, any, never> | import("d3-scale").ScalePoint<string>;
declare const YAxis: FC<IAxis>;
export default YAxis;
