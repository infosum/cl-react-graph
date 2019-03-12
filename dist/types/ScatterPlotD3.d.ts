import { IScatterPlotProps } from './ScatterPlot';
export declare const scatterPlotD3: () => {
    /**
     * Initialization
     */
    create(el: Element, newProps?: Partial<IScatterPlotProps>): void;
    /**
     * Make the SVG container element
     * Recreate if it previously existed
     */
    _makeSvg(el: Element, data: {
        keys: string[];
        values: any[];
    }): void;
    /**
     * Draw the chart scales
     */
    _drawScales(data: string[]): void;
    /**
     * Make a legend showing spit choice options
     */
    _drawLegend(): void;
    /**
     * Draw scatter points
     */
    _drawPoints(traits: any, width: number, height: number): void;
    /**
     * Update chart
     */
    update(el: Element, newProps: Partial<IScatterPlotProps>): void;
    /**
     * Any necessary clean up
     */
    destroy(el: Element): void;
};
