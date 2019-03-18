import { Component } from 'react';
import { DeepPartial } from './utils/types';
export interface IChartAdaptor<P> {
    create: (el: Element, props: DeepPartial<P>) => void;
    update: (el: Element, props: DeepPartial<P>) => void;
    destroy: (el: Element) => void;
}
export interface IHistogramBar {
    groupMargin: number;
    margin: number;
    width: number;
}
export interface IGrid {
    x: {
        height: number;
        ticks: number;
        visible: boolean;
        style: ISVGLineStyle;
    };
    y: {
        style: ISVGLineStyle;
        ticks: number;
        visible: boolean;
    };
}
export interface IStroke {
    color: ((d: any, i: number, colors: (i: number) => string) => string) | string;
    dasharray: string;
    linecap: 'butt' | 'round' | 'square';
    width: number;
}
export interface IAxes {
    y: IAxis;
    x: IAxis;
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
    max: number | null;
    min: number | null;
}
export interface IMargin {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export interface IHistogramProps {
    axis: IAxes;
    bar: IHistogramBar;
    className: string;
    data: IHistogramData;
    delay: number;
    duration: number;
    colorScheme: string[];
    domain: IDomain;
    grid: IGrid;
    height: number;
    margin: IMargin;
    stacked: boolean;
    stroke: IStroke;
    tip: any;
    tipContainer: string;
    tipContentFn: TipContentFn<string>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare type Scale = 'LINEAR' | 'TIME' | 'LOG';
export interface ISVGLineStyle {
    'stroke': string;
    'fill': string;
    'opacity': number;
    'stroke-width': number;
    'stroke-opacity': number;
    'shape-rendering': string;
    'visible': boolean;
}
interface ISVGTextStyle {
    fill?: string;
    'font-size'?: string;
    dy?: string | number;
    'stroke-opacity'?: number;
    'text-anchor'?: string;
    transform?: string;
    x?: string | number;
    y?: string | number;
}
export interface IChartState {
    parentWidth?: number;
}
export interface IAxis {
    dateFormat: string;
    numberFormat: string;
    ticks: number;
    tickValues: number[];
    height: number;
    label: string;
    margin: number;
    scale: Scale;
    style: ISVGLineStyle;
    text: {
        style: ISVGTextStyle;
    };
    width: number;
    tickSize: number;
    visible: boolean;
}
export declare type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;
/**
 * Histogram component
 */
declare class Histogram extends Component<DeepPartial<IHistogramProps>, IChartState> {
    private chart;
    private ref;
    /**
     * Constructor
     */
    constructor(props: DeepPartial<IHistogramProps>);
    /**
     * Handle the page resize
     */
    private handleResize;
    /**
     * Component mounted
     */
    componentDidMount(): void;
    /**
     * Component updated
     */
    componentDidUpdate(): void;
    /**
     * Get the chart state
     */
    getChartState(): DeepPartial<IHistogramProps>;
    /**
     * Component will un mount, remove the chart and
     * any event listeners
     */
    componentWillUnmount(): void;
    /**
     * Get the chart's dom node
     */
    private getDOMNode;
    /**
     * Render
     */
    render(): JSX.Element;
}
export default Histogram;
