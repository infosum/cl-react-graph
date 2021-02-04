import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
export declare type TPoints = Omit<IProps, 'line'> & {
    radius?: number;
    fill?: string;
    label?: string;
    stroke?: string;
    showTitle?: boolean;
};
declare const Points: FC<TPoints>;
export default Points;
