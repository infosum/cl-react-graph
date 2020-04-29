import React, {
  createContext,
  FC,
} from 'react';

import Bars from './components/Bars';
import Base from './components/Base';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import { IHistogramData } from './Histogram';

interface IProps {
  data: IHistogramData;
}

const Histogram: FC<IProps> = ({
  data,
}) => {
  console.log('values', data.counts[0].data);
  return (
    <Base
      width={800}
      height={400}>
      <YAxis
        width={100}
        height={300}
        values={data.counts[0].data}
        domain={[0, 80000]}
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
        values={data.counts}
        domain={[0, 80000]}
      />
    </Base>
  )

}

export default Histogram;
