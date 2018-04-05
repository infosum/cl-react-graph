import * as React from 'react';
import { Component } from 'react';
import { Legend, PieChart } from '../src';
import { data, data3 } from './data';

interface IProps {
  theme: string[];
}

interface IState {
  visible: {
    [key: string]: boolean;
  };
}

class PieExamples extends Component<IProps, IState> {
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
    const labels = {
      display: true,
    };
    return (
      <div>
        <h3>Pie Chart</h3>
        <PieChart
          width="100%"
          height={200}
          data={data} />

        <h4>Donut</h4>
        <PieChart width={300}
          colorScheme={theme}
          backgroundColor="#eee"
          height={300}
          donutWidth={10}
          data={data3}
          visible={visible}
          labels={labels} />
        <Legend
          theme={theme}
          data={data3}
          onSelect={(label) => this.toggleVisible(label)}
          visible={visible}
        />
      </div>
    );
  }
}

export default PieExamples;
