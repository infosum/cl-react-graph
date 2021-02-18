import { FC } from 'react';
import { IPointStyle } from './Points';
export declare const defaultPointStyle: IPointStyle;
export interface IPointProps {
    id?: string;
    /** @description Pixel x value */
    cx: number;
    /** @description Pixel y value */
    cy: number;
    /** @description Actual X value */
    x: number | string | Date;
    /** @description Actual Y value */
    y: number | string | Date;
    z: number;
    className?: string;
}
declare const Point: FC<IPointStyle & IPointProps>;
export default Point;
