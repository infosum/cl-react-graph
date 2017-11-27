/// <reference path="./interfaces.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { scatterPlotD3 } from './ScatterPlotD3';

interface IChartState {
  choices: string[];
  data: any[];
  height: number;
  distModels: string[];
  split: string;
  parentWidth: number;
  width: number | string;
}

class ScatterPlot extends Component<IScatterPlotProps, IChartState> {

  private chart;
  private ref;

  public static defaultProps = {
    height: 400,
    width: '100%',
  };

  constructor(props: IScatterPlotProps) {
    super(props);
    this.chart = scatterPlotD3();
    this.state = {
      choices: [],
      data: [],
      distModels: [],
      height: this.props.height,
      parentWidth: 400,
      split: '',
      width: this.props.width,
    };
  }

  private handleResize() {
    const { legendWidth, padding } = this.props;
    const chartWidth = Math.max(200, this.ref.offsetWidth - padding - legendWidth);
    const chartHeight = Math.max(200, window.innerHeight - padding -
      this.ref.getBoundingClientRect().top);
    const chartSize = Math.min(chartHeight, chartWidth);

    this.setState({
      parentWidth: chartSize,
    });

    this.chart.create(this.getDOMNode(), this.getChartState());
  }

  public componentDidMount() {
    this.chart.create(this.getDOMNode(), this.getChartState());
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  public componentDidUpdate() {
    this.chart.update(this.getDOMNode(), this.getChartState());
  }

  private getChartState(): IChartState {
    let { width } = this.props;
    const { data, choices, split, distModels, height } = this.props;
    if (typeof width === 'string' && width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      choices,
      data,
      distModels,
      height,
      parentWidth: this.state.parentWidth,
      split,
      width,
    };
  }

  public componentWillReceiveProps(props: IScatterPlotProps) {
    this.chart.update(this.getDOMNode(), this.getChartState());
  }

  public componentWillUnmount() {
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.chart.destroy(this.getDOMNode());
  }

  private getDOMNode() {
    return ReactDOM.findDOMNode(this.ref);
  }

  public render() {
    return <div ref={(ref) => this.ref = ref} className="scatterplot-chart-container"></div>;
  }
}

export default ScatterPlot;
