import { FC } from 'react';
import { IBarChartData } from './Histogram';
export interface IProps {
    data: IBarChartData[];
    height: number;
    width: number;
}
/**
 * JoyPlot component
 */
declare const JoyPlot: FC<IProps>;
export default JoyPlot;
