import { ScaleLinear, ScaleBand } from 'd3-scale';
import { extent } from 'd3-array';
import { IGroupDataItem } from '../HistogramD3';
import { EGroupedBarLayout, IDomain, IAxes, IAxis, IHistogramDataSet } from '../Histogram';
import { Axis } from 'd3';
import get from 'lodash/get';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

export const  isStacked = ({ groupLayout, stacked }) => {
  return stacked || groupLayout === EGroupedBarLayout.STACKED;
};

interface IAppendDomainRangeProps {
  domain: IDomain;
  scale: ScaleLinear<number, number>, 
  data: IGroupDataItem[] | number[],
  range: number[],
  stacked: boolean,
}

/**
 * Update a linear scale with range and domain values taken either from the compiled
 * group data. If the chart is stacked then sum all bin values first.
 */
export const appendDomainRange = (props: IAppendDomainRangeProps): void => {
  const aDomain: number[] = [];
  const { domain, data, stacked, scale, range } = props;

  // const sta = isStacked({ groupLayout, stacked });

  const allCounts: number[] = (data as any).reduce((prev: number[], next): number[] => {
    return stacked
      ? [...prev, next.reduce((p: number, n): number => p + (n.value || n), 0)]
      : [...prev, ...next.map((n) => n.value || n)];
  }, [0]);

  const thisExtent = extent<any>(allCounts, (d) => d);
  aDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
    ? domain.max
    : Number(thisExtent[1]) + Number(thisExtent[1]) * 5 / 100;
  aDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
    ? domain.min
    : Number(thisExtent[0]);
  
  scale.range(range)
    .domain(aDomain);
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


interface ITickProps {
  axis: Axis<string> | Axis<number> | Axis<number | { valueOf(): number}>;
  axisConfig: IAxes;
  axisLength: number;
  valuesCount: number;
  scaleBand: ScaleBand<string> | ScaleLinear<number, number>;
  limitByValues?: boolean;
}
export const ticks = ({
  axis,
  axisConfig,
  axisLength,
  valuesCount,
  scaleBand,
  limitByValues,
}: ITickProps) => {
  const tickSize = get(axisConfig, 'x.tickSize', undefined);
  console.log(axisConfig, tickSize);
  if (tickSize !== undefined) {
    axis.tickSize(tickSize);
  } else {
    if (limitByValues && axisLength / valuesCount < 10) {
      // Show one in 10 x axis labels
      axis.tickValues((scaleBand.domain() as any[]).filter((d, i) => !(i % 10)));
    }
  }
  if (shouldFormatTick(axisConfig.x)) {
    axis.tickFormat(formatTick(axisConfig.x) as any);
  }
}

export const maxValueCount = (counts: IHistogramDataSet[]): number  => {
  return counts.reduce((a: number, b: IHistogramDataSet): number => {
    return b.data.length > a ? b.data.length : a;
  }, 0);
};