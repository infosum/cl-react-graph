import React, { FC } from 'react';

import Bars from './components/Bars/Bars';
import Base from './components/Base';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import {
  EGroupedBarLayout,
  IHistogramData,
} from './Histogram';

interface IProps {
  data: IHistogramData;
}

const Histogram: FC<IProps> = ({
  data,
}) => {
  return (
    <Base
      width={800}
      height={400}>
      <YAxis
        width={100}
        height={300}
        values={[0, 45000, 90000]}
        domain={[0, 150000]}
      />
      <XAxis
        width={400}
        height={40}
        top={300}
        left={100}
        values={data.bins} />

      <Bars
        left={100}
        height={300}
        width={400}
        groupLayout={EGroupedBarLayout.STACKED}
        values={data.counts}
        bins={data.bins}
        domain={[0, 80000]}
      />
    </Base>
  )

}

export default Histogram;
