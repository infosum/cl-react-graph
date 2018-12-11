import { Component } from 'react';
import { IAxes, IChartState, IDomain, IGrid, IHistogramBar, IHistogramData, IMargin, IStroke, TipContentFn } from './Histogram';
export interface IJoyPlotProps {
    axis?: IAxes;
    bar?: IHistogramBar;
    className?: string;
    data: IHistogramData[];
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
declare class Histogram extends Component<IJoyPlotProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: Partial<IJoyPlotProps>;
    constructor(props: IJoyPlotProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): IJoyPlotProps;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default Histogram;
