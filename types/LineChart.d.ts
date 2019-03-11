import * as React from 'react';
import { IAxes, IGrid, IMargin, ISVGLineStyle, TipContentFn } from './Histogram';
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
    curveType: any;
    stroke: string;
    strokeDashOffset: number;
    strokeDashArray: string;
}
export interface ILineChartDataSet<T> {
    label: string;
    point?: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
    };
    line?: ILineProps;
    data: T[];
}
export interface ISVGPoint extends ISVGLineStyle {
    radius?: 4;
    show: boolean;
}
export interface ILineChartProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    axis?: IAxes;
    className?: string;
    data: Array<ILineChartDataSet<T>>;
    fx?: (n: number) => number;
    grid?: IGrid;
    height?: number | string;
    margin?: IMargin;
    tip?: any;
    tipContainer?: string;
    tipContentFn?: TipContentFn<{
        x: string | number;
        y: string | number;
    }>;
    visible?: {
        [key: string]: boolean;
    };
    width?: number | string;
}
declare class LineChart extends React.Component<ILineChartProps, IState> {
    private chart;
    private ref;
    constructor(props: ILineChartProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): ILineChartProps;
    componentWillUnmount(): void;
    getDOMNode(): Element | Text;
    render(): JSX.Element;
}
export default LineChart;
