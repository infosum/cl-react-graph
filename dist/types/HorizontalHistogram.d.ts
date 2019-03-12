import { Component } from 'react';
import { IChartState, IHistogramProps } from './Histogram';
import { DeepPartial } from './utils/types';
/**
 * Horizontal Histogram component
 */
declare class HorizontalHistogram extends Component<DeepPartial<IHistogramProps>, IChartState> {
    private histogram;
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
     * Props recieved, update the chart
     */
    componentWillReceiveProps(): void;
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
