import { FC } from 'react';
import { IHistogramData } from './Histogram';
export interface IProps {
    data: IHistogramData[];
    height: number;
    width: number;
}
/**
 * JoyPlot component
 */
declare const JoyPlot: FC<IProps>;
export default JoyPlot;
