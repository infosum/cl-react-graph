import React, { FC } from 'react';

import { EChartDirection } from '../BarChart';
import { ExtendedGroupItem } from './Bars/Bars';

interface IProps {
  direction: EChartDirection;
  label?: string;
  item: ExtendedGroupItem;
  fill?: string;
  inverse?: boolean;
}

export type TLabelComponent = (props: IProps) => JSX.Element;

export const Label: FC<IProps> = ({
  direction,
  label,
  item,
  fill = '#a9a9a9',
  inverse = false,
}) => {
  const offset = direction === EChartDirection.VERTICAL
    ? '0, -5'
    : inverse ? '-5, 0' : '5, 0';
  const textAnchor = direction === EChartDirection.VERTICAL
    ? 'middle'
    : inverse ? 'end' : 'left';
  return (
    <g transform={`translate(${offset})`}
      role="cell">
      <text textAnchor={textAnchor}
        fill={fill}
        fontSize="0.675rem">{
          label ?? `${Math.round(Number(item.percentage))}%`}
      </text>
    </g>
  )
}
