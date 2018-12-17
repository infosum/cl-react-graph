import { rgb } from 'd3-color';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { histogramD3 } from './HistogramD3';

export interface IChartAdaptor {
  create: (el: Element | Text, props: { [key: string]: any }) => void;
  update: (el: Element | Text, props: { [key: string]: any }) => void;
  destroy: (el: Element | Text) => void;
}

export interface IHistogramBar {
  groupMargin?: number;
  margin?: number;
  width?: number;
}

export interface IGrid {
  x?: {
    height?: number;
    ticks?: number;
    visible?: boolean;
    style?: ISVGLineStyle;
  };
  y?: {
    style?: ISVGLineStyle;
    ticks?: number;
    visible?: boolean;
  };
}

export interface IStroke {
  color: ((d, i: number, colors: (i: number) => string) => string) | string;
  dasharray?: string;
  linecap?: string;
  width: number;
}

export interface IAxes {
  y?: IAxis;
  x?: IAxis;
}
export interface IHistogramDataSet {
  borderColors?: string[];
  colors?: string[];
  label: string;
  data: number[];
}

export interface IHistogramData {
  bins: string[];
  counts: IHistogramDataSet[];
  colorScheme?: string[];
  title?: string;
}

export interface IDomain {
  max: number;
  min: number;
}

export interface IMargin {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
export interface IHistogramProps {
  axis?: IAxes;
  bar?: IHistogramBar;
  className?: string;
  data: IHistogramData;
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
  tipContentFn?: TipContentFn<string>;
  visible?: { [key: string]: boolean };
  width: number | string;
}

type Scale = 'LINEAR' | 'TIME' | 'LOG';

export interface ISVGLineStyle {
  'stroke'?: string;
  'fill'?: string;
  'opacity'?: number;
  'stroke-width'?: number;
  'stroke-opacity'?: number;
  'shape-rendering'?: string;
  'visible'?: boolean;
}

interface ISVGTextStyle {
  fill?: string;
  'font-size'?: string;
  dy?: string | number;
  'stroke-opacity'?: number;
  'text-anchor'?: string;
  transform?: string;
  x?: string | number;
  y?: string | number;
}

export interface IChartState {
  parentWidth?: number;
}

export interface IAxis {
  dateFormat?: string;
  numberFormat?: string;
  ticks?: number;
  tickValues?: number[];
  height?: number;
  label?: string;
  margin?: number;
  scale?: Scale;
  style?: ISVGLineStyle;
  text?: {
    style: ISVGTextStyle;
  };
  width?: number;
  tickSize?: number;
  visible?: boolean;
}

export type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;

/**
 * Histogram component
 */
class Histogram extends Component<IHistogramProps, IChartState> {

  private chart: IChartAdaptor;
  private ref;

  public static defaultProps: Partial<IHistogramProps> = {
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
  constructor(props: IHistogramProps) {
    super(props);
    this.chart = histogramD3();
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
  public getChartState(): IHistogramProps {
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
