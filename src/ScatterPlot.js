// @flow
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {scatterPlotD3} from './ScatterPlotD3';
import type {DOMEvent, ScatterPlot3D} from '../types';

type Props = {
  choices: string[],
  distModels: string[],
  data: any,
  chartSize: string | number,
  legendWidth: number,
  padding: number,
  split: string
};

type ChartState = {
  chartSize: string | number,
  choices: string[],
  data: any,
  distModels: string[],
  split: string
};

class ScatterPlot extends Component {

  chart: ScatterPlot3D

  props: Props

  state: {
    parentWidth: number
  }

    // static defaultProps = {
    //   chartSize: '100%',
    //   padding: 20,
    //   legendWidth: 100
    // };

  constructor(props: Props) {
    super(props);
    this.chart = scatterPlotD3();
    this.state = {
      parentWidth: 400
    };
  }

  handleResize(e: DOMEvent) {
    const {legendWidth, padding} = this.props;
    let elem = this.getDOMNode(),
      chartWidth = Math.max(200, elem.offsetWidth - padding - legendWidth),
      chartHeight = Math.max(200, window.innerHeight - padding -
        elem.getBoundingClientRect().top),
      chartSize = Math.min(chartHeight, chartWidth);

    this.setState({
      parentWidth: chartSize
    });

    this.chart.create(this.getDOMNode(), this.getChartState());
  }

  componentDidMount() {
    this.chart.create(this.getDOMNode(), this.getChartState());
    if (this.props.chartSize === '100%') {
      window.addEventListener('resize', e => this.handleResize());
      this.handleResize();
    }
  }

  componentDidUpdate() {
    this.chart.update(this.getDOMNode(), this.getChartState());
  }

  getChartState(): ChartState {
    let {chartSize, data, choices, split, distModels} = this.props;
    if (chartSize === '100%') {
      chartSize = this.state.parentWidth || 300;
    }

    return {
      chartSize,
      choices,
      data,
      distModels,
      split
    };
  }

  componentWillReceiveProps(props: Props) {
    this.chart.update(this.getDOMNode(), this.getChartState());
  }

  componentWillUnmount() {
    if (this.props.chartSize === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.chart.destroy(this.getDOMNode());
  }

  getDOMNode(): Node {
    return ReactDOM.findDOMNode(this);
  }

  render(): React$Element<any> {
    return <div className="scatterplot-chart-container"></div>;
  }
}

export default ScatterPlot;
