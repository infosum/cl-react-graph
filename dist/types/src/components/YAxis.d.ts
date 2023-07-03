import { ScaleBand } from 'd3-scale';
import { SVGAttributes } from 'react';
import { HistogramBar } from '../Histogram';
import { SVGLineStyle, SVGTextStyle } from '../utils/types';
export type TAxisValue = string | number;
export type TAxisLabelFormat = (axis: 'x' | 'y', bin: string, i: number) => string;
export declare enum ELabelOrientation {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
type TTickFormat = (label: string, i: number) => {
    stroke: string;
    fontSize?: string;
};
export type Axis = {
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
    padding?: HistogramBar;
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
        style: SVGTextStyle;
    };
    style?: SVGLineStyle;
};
export declare const defaultTickFormat: {
    stroke: string;
    fontSize: string;
};
export declare const defaultPath: SVGAttributes<SVGPathElement>;
type BuildScale = {
    domain?: TAxisValue[];
    /** @description width for x axis, height for y axis */
    length: number;
    padding: HistogramBar;
    scale: 'linear' | 'band' | 'point' | 'log' | 'time';
    values: string[] | number[];
    range: [number, number];
};
export declare const buildScale: ({ domain, length, padding, scale, values, range, }: BuildScale) => ScaleBand<string> | import("d3-scale").ScaleLinear<number, number, never> | import("d3-scale").ScaleTime<any, any, never> | import("d3-scale").ScaleSymLog<any, any, never> | import("d3-scale").ScalePoint<string>;
export declare const YAxis: ({ domain, labelFormat, height, left, path, padding, scale, tickSize, tickFormat, top, values, width, labelOrientation, inverse, }: Axis) => JSX.Element;
export {};
