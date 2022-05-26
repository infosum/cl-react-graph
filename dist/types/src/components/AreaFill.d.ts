import { FC } from 'react';
import { IAxes } from '../legacy/types';
import { IAnyChartPoint, IChartPoint, ILineProps } from '../LineChart';
interface IProps<T extends IAnyChartPoint = IChartPoint> {
    label?: string;
    line: ILineProps;
    width: number;
    left: number;
    height: number;
    axis: IAxes;
    data: T[];
}
export declare const AreaFill: FC<IProps>;
export default AreaFill;
