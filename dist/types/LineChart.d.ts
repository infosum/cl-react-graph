import { Component } from 'react';
import { IAxes, IGrid, IMargin, ISVGLineStyle, TipContentFn } from './Histogram';
interface IState {
    parentWidth?: number;
}
export declare type IChartPointValue = number | string | Date;
export interface IChartPoint {
    x: IChartPointValue;
    y: IChartPointValue;
}
export interface ILineChartDataSet {
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
    data: IChartPoint[];
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
