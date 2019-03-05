import { Component } from 'react';
interface IChartState {
    choices: string[];
    data: any[];
    height: number;
    distModels: string[];
    split: string;
    parentWidth: number;
    width: number | string;
}
export declare type ScatterPlotData = any[];
export interface IScatterPlotProps {
    choices?: any[];
    className?: string;
    chartSize?: number;
    data: ScatterPlotData;
    delay?: number;
    distModels?: string[];
    duration?: number;
    height: number;
    legendWidth?: number;
    colorScheme?: string[];
    padding?: number;
    radius?: number;
    split?: string;
    width: string | number;
}
declare class ScatterPlot extends Component<IScatterPlotProps, IChartState> {
    private chart;
    private ref;
    static defaultProps: {
        height: number;
        width: string;
    };
    constructor(props: IScatterPlotProps);
    private handleResize;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private getChartState;
    componentWillReceiveProps(props: IScatterPlotProps): void;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default ScatterPlot;
