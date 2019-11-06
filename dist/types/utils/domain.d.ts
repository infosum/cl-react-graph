import { Axis } from 'd3';
import { ScaleLinear } from 'd3-scale';
import { IAxis, IDomain, IHistogramDataSet } from '../Histogram';
import { IGroupData } from '../HistogramD3';
import { IGroupedProps } from './bars';
import { AnyScale } from './scales';
export declare const isStacked: ({ groupLayout, stacked }: IGroupedProps) => boolean;
interface IAppendDomainRangeProps {
    domain: IDomain;
    scale: ScaleLinear<number, number>;
    data: IGroupData | number[];
    range: number[];
    stacked: boolean;
}
/**
 * Slightly better attempt from applyDomainAffordance, taking into
 * account axis types.
 */
export declare const rangeAffordance: (range: [any, any], axis: IAxis, inc?: boolean) => [any, any];
/**
 * Update a linear scale with range and domain values taken either from the compiled
 * group data. If the chart is stacked then sum all bin values first.
 */
export declare const appendDomainRange: (props: IAppendDomainRangeProps) => void;
export declare const shouldFormatTick: (axis: IAxis) => boolean;
export declare const formatTick: (axis: IAxis) => (v: string | number) => string | number;
interface ITickProps {
    scaleBand: AnyScale;
    axis: Axis<string> | Axis<number> | Axis<number | {
        valueOf(): number;
    }> | Axis<number | string>;
    axisConfig: IAxis;
    axisLength: number;
    limitByValues?: boolean;
    valuesCount: number;
}
export declare const ticks: (props: ITickProps) => void;
export declare const tickSize: ({ axis, axisConfig, axisLength, limitByValues, scaleBand, valuesCount, }: ITickProps) => void;
export declare const maxValueCount: (counts: IHistogramDataSet[]) => number;
export {};
