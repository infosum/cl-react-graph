import { ScaleBand } from 'd3-scale';
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
export declare abstract class BaseHistogramD3 {
    svg: undefined | Selection<any, any, any, any>;
    tipContainer: any;
    tipContent: any;
    abstract y: any;
    abstract x: any;
    xAnnotations: ScaleBand<string>;
    innerScaleBand: ScaleBand<string>;
    container: undefined | Selection<SVGElement, any, any, any>;
    dataSets: IGroupData;
    gridX: undefined | TSelection;
    gridY: undefined | TSelection;
    yAxisContainer: undefined | TSelection;
    xAxisContainer: undefined | TSelection;
    xAnnotationAxisContainer: undefined | TSelection;
    yAnnotationAxisContainer: undefined | TSelection;
    xAxisLabel: any;
    yAxisLabel: undefined | Selection<SVGElement, any, any, any>;
    percentBarLabel: any;
    props: IHistogramProps;
    create(el: Element, newProps?: DeepPartial<IHistogramProps>): void;
    mergeProps(newProps: DeepPartial<IHistogramProps>): void;
    /**
     * Update chart
     */
    update(newProps: DeepPartial<IHistogramProps>): void;
    drawGrid(): void;
    abstract updateChart(bins: string[], groupData: IGroupData): void;
    abstract drawAxes(): void;
    /**
     * Any necessary clean up
     */
    destroy(): void;
}
