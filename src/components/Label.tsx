import React from 'react';

import {
  animated,
  SpringValue,
} from '@react-spring/web';

import { EChartDirection } from '../BarChart';
import { ExtendedGroupItem } from './Bars/Bars';

export type Props = {
  direction?: EChartDirection;
  fill?: string;
  inverse?: boolean;
  item: ExtendedGroupItem;
  height: SpringValue<number>;
  containerHeight: number;
  x: SpringValue<number>;
  y: SpringValue<number>;
  width: SpringValue<number>;
  label?: string;
};

export type TLabelComponent = (props: Props) => JSX.Element;

export const Label = ({
  fill,
  height,
  width,
  x,
  y,
  direction = EChartDirection.VERTICAL,
  item,
  inverse = false,
  containerHeight,
  label,
}: Props) => {
  const offset =
    direction === EChartDirection.VERTICAL
      ? "0, -5"
      : inverse
      ? "-5, 0"
      : "5, 0";
  const textAnchor =
    direction === EChartDirection.VERTICAL
      ? "middle"
      : inverse
      ? "end"
      : "left";
  const labelX =
    direction === EChartDirection.VERTICAL ? x.get() + width.get() / 2 : width;
  const labelY =
    direction === EChartDirection.VERTICAL
      ? containerHeight - height.get()
      : y.get() + height.get() / 2;
  return (
    <animated.g
      transform={`translate(${offset})`}
      role="cell"
      height={height}
      x={width}
      y={y}
    >
      <animated.text
        textAnchor={textAnchor}
        x={labelX}
        dominantBaseline="middle"
        y={labelY}
        fill={fill}
        fontSize="0.675rem"
      >
        {label ?? `${Math.round(Number(item.percentage))}%`}
      </animated.text>
    </animated.g>
  );
};
