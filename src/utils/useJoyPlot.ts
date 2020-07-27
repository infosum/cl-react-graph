import { extent } from 'd3-array';
import {
  useEffect,
  useState,
} from 'react';

import { IHistogramData } from '../Histogram';

export const useJoyPlot = ({
  data,
  height,
}: {
  data: IHistogramData[];
  height: number;
}) => {
  const chartHeight = height / (data.length);
  const [bins, setBins] = useState<string[]>([]);
  const [domain, setDomain] = useState<[number, number]>([0, 0]);
  const [values, setValues] = useState<IHistogramData[]>([]);
  useEffect(() => {
    const allBins = data.reduce((p, n) => {
      return Array.from(new Set([...p, ...n.bins]));
    }, [] as string[])
      .sort((a, b) => a < b ? 1 : -1);
    setBins(allBins);
    const allValues: IHistogramData[] = data.map((d) => {
      const counts = d.counts.map((count) => {
        const data = new Array(allBins.length).fill(0);
        count.data.forEach((c, countIndex) => {
          const allBinIndex = allBins.findIndex((b) => b === d[countIndex]);
          data[allBinIndex] = c;
        });
        return count;
      });
      return {
        ...d,
        bins: allBins,
        counts,
      };
    });
    setValues(allValues);

    const eachValue = values.reduce((prev, next) => {
      const values = next.counts.reduce((p, n) => [...p, ...n.data], [] as number[]);
      return [...values, ...prev];
    }, [] as number[]);
    setDomain(extent(eachValue) as [number, number]);

  }, [data])
  return ({
    chartHeight,
    bins,
    domain,
    values
  });
}
