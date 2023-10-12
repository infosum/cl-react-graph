import { extent } from "d3-array";
import {
  area,
  curveCatmullRom,
  CurveFactory,
  CurveFactoryLineOnly,
  line,
} from "d3-shape";
import { useEffect, useState } from "react";

import { AnyChartPoint, ChartPoint, LineProps } from "../LineChart";
import { Axes } from "../utils/types";
import { rangeAffordance } from "./domain";
import { AnyScale, buildScales } from "./scales";

const ZERO_SUBSTITUTE: number = 1e-6;

export type Props<T extends AnyChartPoint = ChartPoint> = {
  data: T[];
  axis: Axes;
  line: LineProps;
  curveType?: CurveFactory | CurveFactoryLineOnly;
  width: number;
  left?: number;
  height: number;
};

export const useScales: (props: Omit<Props, "line" | "curveType">) => {
  xScale: any;
  yScale: any;
} = ({ data, width, height, axis, left = 0 }) => {
  const [scales, setScales] = useState<{ xScale: any; yScale: any }>({
    xScale: null,
    yScale: null,
  });
  useEffect(() => {
    const [xScale, yScale] = buildScales(axis);
    const ys: any[] = [];
    const xs: any[] = [];
    data.forEach((d) => {
      let parsedY = axis.y.scale === "log" && d.y === 0 ? ZERO_SUBSTITUTE : d.y;
      let parsedX = axis.x.scale === "log" && d.x === 0 ? ZERO_SUBSTITUTE : d.x;
      ys.push(parsedY);
      xs.push(parsedX);
    });

    const yDomain = rangeAffordance(extent(ys), axis.y);
    const xDomain = rangeAffordance(extent(xs), axis.x);

    (xScale as any).domain(xDomain).rangeRound([left, width + left]);
    (yScale as any).domain(yDomain).range([height, 0]);
    setScales({ xScale, yScale });
  }, [data, width, height, left]);

  return scales;
};

export const useMakeLine: (props: Props) => {
  previous: string;
  current: string;
} = (props) => {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const { xScale, yScale } = useScales(props);
  useEffect(() => {
    const { data } = props;
    const { curveType = curveCatmullRom } = props.line;
    if (yScale !== null) {
      const curve = (x: AnyScale, y: AnyScale) =>
        line()
          .curve(curveType)
          .x((d: any) => {
            return x(d.x);
          })
          .y((d: any) => y(d.y));
      const next = String(curve(xScale, yScale)(data as any));
      if (next !== current) {
        setPrevious(current);
        setCurrent(next);
      }
    }
  }, [xScale, yScale, props.data, props.width, props.line]);

  return { previous, current };
};

export const useMakeArea: (props: Props) => {
  previous: string;
  current: string;
} = (props) => {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const { xScale, yScale } = useScales(props);
  useEffect(() => {
    const { data, height } = props;
    const { curveType = curveCatmullRom } = props.line;
    if (yScale !== null) {
      const thisArea = () =>
        area()
          .curve(curveType as CurveFactory)
          .x((d: any) => xScale(d.x))
          .y0((d) => height)
          .y1((d: any) => yScale(d.y));
      const next = String(thisArea()(data as any));
      if (next !== current) {
        setPrevious(current);
        setCurrent(next);
      }
    }
  }, [xScale, yScale, props.data]);
  return { previous, current };
};
