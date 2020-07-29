import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { TTipFunc } from '../components/ToolTip';
import { EGroupedBarLayout, IGrid, IHistogramBar, IHistogramData } from '../Histogram';
export declare enum EChartDirection {
    'horizontal' = 0,
    'vertical' = 1
}
interface IProps {
    animation?: SpringConfig;
    colorScheme?: string[];
    data: IHistogramData;
    direction?: EChartDirection;
    grid?: IGrid;
    groupLayout?: EGroupedBarLayout;
    height: number;
    padding?: IHistogramBar;
    tip?: TTipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
}
declare const Histogram: FC<IProps>;
export default Histogram;
