import { Component } from 'react';
import { IAxes, IGrid, IMargin, ISVGLineStyle, TipContentFn } from './Histogram';
interface IState {
    parentWidth?: number;
}
export declare type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date, Y extends IChartPointValue = number> {
    x: X;
    y: Y;
}
export interface ILineChartDataSet<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
    label: string;
    point?: {
        radius: number;
        stroke: string;
        fill: string;
        show: boolean;
    };
    line?: {
        show: boolean;
        fill?: {
            show: boolean;
            fill: string;
        };
        curveType?: any;
        stroke?: string;
        strokeDashOffset?: number;
        strokeDashArray?: string;
    };
    data: T[];
}
export interface ISVGPoint extends ISVGLineStyle {
    radius?: 4;
}
export interface ILineChartProps {
    axis?: IAxes;
    className?: string;
    data?: ILineChartDataSet[];
    fx?: (n: number) => number;
    grid?: IGrid;
    height?: number | string;
    line?: any;
    margin?: IMargin;
    point?: ISVGPoint;
    tip?: any;
    tipContainer?: string;
    tipContentFn?: TipContentFn<{
        x: string | number;
        y: string | number;
    }>;
    width?: number | string;
}
declare class LineChart extends Component<ILineChartProps, IState> {
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
