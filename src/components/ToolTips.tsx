import React, {
  FC,
  RefObject,
} from 'react';
import { Tooltip } from 'react-svg-tooltip';

import { ExtendedGroupItem } from './Bars/Bars';
import {
  TipContent,
  TTipFunc,
} from './ToolTip';

interface IProps {
  items: ExtendedGroupItem[];
  springs: any[];
  refs: RefObject<any>[];
  bins: (string | [number, number])[];
  tip?: TTipFunc;
}
export const ToolTips: FC<IProps> = ({
  items,
  springs,
  refs,
  bins,
  tip,
}) => {
  const ThisTip = tip ?? TipContent;
  return (
    <g className="tips">
      {
        springs.map((_, i) => {
          return (
            <Tooltip
              key={`bar-tip-${items[i].groupLabel}.${items[i].label}`}
              triggerRef={refs[i]}>
              <ThisTip item={items[i]}
                bin={bins[i]} />
            </Tooltip>
          );
        })
      }
    </g>
  )
};

