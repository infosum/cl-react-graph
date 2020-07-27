import React from 'react';

import { ExtendedGroupItem } from './Bars';

export type TTipFunc = (props: {
  item: ExtendedGroupItem,
}) => JSX.Element;

export const TipContent: TTipFunc = ({ item }) => <>
  <rect x={12} y={-12} width={150} height={15} rx={3} ry={3} fill='#fff' />
  <text x={17} y={0} fontSize={12} fill='#000'>
    {item.groupLabel}: {item.label}<br /> {item.value}
  </text>
</>
