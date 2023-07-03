import { Axis as AxisProps } from '../components/YAxis';

/**
 * Slightly better attempt from applyDomainAffordance, taking into
 * account axis types.
 */
export const rangeAffordance = (
  range: [any, any],
  axis: AxisProps,
  inc: boolean = true,
): [any, any] => {
  if (range[0] === undefined || range[1] === undefined) {
    return [0, 0];
  }
  try {
    const first = axis.scale === 'time' ? range[0].getTime() : range[0];
    const last = axis.scale === 'time' ? range[1].getTime() : range[1];
    const diff = last - first;
    const percentIncrement = axis.scale === 'log' ? 100 : 5;

    const incremental = applyDomainAffordance(diff, inc, percentIncrement);

    const newLast = last + (incremental - diff);

    if (axis.scale === 'time') {
      return [range[0], new Date(newLast)];
    }
    // Only apply affordance at the end as line should start from origin.
    return [range[0], newLast];
  } catch (e) {
    return [0, 0];
  }
}

export const applyDomainAffordance = (
  v: number,
  inc: boolean = true,
  percentIncrement: number = 5,
) =>
  inc ? v + v * percentIncrement / 100
    : v - v * percentIncrement / 100;

