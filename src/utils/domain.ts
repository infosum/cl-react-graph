import { extent } from 'd3-array';
import { Axis } from 'd3-axis';
import { format } from 'd3-format';
import { ScaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';

import { IAxis } from '../components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartDataSet,
  IGroupData,
} from '../Histogram';
import { IGroupedProps } from './bars';
import { AnyScale } from './scales';

export interface IDomain {
  max: number | null;
  min: number | null;
}
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
  return (axis.scale === 'time' && axis.hasOwnProperty('dateFormat'))
    || axis.hasOwnProperty('numberFormat');
}

export const formatTick = (axis: IAxis) => (v: string | number) => {
  if (axis.scale === 'time') {
    return timeFormat(axis.dateFormat ?? '%B %d, %Y')(new Date(v));
  }
  return isNaN(Number(v)) ? v : format(axis.numberFormat ?? ".2s")(Number(v))
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
  const tickSize = axisConfig?.tickSize ?? undefined;
  const ticks = undefined;
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

export const maxValueCount = (counts: IBarChartDataSet[]): number => {
  return counts.reduce((a: number, b: IBarChartDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};
