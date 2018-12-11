import { IScatterPlotProps } from './ScatterPlot';
export declare const scatterPlotD3: () => {
    create(el: Element, props?: IScatterPlotProps): void;
    _makeSvg(el: Element, data: any[]): void;
    _drawScales(data: any): void;
    _drawLegend(): void;
    _drawPoints(traits: any, width: number, height: number): void;
    update(el: Element, props: IScatterPlotProps): void;
    destroy(el: Element): void;
};
