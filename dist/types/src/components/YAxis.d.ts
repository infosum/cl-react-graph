import { FC, SVGAttributes } from 'react';
import { IHistogramBar } from '../Histogram';
export declare type TAxisValue = string | number;
export declare type TAxisLabelFormat = (axis: 'x' | 'y', bin: string, i: number) => string;
export interface IAxis {
    stroke?: string;
    height: number;
    width: number;
    values?: string[] | number[];
    tickSize?: number;
    path?: SVGAttributes<SVGPathElement>;
    scale?: 'linear' | 'band';
    top?: number;
    domain?: TAxisValue[];
    left?: number;
    padding?: IHistogramBar;
    labelFormat?: TAxisLabelFormat;
    tickFormat?: {
        stroke: string;
    };
}
export declare const defaultTickFormat: {
    stroke: string;
};
export declare const defaultPath: SVGAttributes<SVGPathElement>;
declare const YAxis: FC<IAxis>;
export default YAxis;
