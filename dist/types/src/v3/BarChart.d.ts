import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { TTipFunc } from '../components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from '../components/YAxis';
import { EGroupedBarLayout, IBarChartData, IGrid, IHistogramBar } from '../Histogram';
export declare enum EChartDirection {
    'horizontal' = 0,
    'vertical' = 1
}
interface IProps {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IBarChartData;
    direction?: EChartDirection;
    grid?: IGrid;
    groupLayout?: EGroupedBarLayout;
    height: number;
    padding?: IHistogramBar;
    tip?: TTipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
}
declare const BarChart: FC<IProps>;
export default BarChart;
