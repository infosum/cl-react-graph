import merge from 'deepmerge';
import * as React from 'react';
import { Component } from 'react';
import { Histogram, Legend } from '../src';
import { axis, data, data2, data3, grid } from './data';

interface IProps {
  theme: string[];
}

interface IState {
  axis: IAxes;
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
      axis: merge<IAxes>({}, axis),
      visible: {},
    };
  }

  private toggleAxisLabel() {
    const a = merge(this.state.axis, {
      x: {
        label: this.state.axis.x.label === 'boyaka' ? 'fred' : 'boyaka',
      },
      y: {
        label: this.state.axis.y.label === 'boyaka' ? 'fred' : 'boyaka',
      },
    });
    this.setState({ axis: a });
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

    const dataLegendData = {
      bins: data.counts.map((c) => c.label),
      counts: [{
        data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
        label: '',
      }],
    };
    console.log(this.state.axis);
    const theme2 = [theme[0]];
    return (
      <div>
        <h3>Histograms</h3>
        <Histogram data={data2} width={400} height={400} margin={{
          left: 30,
          top: 30,
        }}
          domain={{ min: 0, max: 10 }} />
        <Histogram data={data}
          grid={grid}
          width={'100%'}
          height={720}
          visible={visible}
          colorScheme={theme}
          axis={this.state.axis}
          tipContentFn={tipContentFn} />
        <Legend
          theme={theme}
          data={dataLegendData}
          onSelect={(label) => this.toggleVisible(label)}
          visible={visible}
        />

        <Histogram data={data2}
          bar={{ margin: 0.1 }}
          colorScheme={theme}
          visible={visible}
          width={700}
          height={350}
          axis={this.state.axis} />

        <Legend
          theme={theme2}
          data={data2}
          onSelect={(label) => this.toggleVisible(label)}
          visible={visible}
        />
        <button onClick={() => this.toggleAxisLabel()}>
          toggleAxisLabel</button>
      </div>
    );
  }
}

export default HistogramExamples;
