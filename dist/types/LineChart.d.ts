import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { FC } from 'react';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
export declare type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number | string, Y extends IChartPointValue = number> {
    x: X;
    y: Y;
}
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
    };
    line: ILineProps;
    data: T[];
}
export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    axis: IAxes;
    data: ILineChartDataSet<T>[];
    grid: IGrid;
    height: number;
    width: number;
    xAxisHeight?: number;
    yAxisWidth?: number;
}
declare const LineChart: FC<IProps>;
export default LineChart;
