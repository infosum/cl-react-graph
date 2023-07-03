import { EChartDirection } from './BarChart';
import { TipFunc } from './components/ToolTip';
import { ELabelOrientation, TAxisLabelFormat } from './components/YAxis';
import { BarChartData, HistogramBar } from './Histogram';
export type Props = {
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: string[];
    data: BarChartData[];
    direction?: EChartDirection;
    height: number;
    padding?: HistogramBar;
    tip?: TipFunc;
    title?: string;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    titleHeight?: number;
    titleLayout?: ELabelOrientation;
};
/**
 * JoyPlot component
 */
export declare const JoyPlot: ({ axisLabelFormat, colorScheme, data, direction, height, tip, width, xAxisHeight, padding, yAxisWidth, title, titleHeight, titleLayout, }: Props) => JSX.Element;
