import { rgb } from 'd3-color';
import React from 'react';
import ReactDOM from 'react-dom';

import { histogramD3 } from './HistogramD3';
import tips from './tip';
import {
  axis as defaultAxis,
  lineStyle,
  stroke,
} from './utils/defaults';
import Omit from './utils/types';

export interface IChartAdaptor<P> {
  create: (el: Element, props: Partial<P>) => void;
  update: (el: Element, props: Partial<P>) => void;
  destroy: (el: Element) => void;
}

export interface IHistogramBar {
  groupMargin: number;
  margin: number;
  width: number;
}

export interface IGrid {
  x: {
    height: number;
    ticks: number;
    visible: boolean;
    style: ISVGLineStyle;
  };
  y: {
    style: ISVGLineStyle;
    ticks: number;
    visible: boolean;
  };
}

export interface IStroke {
  color: ((d, i: number, colors: (i: number) => string) => string) | string;
  dasharray: string;
  linecap: 'butt' | 'round' | 'square';
  width: number;
}

export interface IAxes {
  y: IAxis;
  x: IAxis;
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
  max: number | null;
  min: number | null;
}

export interface IMargin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
export interface IHistogramProps {
  axis: IAxes;
  bar: IHistogramBar;
  className: string;
  data: IHistogramData;
  delay: number;
  duration: number;
  colorScheme: string[];
  domain: IDomain;
  grid: IGrid;
  height: number;
  margin: IMargin;
  stroke: IStroke;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

type Scale = 'LINEAR' | 'TIME' | 'LOG';

export interface ISVGLineStyle {
  'stroke': string;
  'fill': string;
  'opacity': number;
  'stroke-width': number;
  'stroke-opacity': number;
  'shape-rendering': string;
  'visible': boolean;
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
  dateFormat: string;
  numberFormat: string;
  ticks: number;
  tickValues: number[];
  height: number;
  label: string;
  margin: number;
  scale: Scale;
  style: ISVGLineStyle;
  text: {
    style: ISVGTextStyle;
  };
  width: number;
  tickSize: number;
  visible: boolean;
}

export type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;

/**
 * Histogram component
 */
class Histogram extends React.Component<IHistogramProps, IChartState> {

  private chart: IChartAdaptor<IHistogramProps>;
  private ref: HTMLDivElement | null = null;

  public static defaultProps: Omit<IHistogramProps, 'data'> = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0,
      margin: 0,
      width: 10,
    },
    className: '',
    colorScheme: [],
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 100,
    grid: {
      x: {
        height: 0,
        style: {
          ...lineStyle,
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
          ...lineStyle,
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
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    stroke: {
      ...stroke,
      color: (d, i, colors) => rgb(colors(i)).darker(1).toString(),
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i, d) =>
      bins[i] + '<br />' + d.toFixed(2),
    visible: {},
    width: '100%',
  };

  /**
   * Constructor
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
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    const width = (this.ref && this.ref.offsetWidth) ? this.ref.offsetWidth : 0;

    this.setState({
      parentWidth: width,
    }, () => this.chart.create(el, this.getChartState()));
  }

  /**
   * Component mounted
   */
  public componentDidMount() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.create(el, this.getChartState());
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
    this.chart.update(el, this.getChartState());
  }

  /**
   * Get the chart state
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
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.chart.destroy(el);
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

export default Histogram;
