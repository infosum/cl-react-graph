import { Component } from 'react';
import { IChartState } from './Histogram';
import { DeepPartial } from './utils/types';
export interface IScatterPlotProps {
    choices: string[];
    className: string;
    data: {
        keys: string[];
        values: any[];
    };
    delay: number;
    distModels: string[];
    duration: number;
    height: number;
    legendWidth: number;
    colorScheme: string[];
    padding: number;
    radius: number;
    split: string;
    width: string | number;
}
declare class ScatterPlot extends Component<DeepPartial<IScatterPlotProps>, IChartState> {
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
    componentWillReceiveProps(props: DeepPartial<IScatterPlotProps>): void;
    componentWillUnmount(): void;
    private getDOMNode;
    render(): JSX.Element;
}
export default ScatterPlot;
