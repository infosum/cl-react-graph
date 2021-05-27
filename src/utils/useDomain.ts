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
import { IScatterPlotDataSet } from '../ScatterPlot';

interface ILIneProps {
  values: ILineChartDataSet<any>[];
  clampToZero?: boolean;
}

interface IScatterProps {
  values: IScatterPlotDataSet<any>[];
  clampToZero?: boolean;
}

interface IProps {
  groupLayout: EGroupedBarLayout,
  bins: string[],
  values: IBarChartDataSet[];
  clampToZero?: boolean;
  /** 
   * Axis tick values - these could have a greater extend than the chart data so should
   * be included in the domain calculation
   */
  tickValues?: number[];
}

// Y Domains only so far....
export const useHistogramDomain: (props: IProps) => [number, number] = ({
  groupLayout,
  bins,
  values,
  tickValues = [],
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
    const e = extent(allValues.concat(tickValues)) as [number, number];
    if (e[0] === e[1]) {
      e[1]++;
    }
    setRange(e);
  }, [bins, groupLayout, values, tickValues]);
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

export const useScatterDomain: (props: IScatterProps) => [number, number] = ({
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
