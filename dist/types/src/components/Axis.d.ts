import { FC } from 'react';
declare type TAxis = 'x' | 'y';
declare type TAxisValue = string | number;
interface IAxis {
    stroke?: string;
    height: number;
    width: number;
    textWidth?: number;
    axis: TAxis;
    values: TAxisValue[];
    tickSize?: number;
}
declare const Axis: FC<IAxis>;
export default Axis;
