import { BaseHistogramD3, IGroupData } from './BaseHistogramD3';
export declare class HistogramD3 extends BaseHistogramD3 {
    y: import("d3-scale").ScaleLinear<number, number>;
    x: import("d3-scale").ScaleBand<string>;
    /**
     * Draw scales
     */
    drawAxes(): void;
    /**
     * Draw a single data set into the chart
     */
    updateChart(bins: string[], groupData: IGroupData): void;
}
