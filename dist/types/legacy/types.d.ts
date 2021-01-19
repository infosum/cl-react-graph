import { IAxis } from '../components/YAxis';
import { DeepPartial } from '../utils/types';
export interface IChartAdaptor<P> {
    create: (el: Element, props: DeepPartial<P>) => void;
    update: (props: DeepPartial<P>) => void;
    destroy: () => void;
}
export interface IChartState {
    parentWidth?: number;
}
export declare type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;
export interface IMargin {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export interface IStroke {
    color: ((d: any, i: number, colors: (i: number) => string) => string) | string;
    dasharray: string;
    linecap: 'butt' | 'round' | 'square';
    width: number;
}
export declare type Scale = 'LINEAR' | 'TIME' | 'LOG' | 'ORDINAL';
export interface IAxes {
    y: IAxis;
    x: IAxis;
}
export interface ISVGLineStyle {
    'stroke': string;
    'fill': string;
    'opacity': number;
    'stroke-width': number;
    'stroke-opacity': number;
    'shape-rendering': string;
    'visible': boolean;
}
