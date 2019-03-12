import React from 'react';
import { IAxes, IChartState, IDomain, IGrid, IHistogramBar, IHistogramData, IMargin, IStroke, TipContentFn } from './Histogram';
export interface IJoyPlotProps {
    axis: IAxes;
    bar: IHistogramBar;
    className: string;
    data: IHistogramData[];
    delay: number;
    duration: number;
    colorScheme: string[];
    domain: IDomain;
    grid: IGrid;
    height: number;
    margin: IMargin;
    stroke: IStroke;
    tip: any;
    tipContainer: string;
    tipContentFn: TipContentFn<string>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
/**
 * JoyPlot component
 */
declare class JoyPlot extends React.Component<IJoyPlotProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: Partial<IJoyPlotProps>;
    /**
     * Constructor
     */
    constructor(props: IJoyPlotProps);
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
    getChartState(): IJoyPlotProps;
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
export default JoyPlot;
