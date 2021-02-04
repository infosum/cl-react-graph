import { IAxis } from '../components/YAxis';
/**
 * Ticks are the values shown along an axis
 * We don't want to show too many by default as they then overlap each other
 */
export declare const buildTicks: (scale: IAxis['scale'], values: string[] | number[], domain: number[]) => any[];
