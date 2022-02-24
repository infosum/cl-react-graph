import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { IAnyChartPoint } from '../LineChart';

interface IUseBrush {
  initialPosition: { start: number, end: number };
  data: IAnyChartPoint[];
  scaleFunction: () => any;
  width: number;
}

export const useBrush = ({
  initialPosition,
  data,
  scaleFunction,
  width,
}: IUseBrush) => {

  const filterData = (scale: any, pos: { start: number, end: number }) => (data: IAnyChartPoint) => {
    const x = scale(data.x);
    return x >= pos.start && x <= pos.end;
  }
  
  const scale = useMemo(() => {
    return scaleFunction()
    .domain([data[0].x, data[data.length - 1].x])
    .range([0, width]);
  }, [scaleFunction, data, width]);
  
  const [brushedData, setBrushedData] = useState(data.filter(filterData(scale, initialPosition)));

  const makeBrushedData = useCallback((pos: { start: number, end: number }) => {
    setBrushedData(data.filter(filterData(scale, pos)));
  }, [scale, data]);

  return { brushedData, makeBrushedData };
}
