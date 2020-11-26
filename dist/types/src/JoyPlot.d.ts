import { FC } from 'react';
import { TTipFunc } from './components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from './components/YAxis';
import { IBarChartData, IHistogramBar } from './Histogram';
import { EChartDirection } from './v3/BarChart';
export interface IProps {
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IBarChartData[];
    direction?: EChartDirection;
    height: number;
    padding?: IHistogramBar;
    tip?: TTipFunc;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    titleHeight?: number;
    titleLayout?: ELabelOrientation;
}
/**
 * JoyPlot component
 */
declare const JoyPlot: FC<IProps>;
export default JoyPlot;
