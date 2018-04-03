import * as React from 'react';
import { Component } from 'react';
import { Legend, Histogram } from '../src';
import { axis, data, data2, data3, grid } from './data';

interface IProps {
  theme: string[];
}

interface IState {
  visible: {
    [key: string]: boolean;
  };
}
const tipContentFn = (bins: string[], i, d) =>
  bins[i] + '<br />HI THere ' + d.toFixed(2);

class HistogramExamples extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: {},
    };
  }

  private toggleVisible(key: string) {
    const v = this.state.visible.hasOwnProperty(key)
      ? !this.state.visible[key]
      : false;
    this.setState({
      visible: { ...this.state.visible, [key]: v },
    });
  }

  public render() {
    const { theme } = this.props;
    const { visible } = this.state;
    console.log(visible);
    return (
      <div>
        <h3>Histograms</h3>
        {/* <Histogram data={data2} width={400} height={400} margin={{
          left: 30,
          top: 30,
        }}
          domain={{ min: 0, max: 50000 }} /> */}
        <Histogram data={data}
          grid={grid}
          width={700}
          height={150}
          tipContentFn={tipContentFn} />
        <Histogram data={data2} bar={{ margin: 4 }}
          colorScheme={theme}
          visible={visible}
          width={700}
          height={350}
          axis={axis} />

        <Legend
          theme={theme}
          data={data2}
          onSelect={(label) => this.toggleVisible(label)}
          visible={visible}
        />
      </div>
    );
  }
}

export default HistogramExamples;
