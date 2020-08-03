import { color } from 'd3-color';
import {
  scaleBand,
  scaleLinear,
} from 'd3-scale';
import React, {
  FC,
  useState,
} from 'react';
import {
  animated,
  SpringConfig,
  useSprings,
} from 'react-spring';
import { Tooltip } from 'react-svg-tooltip';

import { IGroupDataItem } from '../../BaseHistogramD3';
import {
  IBarChartDataSet,
  IHistogramBar,
} from '../../Histogram';
import {
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from '../../utils/bars';
import { EChartDirection } from '../../v3/BarChart';
import {
  TipContent,
  TTipFunc,
} from '../ToolTip';
import { buildBarSprings } from './barHelper';

enum EGroupedBarLayout {
  GROUPED,
  STACKED,
  OVERLAID,
}

interface IProps {
  bins: (string | [number, number])[]
  config?: SpringConfig;
  colorScheme?: readonly string[],
  domain: number[];
  direction?: EChartDirection;
  groupLayout?: EGroupedBarLayout;
  height: number;
  hoverColorScheme?: readonly string[];
  left?: number;
  padding?: IHistogramBar;
  top?: number;
  tip?: TTipFunc;
  values: IBarChartDataSet[];
  visible?: Record<string, boolean>;
  width: number;
}

const paddings = {
  grouped: {
    paddingInner: 0.1,
    paddingOuter: 0,
  },
  overlayMargin: 5,
  paddingInner: 0,
  paddingOuter: 0,
};

export type ExtendedGroupItem = IGroupDataItem & {
  datasetIndex: number;
  binIndex: number;
  percentage: string;
}

const Bars: FC<IProps> = ({
  values,
  domain,
  height,
  width,
  left = 0,
  top = 0,
  groupLayout = EGroupedBarLayout.GROUPED,
  bins,
  config = {
    duration: 250,
  },
  colorScheme = ['#a9a9a9', '#2a5379'],
  hoverColorScheme,
  padding = paddings,
  visible = {},
  tip,
  direction = EChartDirection.horizontal,
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
    const total = count.data.reduce((p, n) => p + n, 0);
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: String(binLabels[i]),
        binIndex: i,
        percentage: total === 0 ? '0' : ((value / total) * 100).toFixed(2),
        value: visible[binLabels[i]] !== false && visible[count.label] !== false ? value : 0,
      });
    });
  });

  const numericScale = scaleLinear()
    .domain(domain)
    .rangeRound([0, direction === EChartDirection.horizontal ? width : height]);

  // Distribute the bin values across the x axis
  const bandScale = scaleBand().domain(binLabels as string[])
    .rangeRound([0, direction === EChartDirection.horizontal ? height : width])
    .paddingInner(paddingInner(padding))
    .paddingOuter(paddingOuter(padding))
    .align(0.5);

  const dataLabels = values.map((c) => c.label);

  // Used to distribute a given bins values 
  const innerDomain = groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels;
  const innerScaleBand = scaleBand()
    .domain(innerDomain)
    .rangeRound([0, bandScale.bandwidth()])
    .paddingInner(groupedPaddingInner(padding))
    .paddingOuter(groupedPaddingOuter(padding)) // Center the bar distribution around the middle;

  const transform = `(${left}, ${top})`;

  const [hover, setHover] = useState(-1);
  const springs = useSprings(dataSets.length, buildBarSprings({
    values,
    height,
    width,
    dataSets,
    numericScale,
    bandScale,
    colorScheme,
    innerDomain,
    innerScaleBand,
    hoverColorScheme,
    groupLayout,
    paddings,
    config,
    direction,
  }));

  const ThisTip = tip ?? TipContent;
  const refs: any[] = [];
  return (
    <>
      <g className="bars"
        transform={`translate${transform}`}>
        {
          springs.map((props: any, i) => {
            refs[i] = React.createRef<any>();
            return <animated.rect
              ref={refs[i]}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              key={dataSets[i].groupLabel + dataSets[i].label}
              height={props.height}
              fill={hover == i ? props.hoverFill : props.fill}
              width={props.width}
              x={props.x as any}
              y={props.y as any}
            />
          })
        }
      </g>
      <g className="tips">
        {
          springs.map((_, i) => <Tooltip triggerRef={refs[i]}>
            <ThisTip item={dataSets[i]}
              bin={bins[i]} />
          </Tooltip>)
        }
      </g>
    </>)
}


export default Bars;
