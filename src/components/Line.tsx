import React, { FC } from 'react';

import {
  IProps,
  useMakeLine,
} from '../utils/useMakeLine';

const Line: FC<IProps> = (props) => {
  const { data } = props;
  const className = `line-${data.label.replace(/[^a-z]/gi, '')}`;
  const d = useMakeLine(props);
  return (
    <>
      <path
        className={className}
        fill="none"
        stroke-dashoffset={data.line.strokeDashOffset}
        stroke-dasharray={data.line.strokeDashOffset}
        stroke={data.line.stroke}
        d={d}
      />
    </>
  )
}

export default Line;
