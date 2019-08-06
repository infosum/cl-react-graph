import { ScaleLinear, ScaleBand } from 'd3-scale';
import { IGroupData } from '../HistogramD3';
import { IDomain, IAxes, IAxis, IHistogramDataSet } from '../Histogram';
import { Axis } from 'd3';
export declare const isStacked: ({ groupLayout, stacked }: {
    groupLayout: any;
    stacked: any;
}) => any;
interface IAppendDomainRangeProps {
    domain: IDomain;
    scale: ScaleLinear<number, number>;
    data: IGroupData | number[];
    range: number[];
    stacked: boolean;
}
export declare const applyDomainAffordance: (v: number) => number;
/**
 * Update a linear scale with range and domain values taken either from the compiled
 * group data. If the chart is stacked then sum all bin values first.
 */
export declare const appendDomainRange: (props: IAppendDomainRangeProps) => void;
export declare const shouldFormatTick: (axis: IAxis) => boolean;
export declare const formatTick: (axis: IAxis) => (v: string | number) => string | number;
interface ITickProps {
    axis: Axis<string> | Axis<number> | Axis<number | {
        valueOf(): number;
    }> | Axis<number | string>;
    axisConfig: IAxes;
    axisLength: number;
    valuesCount: number;
    scaleBand: ScaleBand<string> | ScaleLinear<number, number>;
    limitByValues?: boolean;
}
export declare const ticks: ({ axis, axisConfig, axisLength, valuesCount, scaleBand, limitByValues, }: ITickProps) => void;
export declare const maxValueCount: (counts: IHistogramDataSet[]) => number;
export {};
