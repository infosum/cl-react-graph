import React from 'react';

import { ExtendedGroupItem } from './Bars/Bars';

export type TipFunc = (props: {
  item: ExtendedGroupItem,
  bin: string | [number, number];
}) => JSX.Element;

export const TipContent: TipFunc = ({ item, bin }) => {
  return <>

    <defs>
      <filter id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />/** stdDeviation is how much to blur */
        <feOffset dx="2" dy="2" result="offsetblur" />/** how much to offset */
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />/** slope is the opacity of the shadow */
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />/** this contains the offset blurred image */
          <feMergeNode in="SourceGraphic" />/** this contains the element that the filter is applied to */
        </feMerge>
      </filter>
    </defs>

    <rect
      role="tooltip"
      filter="url(#dropshadow)"
      x={12} y={-12} width={150} height={85} rx={3} ry={3} fill='#fff' />
    <foreignObject x="0" y="0" width="160" height="85">
      {
        // @ts-ignore
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ paddingLeft: '10px', textAlign: 'center', height: '85px' }}>
          <strong>{item.groupLabel}</strong>
          <div data-testid="bin">
            {Array.isArray(bin) ? `${bin[0]} - ${bin[1]}` : bin}
          </div>
          <div data-testid="count">
            <strong>Count:</strong> {item.value}
          </div>
          <div>
            <strong>Percent:</strong> {item.percentage}%
          </div>
        </div>
      }
    </foreignObject>
  </>
}
