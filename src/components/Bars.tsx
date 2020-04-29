import {
  scaleBand,
  scaleLinear,
} from 'd3';
import React, { FC } from 'react';
import {
  animated,
  useSprings,
} from 'react-spring';

import { IHistogramDataSet } from '../Histogram';

interface IProps {
  // values: number[],
  values: IHistogramDataSet[];
  domain?: number[]
  height: number;
  width: number;
  left?: number;
  top?: number;
}

const Bars: FC<IProps> = ({
  values,
  domain,
  height,
  width,
  left = 0,
  top = 0,
}) => {
  console.log('dataset', values);
  const allValues = values.reduce((prev, dataset) => {
    return prev.concat(dataset.data);
  }, [] as number[]);
  const yScale = scaleLinear().domain(domain || [Math.min(...allValues as number[]), Math.max(...allValues as number[])]);

  const xScale = scaleBand().domain(allValues.map((v) => String(v)));
  yScale.rangeRound([0, height]);
  xScale.rangeRound([0, width])
    .paddingInner(0.1)
    .paddingOuter(0.2)
    .align(0.5);

  const transform = `(${left}, ${top})`;

  const colorScheme = ['#a9a9a9', '#2a5379']

  const props = values.map((dataset, datsetIndex) => {
    return dataset.data.map((v, i) => ({
      raw: v,
      from: {
        height: 0,
        fill: colorScheme[datsetIndex],
        x: Number(xScale(String(v))),
        y: height,
      },
      to: {
        height: yScale(v),
        fill: colorScheme[datsetIndex],
        x: Number(xScale(String(v))),
        y: height - yScale(v),
      }
    }))
  }).reduce((prev, next) => {
    return prev.concat(next);
  }, [] as any[]);

  const springs = useSprings(props.length, props);

  // const springs = useSprings(values[0].data.length, values[0].data.map((v, i) => ({
  //   from: {
  //     height: 0,
  //     fill: colorScheme[i % values.length],
  //     x: Number(xScale(String(v))),
  //     y: height,
  //   },
  //   to: {
  //     height: yScale(v),
  //     fill: colorScheme[i % values.length],
  //     x: Number(xScale(String(v))),
  //     y: height - yScale(v),
  //   }
  // })));


  console.log('props', props);

  return (
    <>
      <g className="bars"
        transform={`translate${transform}`}>
        {
          springs.map((props) => <animated.rect
            height={props.height}
            fill={props.fill}
            width={String(xScale.bandwidth())}
            x={props.x as any}
            y={props.y as any}
          />)
        }
      </g>
    </>)
}

export default Bars;
