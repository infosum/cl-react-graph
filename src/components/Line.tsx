import { interpolate } from 'd3-interpolate';
import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import {
  animated,
  useSpring,
} from '@react-spring/web';

import {
  Props as UseMakeLineProps,
  useMakeLine,
} from '../utils/useMakeLine';

type Props = {
  animate?: boolean;
  label: string;
} & UseMakeLineProps;

// @TODO look at using https://github.com/pbeshai/d3-interpolate-path instead 
export const Line = (props: Props) => {
  const { label = '', line } = props;
  const className = `line-${label.replace(/[^a-z]/gi, '')}`;
  const { previous, current } = useMakeLine(props);

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
    <>
      <animated.path
        data-testid={className}
        className={className}
        fill="none"
        strokeDashoffset={line.strokeDashOffset}
        strokeDasharray={line.strokeDashArray}
        stroke={line.stroke}
        d={props.animate
          ? spring.t.interpolate((t) => interpolator.current(Number(t)))
          : current}
      />
    </>
  )
}
