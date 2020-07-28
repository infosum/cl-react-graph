import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { IGroupDataItem } from './BaseHistogramD3';
import { HistogramD3 } from './HistogramD3';
import { DeepPartial } from './utils/types';

export interface IChartAdaptor<P> {
  create: (el: Element, props: DeepPartial<P>) => void;
  update: (props: DeepPartial<P>) => void;
  destroy: () => void;
}

export enum EColorManipulations {
  'negate' = 'negate',
  'lighten' = 'lighten',
  'darken' = 'darken',
  'saturate' = 'saturate',
  'desaturate' = 'desaturate',
  'whiten' = 'whiten',
  'blacken' = 'blacken',
  'fade' = 'fade',
  'opaquer' = 'opaquer',
  'rotate' = 'rotate',
};

export interface IHistogramBar {
  // Padding for the inside of grouped datasets
  grouped: {
    paddingInner: number;
    paddingOuter: number;
  }
  // Padding for the outside of grouped datasets or single datasets
  paddingOuter: number;
  paddingInner: number;
  // @deprecated in 3.0
  hover?: Partial<Record<EColorManipulations, number>>,
  overlayMargin: number; // When bars are rendered as EGroupedBarLayout.OVERLAID (offset between the two overlaid bars)
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

export interface IAnnotation {
  color: string;
  value: string;
}

export enum EGroupedBarLayout {
  GROUPED,
  STACKED,
  OVERLAID,
}
export interface IHistogramProps {
  axis: IAxes;
  bar: IHistogramBar;
  className: string;
  annotations?: IAnnotation[];
  data: IHistogramData;
  delay: number;
  duration: number;
  colorScheme: string[];
  domain: IDomain;
  id?: string;
  grid: IGrid;
  height: number;
  margin: IMargin;
  showBinPercentages?: boolean[];
  annotationTextSize?: string;
  /**
   *  @deprecated
   */
  stacked?: boolean;
  groupLayout: EGroupedBarLayout;
  onClick?: (bar: IGroupDataItem) => void;
  stroke: IStroke;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  axisLabelTipContentFn?: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

export type Scale = 'LINEAR' | 'TIME' | 'LOG' | 'ORDINAL';

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
  tickValues: null | number[];
  visible: boolean;
}

export type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;

/**
 * Histogram component
 */
class Histogram extends Component<DeepPartial<IHistogramProps>, IChartState> {

  private chart: IChartAdaptor<IHistogramProps>;
  private ref: HTMLDivElement | null = null;

  /**
   * Constructor
   */
  constructor(props: DeepPartial<IHistogramProps>) {
    super(props);
    this.chart = new HistogramD3();
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
    }, () => this.chart.update(this.getChartState()));
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
    this.chart.update(this.getChartState());
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
    this.chart.destroy();
  }

  /**
   * Get the chart's dom node
   */
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

  /**
   * Render
   */
  public render(): JSX.Element {
    return (<div ref={(ref) => this.ref = ref} className="histogram-chart-container"></div>);
  }
}

export default Histogram;
