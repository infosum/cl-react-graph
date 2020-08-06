import { FC } from 'react';
import { TTipFunc } from './components/ToolTip';
import { TAxisLabelFormat } from './components/YAxis';
import { IBarChartData } from './Histogram';
import { EChartDirection } from './v3/BarChart';
export interface IProps {
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IBarChartData[];
    direction?: EChartDirection;
    height: number;
    tip?: TTipFunc;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
}
/**
 * JoyPlot component
 */
declare const JoyPlot: FC<IProps>;
export default JoyPlot;
