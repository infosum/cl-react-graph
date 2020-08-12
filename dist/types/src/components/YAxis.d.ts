import { FC, SVGAttributes } from 'react';
import { IHistogramBar } from '../Histogram';
export declare type TAxisValue = string | number;
export declare type TAxisLabelFormat = (axis: 'x' | 'y', bin: string, i: number) => string;
export declare enum ELabelOrientation {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
export interface IAxis {
    stroke?: string;
    height: number;
    width: number;
    values?: string[] | number[];
    tickSize?: number;
    path?: SVGAttributes<SVGPathElement>;
    scale?: 'linear' | 'band' | 'point';
    top?: number;
    domain?: TAxisValue[];
    left?: number;
    padding?: IHistogramBar;
    labelFormat?: TAxisLabelFormat;
    tickFormat?: {
        stroke: string;
        fontSize?: string;
    };
    labelOrientation?: ELabelOrientation;
}
export declare const defaultTickFormat: {
    stroke: string;
    fontSize: string;
};
export declare const defaultPath: SVGAttributes<SVGPathElement>;
declare const YAxis: FC<IAxis>;
export default YAxis;
