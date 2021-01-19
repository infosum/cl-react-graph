import { Selection } from 'd3-selection';
import { IGroupData } from '../Histogram';
import { TSelection } from '../utils/svg';
import { DeepPartial } from '../utils/types';
import { ITornadoDataSet, ITornadoProps } from './Tornado';
export declare const maxValueCount: (counts: ITornadoDataSet[]) => number;
export declare class TornadoD3 {
    svg: undefined | Selection<any, any, any, any>;
    tipContainer: any;
    tipContent: any;
    x: import("d3-scale").ScaleLinear<number, number>;
    y: import("d3-scale").ScaleBand<string>;
    innerScaleBand: import("d3-scale").ScaleBand<string>;
    container: undefined | Selection<SVGElement, any, any, any>;
    dataSets: IGroupData;
    gridX: undefined | TSelection;
    gridY: undefined | TSelection;
    yAxisContainer: undefined | TSelection;
    xAxisContainer: undefined | TSelection;
    xAxisContainer2: undefined | TSelection;
    yAxisLabel: undefined | TSelection;
    xAxisLabel: undefined | TSelection;
    domain: [number, number];
    props: ITornadoProps;
    /**
     * Initialization
     */
    create(el: Element, newProps?: DeepPartial<ITornadoProps>): void;
    /**
     * Draw Axes
     */
    drawAxes(): void;
    calculateDomain(): [number, number];
    /**
     * Draw a single data set into the chart
     */
    updateChart(bins: string[], groupData: IGroupData): void;
    mergeProps(newProps: DeepPartial<ITornadoProps>): void;
    /**
     * Update chart
     */
    update(newProps: DeepPartial<ITornadoProps>): void;
    /**
     * Any necessary clean up
     */
    destroy(): void;
}
