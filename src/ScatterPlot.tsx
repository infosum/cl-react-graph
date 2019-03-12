import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  IChartAdaptor,
  IChartState,
} from './Histogram';
import { scatterPlotD3 } from './ScatterPlotD3';
import { DeepPartial } from './utils/types';

export interface IScatterPlotProps {
  choices: string[];
  className: string;
  data: {
    keys: string[],
    values: any[];
  };
  delay: number;
  distModels: string[];
  duration: number;
  height: number;
  legendWidth: number;
  colorScheme: string[];
  padding: number;
  radius: number;
  split: string;
  width: string | number;
}
class ScatterPlot extends Component<DeepPartial<IScatterPlotProps>, IChartState> {

  private chart: IChartAdaptor<IScatterPlotProps>;
  private ref: HTMLDivElement | null = null;

  public static defaultProps = {
    height: 400,
    width: '100%',
  };

  constructor(props: IScatterPlotProps) {
    super(props);
    this.chart = scatterPlotD3();
    this.state = {
      parentWidth: 300,
    };
  }

  private handleResize() {
    const el = this.getDOMNode();
    if (el) {
      const width = (this.ref && this.ref.offsetWidth) ? this.ref.offsetWidth : 0;

      this.setState({
        parentWidth: width,
      }, () => this.chart.create(el, this.getChartState()));
    }
  }

  public componentDidMount() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.create(el, this.getChartState());
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  public componentDidUpdate() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.update(el, this.getChartState());
  }

  private getChartState(): DeepPartial<IScatterPlotProps> {
    let { width } = this.props;
    const { children, ...rest } = this.props;
    if (typeof width === 'string' && width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      ...rest,
      width,
    };
  }

  public componentWillReceiveProps(props: DeepPartial<IScatterPlotProps>) {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.update(el, this.getChartState());
  }

  public componentWillUnmount() {
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.destroy(el);
  }

  private getDOMNode(): Element | undefined {
    const node = ReactDOM.findDOMNode(this.ref);
    if (node instanceof HTMLElement) {
      return node;
    }
    return undefined;
  }

  public render() {
    return <div ref={(ref) => this.ref = ref} className="scatterplot-chart-container"></div>;
  }
}

export default ScatterPlot;
