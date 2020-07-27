import { extent } from 'd3-array';
import {
  curveCatmullRom,
  CurveFactory,
  CurveFactoryLineOnly,
  line,
} from 'd3-shape';
import {
  useEffect,
  useState,
} from 'react';

import { IAxes } from '../Histogram';
import {
  IChartPoint,
  IChartPointValue,
  ILineChartDataSet,
} from '../LineChart';
import { rangeAffordance } from './domain';
import {
  AnyScale,
  buildScales,
} from './scales';

const ZERO_SUBSTITUTE: number = 1e-6;

export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  data: ILineChartDataSet<T>;
  axis: IAxes;
  curveType?: CurveFactory | CurveFactoryLineOnly;
  width: number;
  left?: number;
  height: number;
}


export const useScales: (props: IProps) => { xScale: any, yScale: any } = ({
  data,
  width,
  height,
  axis,
  left = 0,
}) => {
  const [scales, setScales] = useState<{ xScale: any, yScale: any }>({ xScale: null, yScale: null });
  useEffect(() => {
    const [xScale, yScale] = buildScales(axis);

    const ys: any[] = [];
    const xs: any[] = [];
    data.data.forEach((d) => {
      let parsedY = axis.y.scale === 'LOG' && d.y === 0 ? ZERO_SUBSTITUTE : d.y;
      let parsedX = axis.x.scale === 'LOG' && d.x === 0 ? ZERO_SUBSTITUTE : d.x;
      ys.push(parsedY);
      xs.push(parsedX);
    });

    const yDomain = rangeAffordance(extent(ys), axis.y);
    const xDomain = rangeAffordance(extent(xs), axis.x);
    (xScale as any)
      .domain(xDomain)
      .rangeRound([left, width + left]);
    (yScale as any).domain(yDomain)
      .range([height, 0]);
    setScales({ xScale, yScale })

  }, [])

  return scales;
}


export const useMakeLine: (props: IProps) => string = (props) => {
  const [d, setD] = useState('');


  const { xScale, yScale } = useScales(props);
  useEffect(() => {
    const { curveType = curveCatmullRom, data } = props;
    if (yScale !== null) {
      const curve = (
        x: AnyScale,
        y: AnyScale,
      ) => line()
        .curve(curveType)
        .x((d: any) => {
          return x(d.x);
        })
        .y((d: any) => y(d.y));
      setD(String(curve(xScale, yScale)(data.data as any)));
    }

  }, [xScale, yScale])

  return d;
}
