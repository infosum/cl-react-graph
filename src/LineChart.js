// @flow
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {lineChartD3} from './lineChartD3';
import type {DataSet, DOMEvent, HistogramData, LineChartD3} from '../types';

type Props = {
  data: Object,
  histogram: HistogramData,
  title: string,
  width: number | string
};

type ChartState = {
  data: DataSet[],
  width: number | string,
  yTicks: number,
  height: number,
  tipContainer: string,
  tipContentFn: (info: HistogramData, i: number, d: number) => string
};

class LineChart extends Component {

  lineChart: LineChartD3
  props: Props

  state: {
    parentWidth?: number
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      parentWidth: 0
    };
    this.lineChart = lineChartD3();
  }

  handleResize(e: DOMEvent) {
    let elem = this.getDOMNode(),
      width = elem.offsetWidth;

    this.setState({
      parentWidth: width
    });
    this.lineChart.create(this.getDOMNode(), this.getChartState());
  }

  componentDidMount() {
    this.lineChart.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', e => this.handleResize());
      this.handleResize();
    }
  }

  componentDidUpdate() {
    this.lineChart.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Get the chart state. If a histogram has been assigned
   * to the props, then render this data. Otherwise generate
   * a random normal dist
   * @return {Object} data and chart props
   */
  getChartState(): ChartState {
    const {data} = this.props;
    let {width} = this.props;

    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      data,
      width,
      yTicks: 0,
      height: 200,

      tipContentFn: (info, i, d) =>
        info[i].x.toFixed(1)
    };
  }

  componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.lineChart.destroy(this.getDOMNode());
  }

  getDOMNode(): Node {
    return ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(props: Props) {
    this.lineChart.update(this.getDOMNode(), this.getChartState());
  }

  render(): React$Element<any> | null {
    return <div className="chart-container"></div>;
  }
}

export default LineChart;
