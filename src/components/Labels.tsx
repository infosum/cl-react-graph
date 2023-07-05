import React from 'react';

import {
  animated,
  to,
} from '@react-spring/web';

import { EChartDirection } from '../BarChart';
import { ExtendedGroupItem } from './Bars/Bars';
import {
  Label,
  TLabelComponent,
} from './Label';

type Props = {
  colorScheme?: readonly string[];
  direction: EChartDirection;
  items: ExtendedGroupItem[];
  LabelComponent?: TLabelComponent;
  labels?: string[];
  showLabels?: boolean[];
  springs: any[];
  visible?: Record<string, boolean>;
  inverse?: boolean;
  width: number;
}
export const Labels = ({
  colorScheme = ['#a9a9a9', '#2a5379'],
  springs,
  items,
  direction,
  labels,
  LabelComponent,
  showLabels = [],
  visible,
  inverse = false,
  width,
}: Props) => {
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
            key={`label-${item.datasetIndex}.${item.label}.${item.value}`}
            className="chart-label"
            transform={to([props.x, props.y, props.width, props.height], (x, y, w, h) => {
              if (inverse) {
                return direction === EChartDirection.VERTICAL
                  ? `translate(${x + (w / 2)},${h + (w / 2)})`
                  : `translate(${width - w}, ${y + (h / 2)})`;
              }
              return direction === EChartDirection.VERTICAL
                ? `translate(${x + (w / 2)},${y})`
                : `translate(${x + w}, ${y + (h / 2)})`;
            })}
          >
            {
              LabelComponent ?
                <LabelComponent item={item}
                  inverse={inverse}
                  direction={direction} />
                : <Label
                  inverse={inverse}
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
