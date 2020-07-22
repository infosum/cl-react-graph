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
  IHistogramDataSet,
} from '../Histogram';
import { ILineChartDataSet } from '../LineChart';

interface IBarData {
  groupLayout: EGroupedBarLayout,
  bins: string[],
  values: IHistogramDataSet[],
}

interface IProps {
  data: IBarData | ILineChartDataSet<any>[]
  clampToZero?: boolean;
}

const isBar = (variableToCheck: any): variableToCheck is IBarData => variableToCheck.bins !== undefined;
const isLine = (variableToCheck: any): variableToCheck is ILineChartDataSet<any>[] => Array.isArray(variableToCheck);
export const useDomain: (props: IProps) => [number, number] = ({
  data,
  clampToZero = true,
}) => {


  const [range, setRange] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    let allValues: number[] = []
    if (isBar(data)) {
      const {
        groupLayout,
        bins,
        values
      } = data;
      if (groupLayout === EGroupedBarLayout.STACKED) {
        allValues = bins.map((bin, binIndex) => {
          return values.map((dataset) => dataset.data[binIndex]).reduce((p, n) => p + n, 0);
        })
      } else {
        allValues = values.reduce((prev, dataset) => {
          return prev.concat(dataset.data);
        }, [] as number[]);
      }
      if (clampToZero) {
        allValues.push(0);
      }

    }
    if (isLine(data)) {
      // const ys: any[] = [];
      // const xs: any[] = [];
      // data.forEach((d) => {
      //   let parsedY = d.y;
      //   // let parsedX = d.x;
      //   if (axis.y.scale === 'LOG' && d.y === 0) {
      //     parsedY = ZERO_SUBSTITUTE;
      //   }
      //   if (axis.x.scale === 'LOG' && d.x === 0) {
      //     parsedX = ZERO_SUBSTITUTE;
      //   }
      //   ys.push(parsedY);
      //   xs.push(parsedX);
      // });

      allValues = data
        .reduce((p, n) => p.concat(n.data), [] as any[])
        .map((d) => d.y);
    }
    console.log('allValues', allValues);
    setRange([Math.min(...allValues as number[]), Math.max(...allValues as number[])]);
  }, [data]);
  console.log(range);
  return range;
}
