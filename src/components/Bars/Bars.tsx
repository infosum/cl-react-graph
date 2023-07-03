import { color } from 'd3-color';
import {
  scaleBand,
  scaleLinear,
} from 'd3-scale';
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
import {
  BarChartDataSet,
  EGroupedBarLayout,
  GroupDataItem,
  HistogramBar,
} from '../../Histogram';
import {
  buildBarDatasets,
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from '../../utils/bars';
import { TLabelComponent } from '../Label';
import { Labels } from '../Labels';
import { TipFunc } from '../ToolTip';
import { ToolTips } from '../ToolTips';
import { buildBarSprings } from './barHelper';

export type Props = {
  bins: (string | [number, number])[]
  config?: SpringConfig;
  colorScheme?: readonly string[],
  domain: number[];
  direction?: EChartDirection;
  id?: string;
  groupLayout?: EGroupedBarLayout;
  height: number;
  hoverColorScheme?: readonly string[];
  LabelComponent?: TLabelComponent;
  labels?: string[];
  left?: number;
  padding?: HistogramBar;
  top?: number;
  tip?: TipFunc;
  showLabels?: boolean[];
  values: BarChartDataSet[];
  visible?: Record<string, boolean>;
  width: number;
  inverse?: boolean;
  rx?: number;
  ry?: number;
}

const paddings = {
  grouped: {
    paddingInner: 0.1,
    paddingOuter: 0,
  },
  overlayMargin: 0.5,
  paddingInner: 0,
  paddingOuter: 0,
};

export type ExtendedGroupItem = GroupDataItem & {
  datasetIndex: number;
  binIndex: number;
  percentage: string;
}

export const defaultPadding: HistogramBar = {
  grouped: {
    paddingInner: 0.1,
    paddingOuter: 0,
  },
  paddingInner: 0.1,
  paddingOuter: 0,
  overlayMargin: 0.5,
  hover: {
    lighten: 0.1,
  },
}

export const Bars = ({
  bins,
  colorScheme = ['#a9a9a9', '#2a5379'],
  config = {
    duration: 250,
  },
  direction = EChartDirection.HORIZONTAL,
  domain,
  id = '',
  groupLayout = EGroupedBarLayout.GROUPED,
  height,
  hoverColorScheme,
  LabelComponent,
  labels,
  left = 0,
  padding = paddings,
  showLabels = [],
  tip,
  top = 0,
  values,
  visible = {},
  width,
  inverse = false,
  rx = 0,
  ry = 0,
}: Props) => {
  if (width === 0) {
    return null;
  }
  if (!hoverColorScheme) {
    hoverColorScheme = colorScheme.map((c) => color(c)?.brighter(0.1).toString()) as readonly string[];
  }
  const { dataSets, binLabels } = buildBarDatasets({ values, bins, visible });

  const numericScale = scaleLinear()
    .domain(domain)
    .rangeRound([0, direction === EChartDirection.HORIZONTAL ? width : height]);

  // Distribute the bin values across the x axis
  const bandScale = scaleBand().domain(binLabels as string[])
    .rangeRound([0, direction === EChartDirection.HORIZONTAL ? height : width])
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


  const itemWidths = Array.from(dataSets.reduce((prev, next) => prev.add(next.datasetIndex), new Set<number>()))
    .map((i) => {
      const itemWidth = getBarWidth(i, groupLayout, paddings, innerScaleBand);
      return itemWidth;
    });

  const [hover, setHover] = useState(-1);
  const springs = useSprings(dataSets.length, buildBarSprings({
    bandScale,
    colorScheme,
    config,
    dataSets,
    direction,
    groupLayout,
    height,
    hoverColorScheme,
    innerDomain,
    innerScaleBand,
    inverse,
    itemWidths,
    numericScale,
    paddings,
    values,
    width,
  }));

  const refs: RefObject<any>[] = [];
  return (
    <>
      <g className="bars"
        role="row"
        transform={`translate${transform}`}>
        <g className="bar-lines">
          {
            springs.map((props: any, i) => {
              refs[i] = React.createRef<any>();
              return <animated.rect
                ref={refs[i]}
                role="cell"
                data-testid={`chart-bar-${id}-${i}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                key={`bar-${dataSets[i].groupLabel}-${dataSets[i].label}-${dataSets[i].binIndex}`}
                height={props.height}
                fill={hover == i ? props.hoverFill : props.fill}
                width={props.width}
                rx={rx}
                ry={ry}
                x={props.x as any}
                y={props.y as any}
              />
            })
          }
        </g>
        <Labels
          inverse={inverse}
          colorScheme={colorScheme}
          springs={springs}
          showLabels={showLabels}
          items={dataSets}
          direction={direction}
          labels={labels}
          visible={visible}
          width={width}
          LabelComponent={LabelComponent} />

      </g>

      <ToolTips
        springs={springs}
        refs={refs}
        bins={bins}
        tip={tip}
        items={dataSets} />
    </>
  );
}
