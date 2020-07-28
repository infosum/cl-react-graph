import {
  scaleBand,
  scaleLinear,
  scalePoint,
} from 'd3-scale';
import React, { FC } from 'react';

// import Bar from './components/Bar';
import Base from './components/Base';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import { ITornadoData } from './Tornado';

interface IProps {
  data: ITornadoData;
  splitBins: [string, string];
}
const Tornado: FC<IProps> = ({
  data,
  splitBins = ['Left', 'Right'],
}) => {
  const yAxisTextWidth = 40;
  const baseProps = {
    width: 600,
    height: 200,
    padding: 15,
  }
  const chartHeight = baseProps.height - baseProps.padding;
  const chartWidth = baseProps.width - baseProps.padding;
  const l = 100;
  const r = 200;

  const yScale = scaleBand();

  yScale.domain(data.bins)
    .rangeRound([chartHeight, 0]);

  // Split the chart left/right
  const xLeftRight = scalePoint<any>();
  xLeftRight.range([chartWidth / 4, chartWidth * (3 / 4)])
    .domain(splitBins);

  const xScale = scaleLinear();
  return null;
  // return (
  //   <Base {...baseProps}
  //   >
  //     <YAxis
  //       {...baseProps}
  //       textWidth={yAxisTextWidth}
  //       position="center"
  //       scale={yScale} />
  //     <YAxis
  //       {...baseProps}
  //       textWidth={yAxisTextWidth}
  //       position="right"
  //       values={[3, 6, 9]}
  //       scale={yScale} />
  //     <YAxis
  //       {...baseProps}
  //       textWidth={yAxisTextWidth}
  //       position="left"
  //       values={data.bins}
  //       scale={yScale} />
  //     <XAxis
  //       {...baseProps}
  //       width={baseProps.width - yAxisTextWidth}
  //       values={[l, 0, r]}
  //       scale={xScale} />
  //     {
  //       data.counts.map((count) => {
  //         const bars = count.data[0].map((d, i) => {
  //           return <Bar key={d}
  //             width={d}
  //             height={20}
  //             position={{ x: 50, y: i * 20 }}
  //           />
  //         });
  //         return <>{bars}</>
  //       })
  //     }
  //   </Base>

  // )
}

export default Tornado;

