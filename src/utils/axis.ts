import { IAxis } from '../components/YAxis';
import { round } from './number';

/**
 * Ticks are the values shown along an axis
 * We don't want to show too many by default as they then overlap each other
 */
export const buildTicks = (scale: IAxis['scale'], values: string[] | number[], domain: number[]) => {
  let ticks: any[];
  switch (scale) {
    case 'linear':
      ticks = values.length === 0
        ? [domain[0], domain[1] - domain[0], domain[1]]
        : values;
      break;
    case 'log':
      ticks = values.length === 0 && domain
        ? [
          domain[1] * 0.00001,
          domain[1] * 0.001,
          domain[1] * 0.01,
          domain[1],
        ].map((d) => round(d, 2))
        : values;
      break;
    default:
      ticks = values;
  }
  return ticks;
}
