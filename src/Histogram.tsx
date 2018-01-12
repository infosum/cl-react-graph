/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { histogramD3 } from './HistogramD3';

/**
 * Histogram component
 */
class Histogram extends Component<IHistogramProps, IHistogramChartState> {

  private histogram: IChartAdaptor;
  private ref;

  public static defaultProps = {
    axis: {},
    bar: {
      margin: 2,
      width: 10,
    },
    grid: {
      x: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
      y: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
    },
    height: 200,
    margin: {
      left: 5,
      top: 5,
    },
    stroke: {
      color: (d, i, colors) => d3.rgb(colors(i)).darker(1),
      width: 1,
    },
    tipContentFn: (bins: string[], i, d) =>
      bins[i] + '<br />' + d.toFixed(2),
    width: '100%',
  };

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props: IHistogramProps) {
    super(props);
    this.histogram = histogramD3();
    const counts: IHistogramDataSet[] = [];
    const bins: string[] = [];
    this.state = {
      bar: {
        margin: 2,
        width: 10,
      },
      data: {
        bins,
        counts,
      },
      parentWidth: 300,
      width: props.width,
    };
  }

  /**
   * Handle the page resize
   */
  private handleResize() {
    const elem = this.getDOMNode();
    const width = this.ref.offsetWidth ? this.ref.offsetWidth : 0;

    this.setState({
      parentWidth: width,
    });

    this.histogram.create(elem, this.getChartState());
  }

  /**
   * Component mounted
   */
  public componentDidMount() {
    this.histogram.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  /**
   * Component updated
   */
  public componentDidUpdate() {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Get the chart state
   * @return {Object} ChartState
   */
  public getChartState(): IHistogramChartState {
    let { width } = this.props;
    const { axis, bar, grid, height, data, margin, stroke, tipContentFn } = this.props;
    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      axis,
      bar,
      data,
      grid,
      height,
      margin,
      stroke,
      tipContentFn,
      width,
    };
  }

  /**
   * Props recieved, update the chart
   * @param {Object} props Props
   */
  public componentWillReceiveProps(props: IHistogramProps) {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Component will un mount, remove the chart and
   * any event listeners
   */
  public componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.histogram.destroy(this.getDOMNode());
  }

  /**
   * Get the chart's dom node
   * @return {Element} dom noe
   */
  private getDOMNode() {
    return ReactDOM.findDOMNode(this.ref);
  }

  /**
   * Render
   * @return {Dom} node
   */
  public render(): JSX.Element {
    return (<div ref={(ref) => this.ref = ref} className="histogram-chart-container"></div>);
  }
}

export default Histogram;
