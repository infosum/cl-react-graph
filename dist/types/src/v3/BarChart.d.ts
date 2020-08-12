import { FC } from 'react';
import { SpringConfig } from 'react-spring';
import { TLabelComponent } from '../components/Label';
import { TTipFunc } from '../components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from '../components/YAxis';
import { EGroupedBarLayout, IBarChartData, IGrid, IHistogramBar } from '../Histogram';
export declare enum EChartDirection {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
export declare const defaultPadding: IHistogramBar;
interface IProps {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: IBarChartData;
    direction?: EChartDirection;
    grid?: IGrid;
    groupLayout?: EGroupedBarLayout;
    height: number;
    LabelComponent?: TLabelComponent;
    padding?: IHistogramBar;
    showLabels?: boolean[];
    tip?: TTipFunc;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    xAxisLabelOrientation?: ELabelOrientation;
    yAxisWidth?: number;
}
declare const BarChart: FC<IProps>;
export default BarChart;
