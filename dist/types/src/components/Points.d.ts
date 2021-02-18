import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
import { IPointProps } from './Point';
export declare type PointComponentProps = IPointStyle & IPointProps;
export interface IPointStyle {
    z?: number;
    fill?: string;
    label?: string;
    stroke?: string;
    showTitle?: boolean;
    show?: boolean;
    /** @description Custom component to override the default <circle /> used to plot points */
    PointComponent?: FC<PointComponentProps>;
}
export declare type TPoints = Omit<IProps, 'line' | 'curveType'> & IPointStyle;
declare const Points: FC<TPoints>;
export default Points;
