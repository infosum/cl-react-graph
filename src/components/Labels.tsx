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
  colorScheme?: readonly string[];
  direction: EChartDirection;
  items: ExtendedGroupItem[];
  LabelComponent?: TLabelComponent;
  labels?: string[];
  showLabels?: boolean[];
  springs: any[];
  visible?: Record<string, boolean>;
}
export const Labels: FC<IProps> = ({
  colorScheme = ['#a9a9a9', '#2a5379'],
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
        .map((props: any, i) => {

          const item = items[i];
          if (!showLabels[item.datasetIndex]) {
            return null;
          }
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
                  fill={colorScheme[item.datasetIndex]}
                  direction={direction}
                  label={labels?.[i]}
                  item={item} />
            }
          </animated.g>
        })
    }
  </g>)
}
