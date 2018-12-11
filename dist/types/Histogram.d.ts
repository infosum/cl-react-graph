import { Component } from 'react';
export interface IChartAdaptor {
    create: (el: Element | Text, props: {
        [key: string]: any;
    }) => void;
    update: (el: Element | Text, props: {
        [key: string]: any;
    }) => void;
    destroy: (el: Element | Text) => void;
}
export interface IHistogramBar {
    groupMargin?: number;
    margin?: number;
    width?: number;
}
export interface IGrid {
    x?: {
        height?: number;
        ticks?: number;
        visible?: boolean;
        style?: ISVGLineStyle;
    };
    y?: {
        style?: ISVGLineStyle;
        ticks?: number;
        visible?: boolean;
    };
}
export interface IStroke {
    color: ((d: any, i: number, colors: (i: number) => string) => string) | string;
    dasharray?: string;
    linecap?: string;
    width: number;
}
export interface IAxes {
    y?: IAxis;
    x?: IAxis;
}
export interface IHistogramDataSet {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: number[];
}
export interface IHistogramData {
    bins: string[];
    counts: IHistogramDataSet[];
    colorScheme?: string[];
    title?: string;
}
export interface IDomain {
    max: number;
    min: number;
}
export interface IMargin {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export interface IHistogramProps {
    axis?: IAxes;
    bar?: IHistogramBar;
    className?: string;
    data: IHistogramData;
    delay?: number;
    duration?: number;
    colorScheme?: string[];
    domain?: IDomain;
    grid?: IGrid;
    height: number;
    margin?: IMargin;
    stroke?: IStroke;
    tip?: any;
    tipContainer?: string;
    tipContentFn?: TipContentFn<string>;
    visible?: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare type Scale = 'LINEAR' | 'TIME' | 'LOG';
export interface ISVGLineStyle {
    'stroke'?: string;
    'fill'?: string;
    'stroke-width'?: number;
    'stroke-opacity'?: number;
    'shape-rendering'?: string;
}
interface ISVGTextStyle {
    fill?: string;
    dy?: string | number;
    'text-anchor'?: string;
    transform?: string;
    x?: string | number;
    y?: string | number;
}
export interface IChartState {
    parentWidth?: number;
}
export interface IAxis {
    dateFormat?: string;
    numberFormat?: string;
    ticks?: number;
    tickValues?: number[];
    height?: number;
    label?: string;
    margin?: number;
    scale?: Scale;
    style?: ISVGLineStyle;
    text?: {
        style: ISVGTextStyle;
    };
    width?: number;
    tickSize?: number;
}
export declare type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;
declare class Histogram extends Component<IHistogramProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: Partial<IHistogramProps>;
    constructor(props: IHistogramProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): IHistogramProps;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default Histogram;
