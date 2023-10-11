import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React, {
  RefObject,
  useState,
} from 'react';

import {
  animated,
  SpringConfig,
  useSprings,
} from '@react-spring/web';

import { EChartDirection } from '../../BarChart';
import { BarChartDataSet } from '../../Histogram';
import {
  ColorScheme,
  ColorSchemeDefs,
} from '../../utils/colorScheme';
import { getHoverColorScheme } from '../../utils/hoverColorScheme';
import { TLabelComponent } from '../Label';
import { Labels } from '../Labels';
import { TipFunc } from '../ToolTip';
import { ToolTips } from '../ToolTips';
import { ExtendedGroupItem } from './Bars';
import { buildHistogramSprings } from './histogramHelper';

const binWidth = (bin: [number, number]) => bin[1] - bin[0];

type Props = {
  bins: [number, number][];
  config?: SpringConfig;
  colorScheme?: ColorScheme;
  continuousDomain: [number, number];
  direction?: EChartDirection;
  domain: [number, number];
  height: number;
  hoverColorScheme?: ColorScheme;
  id: string;
  labels?: string[];
  left?: number;
  showLabels?: boolean[];
  LabelComponent?: TLabelComponent;
  stroke?: string;
  top?: number;
  tip?: TipFunc;
  values: BarChartDataSet[];
  visible?: Record<string, boolean>;
  width: number;
  rx?: number;
  ry?: number;
}

export const HistogramBars = ({
  bins,
  config = {
    duration: 250,
  },
  colorScheme = ['#a9a9a9', '#2a5379'],
  continuousDomain,
  direction = EChartDirection.HORIZONTAL,
  domain,
  height,
  hoverColorScheme,
  id,
  LabelComponent,
  labels,
  left = 0,
  showLabels = [],
  stroke = "#FFF",
  top = 0,
  tip,
  values,
  visible = {},
  width,
  rx = 0,
  ry = 0,
}: Props) => {
  if (width === 0) {
    return null;
  }

  if (!hoverColorScheme) {
    hoverColorScheme = getHoverColorScheme(colorScheme);
  }
  const dataSets: ExtendedGroupItem[] = [];
  const binLabels = bins.reduce((p, n) => p.concat(Array.isArray(n) ? n : [n]), [] as (number | string)[]);

  values.forEach((count, datasetIndex) => {

    const totalArea = count.data.reduce((p, n, i) => p + n * binWidth(bins[i]), 0);
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: String(binLabels[i]),
        binIndex: i,
        percentage: totalArea === 0 ? '0' : (((value * binWidth(bins[i])) / totalArea) * 100).toFixed(2),
        value: visible[binLabels[i]] !== false && visible[count.label] !== false ? value : 0,
      });
    });
  });

  // Numeric scale should try to start at 0 otherwise bar heights are incorrect when domain = [x, x]
  const scaleDomain = extent([0, ...domain]) as [number, number];
  const numericScale = scaleLinear()
    .domain(scaleDomain)
    .rangeRound([0, direction === EChartDirection.HORIZONTAL ? width : height]);

  // Distribute the bin values across the x axis
  const continuousScale = scaleLinear()
    .domain(continuousDomain)
    .rangeRound([0, direction === EChartDirection.VERTICAL ? width : height]);

  const transform = `(${left}, ${top})`;

  const [hover, setHover] = useState(-1);
  const springs = useSprings(dataSets.length, buildHistogramSprings({
    bins,
    values,
    height,
    width,
    dataSets,
    continuousScale,
    numericScale,
    colorScheme,
    hoverColorScheme,
    config,
    direction,
  }));

  const refs: RefObject<any>[] = [];
  return (
    <>
      <ColorSchemeDefs schemes={[colorScheme, hoverColorScheme]} />
      <g className="bars"
        transform={`translate${transform}`}>
        {
          springs.map((props: any, i) => {
            const item = dataSets[i];
            refs[i] = React.createRef<any>();
            return <animated.rect
              ref={refs[i]}
              stroke={stroke}
              className="chart-bar"
              role="cell"
              rx={rx}
              ry={ry}
              data-testid={`chart-bar-${id}-${i}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              key={`bar-${item.groupLabel}.${item.label}.${item.value}`}
              height={props.height}
              fill={hover == i ? props.hoverFill : props.fill}
              width={props.width}
              x={props.x as any}
              y={props.y as any}
            />
          })
        }
        <Labels
          colorScheme={colorScheme}
          springs={springs}
          showLabels={showLabels}
          items={dataSets}
          width={width}
          direction={direction}
          labels={labels}
          LabelComponent={LabelComponent} />
      </g>

      <ToolTips
        springs={springs}
        refs={refs}
        bins={bins}
        tip={tip}
        items={dataSets} />

    </>)
}
