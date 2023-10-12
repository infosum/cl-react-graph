import { interpolate } from "d3-interpolate";
import React, { useLayoutEffect, useRef } from "react";

import { animated, useSpring } from "@react-spring/web";

import { AnyChartPoint, ChartPoint, LineProps } from "../LineChart";
import { ColorSchemeDefs, getFill } from "../utils/colorScheme";
import { Axes } from "../utils/types";
import { useMakeArea } from "../utils/useMakeLine";

type Props<T extends AnyChartPoint = ChartPoint> = {
  label?: string;
  line: LineProps;
  width: number;
  left: number;
  height: number;
  axis: Axes;
  data: T[];
};

export const AreaFill = (props: Props) => {
  const { label = "", line } = props;
  const className = `area-${label.replace(/[^a-z]/gi, "")}`;
  const { previous, current } = useMakeArea(props);

  const spring = useSpring<any>({
    from: { t: 0 },
    to: { t: 1 },
    reset: true,
    delay: 0,
  });

  const getInterpolator = () => interpolate(previous, current);

  const interpolator = useRef(getInterpolator());
  useLayoutEffect(() => {
    interpolator.current = getInterpolator();
  });

  return (
    <>
      <ColorSchemeDefs schemes={[[line.fill.fill]]} />

      <animated.path
        className={className}
        fill={getFill(line.fill.fill)}
        d={spring.t.to((t) => interpolator.current(t))}
      />
    </>
  );
};
