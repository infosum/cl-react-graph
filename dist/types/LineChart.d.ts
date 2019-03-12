import { CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import React from 'react';
import { IAxes, IGrid, IMargin, ISVGLineStyle, TipContentFn } from './Histogram';
import { DeepPartial } from './utils/types';
interface IState {
    parentWidth?: number;
}
export declare type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number, Y extends IChartPointValue = number> {
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
    data: Array<ILineChartDataSet<T>>;
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
declare class LineChart extends React.Component<DeepPartial<ILineChartProps>, IState> {
    private chart;
    private ref;
    constructor(props: DeepPartial<ILineChartProps>);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    /**
     * Get the chart state. If a histogram has been assigned
     * to the props, then render this data. Otherwise generate
     * a random normal dist
     */
    getChartState(): DeepPartial<ILineChartProps>;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default LineChart;
