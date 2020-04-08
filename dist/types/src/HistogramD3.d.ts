import { Selection } from 'd3-selection';
import { IHistogramProps } from './Histogram';
import { TSelection } from './utils/svg';
import { DeepPartial } from './utils/types';
export interface IGroupDataItem {
    label: string;
    groupLabel?: string;
    colorRef?: string;
    value: number;
    side?: 'left' | 'right';
}
export declare type IGroupData = IGroupDataItem[][];
export declare class HistogramD3 {
    svg: undefined | Selection<any, any, any, any>;
    tipContainer: any;
    tipContent: any;
    y: import("d3-scale").ScaleLinear<number, number>;
    x: import("d3-scale").ScaleBand<string>;
    xAnnotations: import("d3-scale").ScaleBand<string>;
    innerScaleBand: import("d3-scale").ScaleBand<string>;
    container: undefined | Selection<SVGElement, any, any, any>;
    dataSets: IGroupData;
    gridX: undefined | TSelection;
    gridY: undefined | TSelection;
    yAxisContainer: undefined | TSelection;
    xAxisContainer: undefined | TSelection;
    xAnnotationAxisContainer: undefined | TSelection;
    yAnnotationAxisContainer: undefined | TSelection;
    xAxisLabel: any;
    yAxisLabel: any;
    percentBarLabel: any;
    props: IHistogramProps;
    mergeProps(newProps: DeepPartial<IHistogramProps>): void;
    create(el: Element, newProps?: DeepPartial<IHistogramProps>): void;
    /**
     * Draw scales
     */
    drawAxes(): void;
    /**
     * Draw a single data set into the chart
     */
    updateChart(bins: string[], groupData: IGroupData): void;
    /**
     * Update chart
     */
    update(newProps: DeepPartial<IHistogramProps>): void;
    /**
     * Any necessary clean up
     */
    destroy(): void;
}
