import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { EGroupedBarLayout, IGrid, IHistogramBar, IHistogramData } from '../Histogram';
export declare enum EChartDirection {
    'horizontal' = 0,
    'vertical' = 1
}
interface IProps {
    animation?: SpringConfig;
    data: IHistogramData;
    direction?: EChartDirection;
    grid?: IGrid;
    groupLayout?: EGroupedBarLayout;
    height: number;
    padding?: IHistogramBar;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
}
declare const Histogram: FC<IProps>;
export default Histogram;
