import { FC } from 'react';
import { IProps } from '../utils/useMakeLine';
declare type Props = {
    animate?: boolean;
    label: string;
} & IProps;
declare const Line: FC<Props>;
export default Line;
