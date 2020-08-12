import React, {
  FC,
  RefObject,
} from 'react';
import {
  animated,
  interpolate,
} from 'react-spring';

import { EChartDirection } from '../v3/BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
import {
  Label,
  TLabelComponent,
} from './Label';

interface IProps {
  springs: any[];
  items: ExtendedGroupItem[];
  direction: EChartDirection;
  labels?: string[];
  LabelComponent?: TLabelComponent;
  showLabels?: boolean[];
  visible?: Record<string, boolean>;
}
export const Labels: FC<IProps> = ({
  springs,
  items,
  direction,
  labels,
  LabelComponent,
  showLabels = [],
  visible,
}) => {
  const refs: RefObject<any>[] = [];
  return (<g className="labels">
    {
      springs
        .filter((_, i) => {
          const k = String(items[i].groupLabel);
          return visible?.[k] === false ? false : true;
        })
        .filter((_, i) => {
          const index = items[i].datasetIndex;
          return showLabels[index] ?? false;
        }).map((props: any, i) => {

          const item = items[i];
          return <animated.g
            key={`label-${item.groupLabel}.${item.label}`}
            className="chart-label"
            transform={interpolate([props.x, props.y, props.width, props.height], (x, y, w, h) => {
              return direction === EChartDirection.VERTICAL
                ? `translate(${x + (w / 2)},${y})`
                : `translate(${x + w}, ${y + (h / 2)})`;
            })}
          >
            {
              LabelComponent ?
                <LabelComponent item={item}
                  direction={direction} />
                : <Label
                  direction={direction}
                  label={labels?.[i]}
                  item={item} />
            }
          </animated.g>
        })
    }
  </g>)
}
