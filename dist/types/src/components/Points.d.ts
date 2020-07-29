import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
declare const Points: FC<Omit<IProps, 'line'> & {
    radius?: number;
    fill?: string;
    stroke?: string;
}>;
export default Points;
