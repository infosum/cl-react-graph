import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { FC } from 'react';
import { IAxes, IGrid, IMargin, ISVGLineStyle, TipContentFn } from './Histogram';
import { DeepPartial } from './utils/types';
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
export interface ISVGPoint extends ISVGLineStyle {
    radius?: 4;
    show: boolean;
}
export interface ILineChartProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    axis: IAxes;
    className: string;
    data: ILineChartDataSet<T>[];
    grid: IGrid;
    height: number | string;
    margin: IMargin;
    tip: any;
    tipContainer?: string;
    tipContentFn: TipContentFn<{
        x: string | number;
        y: string | number;
    }>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare const LineChart: FC<DeepPartial<ILineChartProps>>;
export default LineChart;
