import { FC } from 'react';
import { PointComponentProps } from './components/Points';
import { TAxisLabelFormat } from './components/YAxis';
import { Grid as GridProps } from './Histogram';
import { AnyChartPoint, ChartPoint } from './LineChart';
import { Axes } from './utils/types';
export type ScatterPlotDataSet<T> = {
    label: string;
    point: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
        showTitle?: boolean;
    };
    data: T[];
};
export type Props<T extends AnyChartPoint = ChartPoint> = {
    axis: Axes;
    data: ScatterPlotDataSet<T>[];
    grid?: GridProps;
    height: number;
    id?: string;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
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
export declare const ScatterPlot: ({ axis, clampToZero, data, grid, height, width, xAxisHeight, yAxisWidth, title, description, axisLabelFormat, PointComponent, }: Props) => JSX.Element;
