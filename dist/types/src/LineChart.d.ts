import { CurveFactory, CurveFactoryLineOnly } from "d3-shape";
import { FC } from "react";
import { PointComponentProps } from "./components/Points";
import { TAxisLabelFormat } from "./components/YAxis";
import { Grid as GridProps } from "./Histogram";
import { ColorSchemeItem } from "./utils/colorScheme";
import { Axes } from "./utils/types";
export type ChartPointValue = number | string | Date | object;
export type ChartPoint<X extends ChartPointValue = Date | number | string, Y extends ChartPointValue = number> = {
    x: X;
    y: Y;
    z?: number;
};
export type AnyChartPoint = ChartPoint<ChartPointValue, ChartPointValue>;
export type LineProps = {
    show: boolean;
    fill: {
        show: boolean;
        fill: ColorSchemeItem;
    };
    curveType: CurveFactory | CurveFactoryLineOnly;
    stroke: string;
    strokeDashOffset: number;
    strokeDashArray: string;
};
export type LineChartDataSet<T> = {
    label: string;
    point: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
        showTitle?: boolean;
    };
    line: LineProps;
    data: T[];
};
export type Props<T extends AnyChartPoint = ChartPoint> = {
    axis: Axes;
    data: LineChartDataSet<T>[];
    grid?: GridProps;
    height: number;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
    /** @description Chart <title /> */
    title?: string;
    description?: string;
    /**
     * @description if true then adds a 0 to the data domain. Useful if you don't want your lowest value to appear on top of the x axis
     */
    clampToZero?: boolean;
    axisLabelFormat?: TAxisLabelFormat;
    /** @description Custom component to override the default <circle /> used to plot points */
    PointComponent?: FC<PointComponentProps>;
};
export declare const LineChart: ({ axis, axisLabelFormat, clampToZero, data, description, grid, height, PointComponent, title, width, xAxisHeight, yAxisWidth, }: Props) => JSX.Element;
