import { Component } from 'react';
import { EColorManipulations, IChartState, IHistogramDataSet, IMargin, TipContentFn } from './Histogram';
import { DeepPartial } from './utils/types';
interface ILabels {
    display: boolean;
    displayFn: (d: any, ix: number) => string | number;
}
export interface IPieDataItem {
    count: number;
    groupLabel: string;
    label: string;
}
export interface IPieChartProps {
    data: {
        bins: string[];
        counts: IHistogramDataSet[];
    };
    backgroundColor: string;
    className: string;
    colorScheme: string[];
    donutWidth: number;
    height: number;
    hover?: Partial<Record<EColorManipulations, number>>;
    labels: ILabels;
    margin: IMargin;
    tip: any;
    tipContainer: string;
    tipContentFn: TipContentFn<string>;
    visible: {
        [key: string]: boolean;
    };
    width: number | string;
}
/**
 * PieChart component
 */
declare class PieChart extends Component<DeepPartial<IPieChartProps>, IChartState> {
    private chart;
    private ref;
    /**
     * Constructor
     */
    constructor(props: DeepPartial<IPieChartProps>);
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
    getChartState(): DeepPartial<IPieChartProps>;
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
export default PieChart;
