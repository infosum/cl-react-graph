import { Axis as AxisProps } from "../components/YAxis";
/**
 * Slightly better attempt from applyDomainAffordance, taking into
 * account axis types.
 */
export declare const rangeAffordance: (range: [any, any], axis: AxisProps, inc?: boolean) => [any, any];
export declare const applyDomainAffordance: (v: number, inc?: boolean, percentIncrement?: number) => number;
