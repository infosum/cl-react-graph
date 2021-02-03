import { FC } from 'react';
import { IAxes } from '../legacy/types';
import { IChartPoint, IChartPointValue, ILineProps } from '../LineChart';
interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    label?: string;
    line: ILineProps;
    width: number;
    left: number;
    height: number;
    axis: IAxes;
    data: T[];
}
declare const AreaFill: FC<IProps>;
export default AreaFill;
