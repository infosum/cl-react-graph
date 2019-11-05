import { Axis } from 'd3';
import { extent } from 'd3-array';
import { format } from 'd3-format';
import { ScaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import get from 'lodash/get';

import {
  EGroupedBarLayout,
  IAxis,
  IDomain,
  IHistogramDataSet,
} from '../Histogram';
import { IGroupData } from '../HistogramD3';
import { IGroupedProps } from './bars';
import { AnyScale } from './scales';

export const isStacked = ({ groupLayout, stacked }: IGroupedProps) => {
  return stacked || groupLayout === EGroupedBarLayout.STACKED;
};

interface IAppendDomainRangeProps {
  domain: IDomain;
  scale: ScaleLinear<number, number>,
  data: IGroupData | number[],
  range: number[],
  stacked: boolean,
}

/**
 * Slightly better attempt from applyDomainAffordance, taking into 
 * account axis types.
 */
export const rangeAffordance = (
  range: [any, any],
  axis: IAxis,
  inc: boolean = true,
): [any, any] => {

  const first = axis.scale === 'TIME' ? range[0].getTime() : range[0];
  const last = axis.scale === 'TIME' ? range[1].getTime() : range[1];
  const diff = last - first;
  const percentIncrement = axis.scale === 'LOG' ? 100 : 5;

  const incremental = applyDomainAffordance(diff, inc, percentIncrement);

  const newLast = last + (incremental - diff);

  if (axis.scale === 'TIME') {
    return [range[0], new Date(newLast)];
  }
  // Only apply affordance at the end as line should start from origin.
  return [range[0], newLast];
}

const applyDomainAffordance = (
  v: number,
  inc: boolean = true,
  percentIncrement: number = 5,
) =>
  inc ? v + v * percentIncrement / 100
    : v - v * percentIncrement / 100;

/**
 * Update a linear scale with range and domain values taken either from the compiled
 * group data. If the chart is stacked then sum all bin values first.
 */
export const appendDomainRange = (props: IAppendDomainRangeProps): void => {
  const aDomain: number[] = [];
  const { domain, data, stacked, scale, range } = props;

  const allCounts: number[] = (data as any).reduce((prev: number[], next): number[] => {
    return stacked
      ? [...prev, next.reduce((p: number, n): number => p + (n.value || n), 0)]
      : [...prev, ...next.map((n) => n.value || n)];
  }, [0]);
  const thisExtent = extent<any>(allCounts, (d) => d);
  aDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
    ? domain.max
    : applyDomainAffordance(Number(thisExtent[1]));
  aDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
    ? domain.min
    : Number(thisExtent[0]);

  scale.range(range)
    .domain(aDomain)
    .nice();
}

export const shouldFormatTick = (axis: IAxis): boolean => {
  return (axis.scale === 'TIME' && axis.hasOwnProperty('dateFormat'))
    || axis.hasOwnProperty('numberFormat');
}

export const formatTick = (axis: IAxis) => (v: string | number) => {
  if (axis.scale === 'TIME') {
    return timeFormat(axis.dateFormat)(new Date(v));
  }
  return isNaN(Number(v)) ? v : format(axis.numberFormat)(Number(v))
};
// Specialist format tick method to convert long numbers to capital representations
export const formatTickNumbersToLetters = (d): string => {
  const limits: number[] = [1000000000000000, 1000000000000, 1000000000, 1000000, 1000];
  const shorteners: string[] = ['Q', 'T', 'B', 'M', 'K'];
  for (const i in limits) {
    if (d > limits[i]) {
      return (d / limits[i]).toFixed() + shorteners[i];
    }
  }
  return d;
};

interface ITickProps {
  scaleBand: AnyScale;
  axis: Axis<string> | Axis<number> | Axis<number | { valueOf(): number }> | Axis<number | string>;
  axisConfig: IAxis;
  axisLength: number;
  limitByValues?: boolean;
  valuesCount: number;
}

export const ticks = (props: ITickProps) => {
  const { axis, axisConfig } = props;
  tickSize(props);
  if (shouldFormatTick(axisConfig)) {
    axis.tickFormat(formatTick(axisConfig) as any);
  }
}

export const tickSize = ({
  axis,
  axisConfig,
  axisLength,
  limitByValues,
  scaleBand,
  valuesCount,
}: ITickProps) => {
  const tickSize = get(axisConfig, 'tickSize', undefined);
  const ticks = get(axisConfig, 'ticks', undefined);
  if (tickSize !== undefined) {
    axis.tickSize(tickSize);
  }
  if (ticks !== undefined) {
    axis.ticks(ticks);
  } else {
    if (limitByValues && axisLength / valuesCount < 10) {
      // Show one in 10 axis labels
      axis.tickValues((scaleBand.domain() as any[]).filter((d, i) => !(i % 10)));
    }
  }
}

export const maxValueCount = (counts: IHistogramDataSet[]): number => {
  return counts.reduce((a: number, b: IHistogramDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};