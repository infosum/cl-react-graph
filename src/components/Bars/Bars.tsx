import {
  scaleBand,
  scaleLinear,
} from 'd3';
import React, { FC } from 'react';
import {
  animated,
  SpringConfig,
  useSprings,
} from 'react-spring';
import { Tooltip } from 'react-svg-tooltip';

import { IGroupDataItem } from '../../BaseHistogramD3';
import {
  IHistogramBar,
  IHistogramDataSet,
} from '../../Histogram';
import {
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from '../../utils/bars';
import { buildBarSprings } from './barHelper';
import {
  TipContent,
  TTipFunc,
} from './ToolTip';

enum EGroupedBarLayout {
  GROUPED,
  STACKED,
  OVERLAID,
}

interface IProps {
  bar?: IHistogramBar;
  values: IHistogramDataSet[];
  domain: number[]
  height: number;
  width: number;
  left?: number;
  top?: number;
  groupLayout?: EGroupedBarLayout;
  bins: string[]
  colorScheme?: string[],
  config: SpringConfig;
  visible?: Record<string, boolean>;
  tip?: TTipFunc;
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
  bar = paddings,
  visible = {},
  tip,
}) => {

  const dataSets: ExtendedGroupItem[] = [];

  values.forEach((count, datasetIndex) => {
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: bins[i],
        binIndex: i,
        value: visible[bins[i]] !== false && visible[count.label] !== false ? value : 0,
      });
    });
  });

  const yScale = scaleLinear()
    .domain(domain)
    .rangeRound([0, height]);

  // Distribute the bin values across the x axis
  const xScale = scaleBand().domain(bins);
  xScale.rangeRound([0, width])
    .paddingInner(paddingInner(bar))
    .paddingOuter(paddingOuter(bar))
    .align(0.5);

  const dataLabels = values.map((c) => c.label);

  // Used to distribute a given bins values 
  const innerScaleBand = scaleBand();
  const innerDomain = groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels;
  innerScaleBand
    .domain(innerDomain)
    .rangeRound([0, xScale.bandwidth()])
    .paddingInner(groupedPaddingInner(bar))
    .paddingOuter(groupedPaddingOuter(bar)) // Center the bar distribution around the middle;

  const transform = `(${left}, ${top})`;


  const springs = useSprings(dataSets.length, buildBarSprings({
    values,
    height,
    dataSets,
    yScale,
    xScale,
    colorScheme,
    innerDomain,
    innerScaleBand,
    groupLayout,
    paddings,
    config,
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
              key={dataSets[i].groupLabel + dataSets[i].label}
              height={props.height}
              fill={props.fill}
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
            <ThisTip item={dataSets[i]} />
          </Tooltip>)
        }
      </g>
    </>)
}


export default Bars;
