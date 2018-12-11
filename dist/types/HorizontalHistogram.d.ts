import { Component } from 'react';
import { IHistogramProps } from './Histogram';
import { IChartState } from './Histogram';
declare class HorizontalHistogram extends Component<IHistogramProps, IChartState> {
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
    constructor(props: IHistogramProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): IHistogramProps;
    componentWillReceiveProps(props: IHistogramProps): void;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default HorizontalHistogram;
