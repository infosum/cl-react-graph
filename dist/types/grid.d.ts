import { IAxes } from './Histogram';
export declare const makeYGridlines: (y: any, ticks?: number) => import("d3-axis").Axis<import("d3-axis").AxisDomain>;
export declare const makeXGridlines: (x: any, ticks?: number) => import("d3-axis").Axis<import("d3-axis").AxisDomain>;
export declare const drawGrid: (x: any, y: any, gridX: any, gridY: any, props: any, ticks: any) => void;
export declare const gridHeight: (props: any) => number;
export declare const yAxisWidth: (axis: IAxes) => number;
export declare const xAxisHeight: (axis: IAxes) => any;
export declare const gridWidth: (props: any) => number;
