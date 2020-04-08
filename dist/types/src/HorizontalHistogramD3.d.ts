import { Selection } from 'd3-selection';
import { IHistogramProps } from './Histogram';
import { IGroupData } from './HistogramD3';
import { TSelection } from './utils/svg';
import { DeepPartial } from './utils/types';
export declare class HorizontalHistogramD3 {
    svg: undefined | Selection<any, any, any, any>;
    tipContainer: any;
    tipContent: any;
    x: import("d3-scale").ScaleLinear<number, number>;
    y: import("d3-scale").ScaleBand<string>;
    yAnnotations: import("d3-scale").ScaleBand<string>;
    innerScaleBand: import("d3-scale").ScaleBand<string>;
    container: undefined | Selection<SVGElement, any, any, any>;
    dataSets: IGroupData;
    gridX: undefined | TSelection;
    gridY: undefined | TSelection;
    yAxisContainer: undefined | TSelection;
    xAxisContainer: undefined | TSelection;
    xAxisLabel: undefined | TSelection;
    yAxisLabel: undefined | TSelection;
    xAnnotationAxisContainer: undefined | TSelection;
    yAnnotationAxisContainer: undefined | TSelection;
    props: IHistogramProps;
    create(el: Element, newProps?: DeepPartial<IHistogramProps>): void;
    /**
     * Draw Axes
     */
    drawAxes(): void;
    /**
     * Draw a single data set into the chart
     */
    updateChart(bins: string[], groupData: IGroupData): void;
    mergeProps(newProps: DeepPartial<IHistogramProps>): void;
    /**
     * Update chart
     */
    update(newProps: DeepPartial<IHistogramProps>): void;
    /**
     * Any necessary clean up
     */
    destroy(): void;
}
