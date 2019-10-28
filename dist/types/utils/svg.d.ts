import { Selection } from 'd3-selection';
import { IMargin } from '../Histogram';
export declare type TSelection = Selection<any, any, any, any>;
export declare type TTextSelection = Selection<SVGTextElement, any, any, any>;
interface ISizeProps {
    margin: IMargin;
    width: number | string;
    height: number | string;
    className: string;
}
export declare const makeSvg: (el: Element, svg: Selection<any, any, any, any>) => Selection<any, any, any, any>;
export declare const sizeSVG: (svg: Selection<any, any, any, any>, props: ISizeProps) => void;
export declare const makeGrid: (svg: Selection<any, any, any, any>) => [Selection<any, any, any, any>, Selection<any, any, any, any>];
export declare const makeScales: (svg: Selection<any, any, any, any>) => [Selection<any, any, any, any>, Selection<any, any, any, any>, Selection<any, any, any, any>, Selection<any, any, any, any>, Selection<any, any, any, any>];
export {};
