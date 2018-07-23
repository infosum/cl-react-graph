import * as React from 'react';
import { Component } from 'react';
import { JoyPlot } from '../src';
import { data2 } from './data';

interface IProps {
  theme: string[];
}

interface IState {
  visible: {
    [key: string]: boolean;
  };
}

class JoypLotExamples extends Component<IProps, IState> {

  public render() {
    const data3 = {
      ...data2,
      counts: [{
        ...data2.counts[0],
        data: [7, 6, 5, 4, 3, 2, 1],
        label: 'Data 2',
      }],
      title: 'Plot 2',
    };

    const { theme } = this.props;
    return (
      <div>
        <h3>JoyPlot</h3>
        <JoyPlot data={[data2, data3]}
          colorScheme={['rgba(0, 0, 0, 0.5)', '#666']}
          width={400} height={400} />

      </div>
    );
  }
}

export default JoypLotExamples;
