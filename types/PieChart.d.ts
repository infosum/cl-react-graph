import * as React from 'react';
import { IChartState, IHistogramDataSet, IMargin, TipContentFn } from './Histogram';
interface ILabels {
    display: boolean;
    displayFn?: (d: any, ix: number) => string | number;
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
    backgroundColor?: string;
    className?: string;
    colorScheme?: string[];
    donutWidth?: number;
    height: number;
    labels?: ILabels;
    margin?: IMargin;
    tip?: any;
    tipContainer?: string;
    tipContentFn?: TipContentFn<string>;
    visible?: {
        [key: string]: boolean;
    };
    width: number | string;
}
declare class PieChart extends React.Component<IPieChartProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: Partial<IPieChartProps>;
    constructor(props: IPieChartProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getChartState(): IPieChartProps;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default PieChart;
