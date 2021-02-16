import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
export interface IPointProps {
    cx: number;
    x: number | string | Date;
    cy: number;
    y: number | string | Date;
    z: number;
    className?: string;
}
export declare type TPoints = Omit<IProps, 'line'> & {
    radius?: number;
    fill?: string;
    label?: string;
    stroke?: string;
    showTitle?: boolean;
    /** @description Custom component to override the default <circle /> used to plot points */
    PointComponent?: FC<IPointProps>;
};
declare const Points: FC<TPoints>;
export default Points;
