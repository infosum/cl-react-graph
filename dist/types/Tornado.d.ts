import { Component } from 'react';
import { EGroupedBarLayout, IAxes, IChartState, IDomain, IGrid, IHistogramBar, IMargin, IStroke, TipContentFn } from './Histogram';
import { IGroupDataItem } from './HistogramD3';
import { DeepPartial } from './utils/types';
export interface ITornadoDataSet {
    borderColors?: string[];
    colors?: string[];
    label: string;
    data: [number[], number[]];
}
export interface ITornadoData {
    bins: string[];
    counts: ITornadoDataSet[];
    colorScheme?: string[];
    title?: string;
}
export interface ITornadoProps {
    axis: IAxes;
    bar: IHistogramBar;
    center: boolean;
    className: string;
    data: ITornadoData;
    delay: number;
    duration: number;
    colorScheme: string[];
    domain: IDomain;
    grid: IGrid;
    height: number;
    margin: IMargin;
    groupLayout: EGroupedBarLayout;
    onClick?: (bar: IGroupDataItem) => void;
    showBinPercentages: boolean;
    splitBins: [string, string];
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
 * Tornado component
 */
declare class Tornado extends Component<DeepPartial<ITornadoProps>, IChartState> {
    private chart;
    private ref;
    /**
     * Constructor
     */
    constructor(props: DeepPartial<ITornadoProps>);
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
    getChartState(): DeepPartial<ITornadoProps>;
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
export default Tornado;
