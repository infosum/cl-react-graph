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

import {
  IProps,
  useMakeLine,
} from '../utils/useMakeLine';

type Props = {
  animate?: boolean;
  label: string;

} & IProps;

// @TODO look at using https://github.com/pbeshai/d3-interpolate-path instead 
const Line: FC<Props> = (props) => {
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

export default Line;
