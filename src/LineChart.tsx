/// <reference path="./interfaces.d.ts" />
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { lineChartD3 } from './lineChartD3';

interface IState {
  data: IChartPoint[];
  width: number | string;
  height: number;
  tipContainer?: string;
  tipContentFn?: (info: IHistogramData, i: number, d: number) => string;
  parentWidth?: number;
}

class LineChart extends Component<ILineChartProps, IState> {

  private lineChart;
  private ref;

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      data: [],
      height: 400,
      parentWidth: 0,
      width: 400,
    };
    this.lineChart = lineChartD3();
  }

  private handleResize() {
    const elem = this.ref;
    const width = elem.offsetWidth;

    this.setState({
      parentWidth: width,
    });
    this.lineChart.create(this.getDOMNode(), this.getChartState());
  }

  public componentDidMount() {
    this.lineChart.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  public componentDidUpdate() {
    this.lineChart.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Get the chart state. If a histogram has been assigned
   * to the props, then render this data. Otherwise generate
   * a random normal dist
   * @return {Object} data and chart props
   */
  public getChartState(): ILineChartProps {
    const { axis, data, grid } = this.props;
    let { width } = this.props;

    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }

    const r: ILineChartProps = {
      data,
      height: 200,
      tipContentFn: (info, i, d) =>
        info[i].x.toFixed(1),
      width,
    };

    if (axis) {
      r.axis = axis;
    }
    if (grid) {
      r.grid = grid;
    }
    return r;
  }

  public componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.lineChart.destroy(this.getDOMNode());
  }

  public getDOMNode() {
    return ReactDOM.findDOMNode(this.ref);
  }

  public componentWillReceiveProps(props: ILineChartProps) {
    this.lineChart.update(this.getDOMNode(), this.getChartState());
  }

  public render(): JSX.Element {
    return <div ref={(ref) => this.ref = ref} className="chart-container"></div>;
  }
}

export default LineChart;
