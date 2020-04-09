import { BaseHistogramD3, IGroupData } from './BaseHistogramD3';
export declare class HorizontalHistogramD3 extends BaseHistogramD3 {
    x: import("d3-scale").ScaleLinear<number, number>;
    y: import("d3-scale").ScaleBand<string>;
    yAnnotations: import("d3-scale").ScaleBand<string>;
    /**
     * Draw Axes
     */
    drawAxes(): void;
    /**
     * Draw a single data set into the chart
     */
    updateChart(bins: string[], groupData: IGroupData): void;
}
