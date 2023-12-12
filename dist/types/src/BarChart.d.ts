/// <reference types="react" />
import { SpringConfig } from "@react-spring/web";
import { TLabelComponent } from "./components/Label";
import { TipFunc } from "./components/ToolTip";
import { Axis, ELabelOrientation, TAxisLabelFormat, TTickFormat } from "./components/YAxis";
import { BarChartData, EGroupedBarLayout, Grid as GridProps, HistogramBar } from "./Histogram";
import { ColorScheme } from "./utils/colorScheme";
export declare enum EChartDirection {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
type Props = {
    animation?: SpringConfig;
    axisLabelFormat?: TAxisLabelFormat;
    colorScheme?: ColorScheme;
    data: BarChartData;
    direction?: EChartDirection;
    id?: string;
    grid?: GridProps;
    axis?: {
        x?: {
            path?: Axis["path"];
            labelOrientation: ELabelOrientation;
            tickSize?: number;
            tickFormat?: TTickFormat;
        };
        y?: {
            path?: Axis["path"];
            labelOrientation: ELabelOrientation;
            tickSize?: number;
            tickFormat?: TTickFormat;
        };
    };
    groupLayout?: EGroupedBarLayout;
    height: number;
    LabelComponent?: TLabelComponent;
    padding?: HistogramBar;
    showLabels?: boolean[];
    /** An array of tick values to show on the numerical axis */
    tickValues?: number[];
    tip?: TipFunc;
    /** @description Chart <title /> */
    title?: string;
    visible?: Record<string, boolean>;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    bars?: {
        /** @description radius (px) of bar rounded end's curves. Default 0 - no rounded ends */
        radius?: number;
    };
    /** @description nodes rendered after/above the bars */
    labels?: string[];
};
export declare const BarChart: ({ animation, axisLabelFormat, colorScheme, data, direction, grid, id, groupLayout, height, LabelComponent, padding, showLabels, tip, visible, width, xAxisHeight, yAxisWidth, tickValues, bars, title, axis, labels, }: Props) => JSX.Element | null;
export {};
