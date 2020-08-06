import { extent } from 'd3-array';
//useDomain is a React hook to calculate a chart domain, used in Axis and Bars
import {
  useEffect,
  useState,
} from 'react';

/*
 * Depending on the axis group layout we need to take the values and work out what the 
 * y axis domain bounds need to be.
 * */
import {
  EGroupedBarLayout,
  IBarChartDataSet,
} from '../Histogram';
import { ILineChartDataSet } from '../LineChart';

interface ILIneProps {
  values: ILineChartDataSet<any>[];
  clampToZero?: boolean;
}

interface IProps {
  groupLayout: EGroupedBarLayout,
  bins: string[],
  values: IBarChartDataSet[];
  clampToZero?: boolean;
}

// Y Domains only so far....
export const useHistogramDomain: (props: IProps) => [number, number] = ({
  groupLayout,
  bins,
  values,
  clampToZero = true,
}) => {
  const [range, setRange] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    let allValues: number[] = []
    allValues = (groupLayout === EGroupedBarLayout.STACKED)
      ? bins.map((bin, binIndex) => values.map((dataset) => dataset.data[binIndex]).reduce((p, n) => p + n, 0))
      : values.reduce((prev, dataset) => prev.concat(dataset.data), [] as number[]);
    if (clampToZero) {
      allValues.push(0);
    }
    const e = extent(allValues) as [number, number];
    if (e[0] === e[1]) {
      e[1]++;
    }
    setRange(e);
  }, [bins, groupLayout, values]);
  return range;
}

export const useLineDomain: (props: ILIneProps) => [number, number] = ({
  values,
  clampToZero,
}) => {
  const [range, setRange] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const allValues = values.reduce((prev, value) => {
      return prev.concat(value.data.map((d) => d.y))
    }, [] as number[])
    if (clampToZero) {
      allValues.push(0);
    }
    const e = extent(allValues) as [number, number];
    if (e[0] === e[1]) {
      e[1]++;
    }
    setRange(e);
  }, [values]);
  return range;
};
