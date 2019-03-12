import React from 'react';
import { IChartState, IHistogramProps } from './Histogram';
/**
 * Horizontal Histogram component
 */
declare class HorizontalHistogram extends React.Component<IHistogramProps, IChartState> {
    private histogram;
    private ref;
    static defaultProps: {
        axis: {};
        bar: {
            margin: number;
            width: number;
        };
        grid: {
            x: {
                style: {
                    'fill': string;
                    'stroke': string;
                    'stroke-opacity': number;
                    'stroke-width': number;
                };
                ticks: number;
                visible: boolean;
            };
            y: {
                style: {
                    'fill': string;
                    'stroke': string;
                    'stroke-opacity': number;
                    'stroke-width': number;
                };
                ticks: number;
                visible: boolean;
            };
        };
        height: number;
        margin: {
            left: number;
            top: number;
        };
        stroke: {
            color: (d: any, i: any, colors: any) => import("d3-color").RGBColor;
            width: number;
        };
        tipContentFn: (bins: string[], i: any, d: any) => string;
        width: string;
    };
    /**
     * Constructor
     */
    constructor(props: IHistogramProps);
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
    getChartState(): IHistogramProps;
    /**
     * Props recieved, update the chart
     */
    componentWillReceiveProps(props: IHistogramProps): void;
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
export default HorizontalHistogram;
