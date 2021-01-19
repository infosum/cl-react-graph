import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
export declare type TPoints = Omit<IProps, 'line'> & {
    radius?: number;
    fill?: string;
    stroke?: string;
};
declare const Points: FC<TPoints>;
export default Points;
