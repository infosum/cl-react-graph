import {
  scaleBand,
  scaleLinear,
} from 'd3';
import React, { FC } from 'react';
import {
  animated,
  useSprings,
} from 'react-spring';

import { IGroupDataItem } from '../../BaseHistogramD3';
import { IHistogramDataSet } from '../../Histogram';
import {
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
} from '../../utils/bars';
import { buildBarSprings } from './barHelper';

enum EGroupedBarLayout {
  GROUPED,
  STACKED,
  OVERLAID,
}

interface IProps {
  values: IHistogramDataSet[];
  domain: number[]
  height: number;
  width: number;
  left?: number;
  top?: number;
  groupLayout?: EGroupedBarLayout;
  bins: string[]
  colorScheme?: string[],
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
  colorScheme = ['#a9a9a9', '#2a5379'],
}) => {

  const dataSets: ExtendedGroupItem[] = [];

  values.forEach((count, datasetIndex) => {
    count.data.forEach((value, i) => {
      dataSets.push({
        groupLabel: count.label,
        datasetIndex,
        label: bins[i],
        binIndex: i,
        // value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
        value,
      });
    });
  });

  const yScale = scaleLinear()
    .domain(domain)
    .rangeRound([0, height]);

  // Distribute the bin values across the x axis
  const xScale = scaleBand().domain(bins);
  xScale.rangeRound([0, width])
    .paddingInner(0.1)
    .paddingOuter(0.2)
    .align(0.5);

  const dataLabels = values.map((c) => c.label);

  // Used to distribute a given bins values 
  const innerScaleBand = scaleBand();
  const innerDomain = groupedBarsUseSameXAxisValue({ groupLayout }) ? ['main'] : dataLabels;
  innerScaleBand
    .domain(innerDomain)
    .rangeRound([0, xScale.bandwidth()])
    .paddingInner(groupedPaddingInner(paddings))
    .paddingOuter(groupedPaddingOuter(paddings)) // Center the bar distribution around the middle;

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
  }));

  return (
    <>
      <g className="bars"
        transform={`translate${transform}`}>
        {
          springs.map((props, i) => {
            return <animated.rect
              key={dataSets[i].groupLabel + dataSets[i].label}
              height={props.height}
              fill={props.fill}
              width={props.width}
              x={props.x as any}
              y={props.y as any}
            />
          }
          )
        }
      </g>
    </>)
}


export default Bars;
