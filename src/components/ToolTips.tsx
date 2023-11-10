import React, { RefObject } from "react";
import { Tooltip } from "react-svg-tooltip";

import { ExtendedGroupItem } from "./Bars/Bars";
import { TipContent, TipFunc } from "./ToolTip";

type Props = {
  items: ExtendedGroupItem[];
  springs: any[];
  refs: RefObject<any>[];
  bins: (string | [number, number])[];
  tip?: TipFunc;
};
export const ToolTips = ({ items, springs, refs, bins, tip }: Props) => {
  const ThisTip = tip ?? TipContent;
  return (
    <g className="tips">
      {springs.map((_, i) => {
        return (
          <Tooltip
            key={`bar-tip-${items[i].datasetIndex}-${items[i].binIndex}-${items[i].label}-${items[i].value}`}
            triggerRef={refs[i]}
          >
            <ThisTip item={items[i]} bin={bins[i % bins.length]} />
          </Tooltip>
        );
      })}
    </g>
  );
};
