import { color } from 'd3-color';
import { scaleLinear } from 'd3-scale';
import React, {
  FC,
  RefObject,
  useState,
} from 'react';
import {
  animated,
  SpringConfig,
  useSprings,
} from 'react-spring';

import { IBarChartDataSet } from '../../Histogram';
import { EChartDirection } from '../../v3/BarChart';
import { TLabelComponent } from '../Label';
import { Labels } from '../Labels';
import { TTipFunc } from '../ToolTip';
import { ToolTips } from '../ToolTips';
import { ExtendedGroupItem } from './Bars';
import { buildHistogramSprings } from './histogramHelper';

const binWidth = (bin: [number, number]) => bin[1] - bin[0];

interface IProps {
  bins: [number, number][];
  config?: SpringConfig;
  colorScheme?: readonly string[],
  continuousDomain: [number, number];
  direction?: EChartDirection;
  domain: [number, number];
  height: number;
  hoverColorScheme?: readonly string[];
  labels?: string[];
  left?: number;
  showLabels?: boolean[];
  LabelComponent?: TLabelComponent;
  stroke?: string;
  top?: number;
  tip?: TTipFunc;
  values: IBarChartDataSet[];
  visible?: Record<string, boolean>;
  width: number;
}

const HistogramBars: FC<IProps> = ({
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
}) => {
  if (width === 0) {
    return null;
  }

  if (!hoverColorScheme) {
    hoverColorScheme = colorScheme.map((c) => color(c)?.brighter(0.1).toString()) as readonly string[];
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

  const numericScale = scaleLinear()
    .domain(domain)
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


export default HistogramBars;
