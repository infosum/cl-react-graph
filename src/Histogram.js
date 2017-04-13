// @flow
import * as d3 from 'd3';
import React, {Component, Element} from 'react';
import ReactDOM from 'react-dom';
import {histogramD3} from './HistogramD3';
import type {DOMEvent, ChartAdaptor, HistogramData} from '../types';

type Props = {
  data: HistogramData,
  width: string | number
};

type ChartState = {
  data: HistogramData,
  height: number,
  tipContainer: string,
  tipContentFn: ((info: HistogramData, i: number, d: number) => string),
  width: number | string,
  yTicks: number
};

/**
 * Histogram component
 */
class Histogram extends Component {

  histogram: ChartAdaptor

  props: Props

  state: {
    parentWidth: number
  }

  // static defaultProps = {
  //   width: '100%'
  // };

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props: Props) {
    super(props);
    this.histogram = histogramD3();
    this.state = {
      parentWidth: 300
    };
  }

  /**
   * Handle the page resize
   * @param {Event} e .
   */
  handleResize(e: DOMEvent) {
    let elem = this.getDOMNode(),
      width = elem.offsetWidth;

    this.setState({
      parentWidth: width
    });

    this.histogram.create(this.getDOMNode(), this.getChartState());
  }

  /**
   * Component mounted
   */
  componentDidMount() {
    this.histogram.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', e => this.handleResize());
      this.handleResize();
    }
  }

  /**
   * Component updated
   */
  componentDidUpdate() {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Get the chart state
   * @return {Object} ChartState
   */
  getChartState(): ChartState {
    let {width, data} = this.props;
    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }
    return {
      data,
      height: 200,
      tipContentFn: (bins: string[], i, d) =>
        bins[i] + '<br />' + d.toFixed(2) + '%',
      width,
      stroke: {
        color: (d, i, colors) => d3.rgb(colors(i)).darker(1),
        width: 2
      },
      yTicks: 0
    };
  }

  /**
   * Props recieved, update the chart
   * @param {Object} props Props
   */
  componentWillReceiveProps(props: Props) {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Component will un mount, remove the chart and
   * any event listeners
   */
  componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.histogram.destroy(this.getDOMNode());
  }

  /**
   * Get the chart's dom node
   * @return {Element} dom noe
   */
  getDOMNode(): Node {
    return ReactDOM.findDOMNode(this);
  }

  /**
   * Render
   * @return {Dom} node
   */
  render(): Element<any> {
    return (<div className="histogram-chart-container"></div>);
  }
}

export default Histogram;
