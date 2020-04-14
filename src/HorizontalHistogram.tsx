import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  IChartAdaptor,
  IChartState,
  IHistogramProps,
} from './Histogram';
import { HorizontalHistogramD3 } from './HorizontalHistogramD3';
import { DeepPartial } from './utils/types';

/**
 * Horizontal Histogram component
 */
class HorizontalHistogram extends Component<DeepPartial<IHistogramProps>, IChartState> {

  private histogram: IChartAdaptor<IHistogramProps>;
  private ref: HTMLDivElement | null = null;

  /**
   * Constructor
   */
  constructor(props: DeepPartial<IHistogramProps>) {
    super(props);
    this.histogram = new HorizontalHistogramD3();
    this.state = {
      parentWidth: 300,
    };
  }

  /**
   * Handle the page resize
   */
  private handleResize() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    const width = (this.ref && this.ref.offsetWidth) ? this.ref.offsetWidth : 0;

    this.setState({
      parentWidth: width,
    }, () => this.histogram.update(this.getChartState()));
  }

  /**
   * Component mounted
   */
  public componentDidMount() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.histogram.create(el, this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  /**
   * Component updated
   */
  public componentDidUpdate() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.histogram.update(this.getChartState());
  }

  /**
   * Get the chart state
   */
  public getChartState(): DeepPartial<IHistogramProps> {
    let { width } = this.props;
    const { children, ...rest } = this.props;
    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      ...rest,
      width,
    };
  }

  /**
   * Props received, update the chart
   */
  public componentWillReceiveProps() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.histogram.update(this.getChartState());
  }

  /**
   * Component will un mount, remove the chart and
   * any event listeners
   */
  public componentWillUnmount() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.histogram.destroy();
  }

  /**
   * Get the chart's dom node
   */
  private getDOMNode(): Element | undefined {
    const node = ReactDOM.findDOMNode(this.ref);
    if (node instanceof HTMLElement) {
      return node;
    }
    return undefined;
  }

  /**
   * Render
   */
  public render(): JSX.Element {
    return (<div ref={(ref) => this.ref = ref} className="histogram-chart-container"></div>);
  }
}

export default HorizontalHistogram;
