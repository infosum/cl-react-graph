import React from 'react';

import { ExtendedGroupItem } from './Bars/Bars';

export type TTipFunc = (props: {
  item: ExtendedGroupItem,
  bin: string | [number, number];
}) => JSX.Element;

export const TipContent: TTipFunc = ({ item, bin }) => <>
  <rect x={12} y={-12} width={150} height={65} rx={3} ry={3} fill='#fff' />
  <foreignObject x="0" y="0" width="160" height="65">
    {
      // @ts-ignore
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ paddingLeft: '10px', textAlign: 'center', height: '65px' }}>
        <strong>{item.groupLabel}</strong>
        <div>
          <strong>Count:</strong> {item.value}
        </div>
        <div>
          <strong>Percent:</strong> {item.percentage}%
          </div>
      </div>
    }
  </foreignObject>
</>
