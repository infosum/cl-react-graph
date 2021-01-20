import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { DeepPartial } from '../utils/types';
import { scatterPlotD3 } from './ScatterPlotD3';
import {
  IChartAdaptor,
  IChartState,
} from './types';

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
      }, () => this.chart.update(this.getChartState()));
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
    this.chart.update(this.getChartState());
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
    this.chart.update(this.getChartState());
  }

  public componentWillUnmount() {
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    const el = this.getDOMNode();
    this.chart.destroy();
  }

  private getDOMNode(): Element | undefined | null {
    const node = ReactDOM.findDOMNode(this.ref);
    try {
      if (node instanceof Text) {
        return undefined;
      }
      return node;
    } catch (e) {
      // instanceof Text not working when running tests - just presume its ok
      return node as Element;
    }
  }

  public render() {
    return <div ref={(ref) => this.ref = ref} className="scatterplot-chart-container"></div>;
  }
}

export default ScatterPlot;