/// <reference path="./interfaces.d.ts" />
import { rgb } from 'd3-color';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { joyPlotD3 } from './JoyplotD3';

export interface IJoyPlotProps {
  axis?: IAxes;
  bar?: IHistogramBar;
  className?: string;
  data: IHistogramData[];
  delay?: number;
  duration?: number;
  colorScheme?: string[];
  domain?: IDomain;
  grid?: IGrid;
  height: number;
  margin?: IMargin;
  stroke?: IStroke;
  tip?: any;
  tipContainer?: string;
  tipContentFn?: TipContentFn;
  visible?: { [key: string]: boolean };
  width: number | string;
}

/**
 * Histogram component
 */
class Histogram extends Component<IJoyPlotProps, IChartState> {

  private chart: IChartAdaptor;
  private ref;

  public static defaultProps: Partial<IJoyPlotProps> = {
    axis: {},
    bar: {
      margin: 0,
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
      color: (d, i, colors) => rgb(colors(i)).darker(1).toString(),
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
  constructor(props: IJoyPlotProps) {
    super(props);
    this.chart = joyPlotD3();
    this.state = {
      parentWidth: 300,
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
    }, () => this.chart.create(elem, this.getChartState()));
  }

  /**
   * Component mounted
   */
  public componentDidMount() {
    this.chart.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', (e) => this.handleResize());
      this.handleResize();
    }
  }

  /**
   * Component updated
   */
  public componentDidUpdate() {
    this.chart.update(this.getDOMNode(), this.getChartState());
  }

  /**
   * Get the chart state
   * @return {Object} ChartState
   */
  public getChartState(): IJoyPlotProps {
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
   * Component will un mount, remove the chart and
   * any event listeners
   */
  public componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.chart.destroy(this.getDOMNode());
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
