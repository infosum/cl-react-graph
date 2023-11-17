import { EChartDirection } from "./BarChart";
import { TipFunc } from "./components/ToolTip";
import { ELabelOrientation, TAxisLabelFormat } from "./components/YAxis";
import { BarChartData, HistogramBar } from "./Histogram";
import { ColorScheme } from "./utils/colorScheme";
export type Props = {
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: ColorScheme;
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
    bars?: {
        /** @description radius (px) of bar rounded end's curves. Default 0 - no rounded ends */
        radius?: number;
    };
};
/**
 * JoyPlot component
 */
export declare const JoyPlot: ({ axisLabelFormat, colorScheme, data, direction, height, tip, width, xAxisHeight, padding, yAxisWidth, title, titleHeight, titleLayout, bars, }: Props) => JSX.Element;
