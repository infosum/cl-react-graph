import { interpolate } from 'd3-interpolate';
import React, {
  FC,
  useLayoutEffect,
  useRef,
} from 'react';
import {
  animated,
  useSpring,
} from 'react-spring';

import { IAxes } from '../legacy/types';
import {
  IAnyChartPoint,
  IChartPoint,
  ILineProps,
} from '../LineChart';
import { useMakeArea } from '../utils/useMakeLine';

interface IProps<T extends IAnyChartPoint = IChartPoint> {
  label?: string;
  line: ILineProps;
  width: number;
  left: number;
  height: number;
  axis: IAxes;
  data: T[];
}

export const AreaFill: FC<IProps> = (props) => {
  const { label = '', line } = props;
  const className = `area-${label.replace(/[^a-z]/gi, '')}`;
  const { previous, current } = useMakeArea(props);

  const spring = useSpring<any>({
    from: { t: 0 },
    to: { t: 1 },
    reset: true,
    delay: 0
  });

  const getInterpolator = () => interpolate(previous, current);

  const interpolator = useRef(getInterpolator());
  useLayoutEffect(() => {
    interpolator.current = getInterpolator();
  });

  return (
    <animated.path
      className={className}
      fill={line.fill.fill}
      d={spring.t.interpolate((t) => interpolator.current(t))}
    />
  )
}

export default AreaFill;
