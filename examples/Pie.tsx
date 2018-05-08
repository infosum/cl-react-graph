import * as React from 'react';
import { Component } from 'react';
import { Legend, PieChart } from '../src';
import { data, data3 } from './data';

interface IProps {
  theme: string[];
}

interface IState {
  dataIndex: number;
  visible: {
    [key: string]: boolean;
  };
}

const toggleData = [data, data3];
console.log('toggleData', toggleData);
class PieExamples extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      dataIndex: 0,
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

  private toggleData() {
    this.setState({
      dataIndex: this.state.dataIndex === 0 ? 1 : 0,
    });
  }

  public render() {
    const { theme } = this.props;
    const { dataIndex, visible } = this.state;
    const labels = {
      display: true,
    };
    // const widths = [200, 300];
    const widths = ['100%', '100%'];
    const heights = [200, 100];
    return (
      <div>
        <h3>Pie Chart</h3>
        {/* <PieChart
          width={'100%'}
          height={heights[dataIndex]}
          donutWidth={0}
          labels={{
            display: false,
            displayFn: () => null,
          }}
          data={toggleData[dataIndex]} /> */}

        <button onClick={() => this.toggleData()}>
          toggle data
          </button>

        <h4>Donut</h4>
        <PieChart width={400}
          colorScheme={theme}
          backgroundColor="#eee"
          height={heights[dataIndex]}
          donutWidth={10}
          data={toggleData[dataIndex]}

          visible={visible}
          labels={labels} />
        <Legend
          theme={theme}
          data={toggleData[dataIndex]}
          onSelect={(label) => this.toggleVisible(label)}
          visible={visible}
        />
      </div>
    );
  }
}

export default PieExamples;
