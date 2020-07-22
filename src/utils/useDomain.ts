//useDomain is a React hook to calculate a chart domain, used in Axis and Bars
import {
  useEffect,
  useState,
} from 'react';

/*
 * Depending on the axis group layout we need to take the values and work out what the 
 * y axis domain bounds need to be.
 * */
import { ExtendedGroupItem } from '../components/Bars/Bars';
import {
  EGroupedBarLayout,
  IHistogramDataSet,
} from '../Histogram';

interface IProps {
  groupLayout: EGroupedBarLayout,
  bins: string[],
  dataSets: ExtendedGroupItem[],
  values: IHistogramDataSet[],
  clampToZero?: boolean;
}
export const useDomain: (props: IProps) => [number, number] = ({
  groupLayout,
  bins,
  dataSets,
  values,
  clampToZero = true,
}) => {
  const [range, setRange] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    let allValues: number[] = []

    if (groupLayout === EGroupedBarLayout.STACKED) {
      // work out total per bin 

      const binTotals: Array<{ bin: string, value: number }> = [];
      bins.forEach((bin, binIndex) => {
        const v = dataSets.filter((d) => d.label === bin).reduce((prev, next) => prev + next.value, 0);
        if (!binTotals[binIndex]) {
          binTotals[binIndex] = { bin, value: v };
        } else {
          binTotals[binIndex].value += v;
        }
      })
      allValues = binTotals.map((b) => b.value);
    } else {
      allValues = values.reduce((prev, dataset) => {
        return prev.concat(dataset.data);
      }, [] as number[]);
    }
    if (clampToZero) {
      allValues.push(0);
    }
    setRange([Math.min(...allValues as number[]), Math.max(...allValues as number[])]);
  }, [groupLayout, bins, values]);
  console.log(range);
  return range;
}
