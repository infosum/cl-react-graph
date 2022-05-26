import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { FC } from 'react';
import { PointComponentProps } from './components/Points';
import { TAxisLabelFormat } from './components/YAxis';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
export declare type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number | string, Y extends IChartPointValue = number> {
    x: X;
    y: Y;
    z?: number;
}
export declare type IAnyChartPoint = IChartPoint<IChartPointValue, IChartPointValue>;
export interface ILineProps {
    show: boolean;
    fill: {
        show: boolean;
        fill: string;
    };
    curveType: CurveFactory | CurveFactoryLineOnly;
    stroke: string;
    strokeDashOffset: number;
    strokeDashArray: string;
}
export interface ILineChartDataSet<T> {
    label: string;
    point: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
        showTitle?: boolean;
    };
    line: ILineProps;
    data: T[];
}
export interface IProps<T extends IAnyChartPoint = IChartPoint> {
    axis: IAxes;
    data: ILineChartDataSet<T>[];
    grid?: IGrid;
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
}
declare const LineChart: FC<IProps>;
export default LineChart;
