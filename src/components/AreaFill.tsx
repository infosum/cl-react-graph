import React, { FC } from 'react';

import {
  IProps,
  useMakeArea,
} from '../utils/useMakeLine';

const AreaFill: FC<IProps> = (props) => {
  const { data } = props;
  const className = `area-${data.label.replace(/[^a-z]/gi, '')}`;
  const d = useMakeArea(props);
  return (
    <>
      <path
        className={className}
        fill={data.line.fill.fill}
        d={d}
      />
    </>
  )
}

export default AreaFill;
