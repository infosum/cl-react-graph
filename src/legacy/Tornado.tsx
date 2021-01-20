import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  EGroupedBarLayout,
  IGrid,
  IGroupDataItem,
  IHistogramBar,
} from '../Histogram';
import { IDomain } from '../utils/domain';
import { DeepPartial } from '../utils/types';
import { TornadoD3 } from './TornadoD3';
import {
  IAxes,
  IChartAdaptor,
  IChartState,
  IMargin,
  IStroke,
  TipContentFn,
} from './types';

export interface ITornadoDataSet {
  borderColors?: string[];
  colors?: string[];
  label: string;
  data: [number[], number[]];
}

export interface ITornadoData {
  bins: string[];
  counts: ITornadoDataSet[];
  colorScheme?: string[];
  title?: string;
}

export interface ITornadoProps {
  axis: IAxes;
  bar: IHistogramBar;
  center: boolean;
  className: string;
  data: ITornadoData;
  delay: number;
  duration: number;
  colorScheme: string[];
  domain: IDomain;
  grid: IGrid;
  height: number;
  margin: IMargin;
  groupLayout: EGroupedBarLayout;
  onClick?: (bar: IGroupDataItem) => void;
  showBinPercentages: boolean;
  splitBins: [string, string];
  stroke: IStroke;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

/**
 * Tornado component
 */
class Tornado extends Component<DeepPartial<ITornadoProps>, IChartState> {

  private chart: IChartAdaptor<ITornadoProps>;
  private ref: HTMLDivElement | null = null;

  /**
   * Constructor
   */
  constructor(props: DeepPartial<ITornadoProps>) {
    super(props);
    this.chart = new TornadoD3();
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
  public getChartState(): DeepPartial<ITornadoProps> {
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
    return (<div ref={(ref) => this.ref = ref} className="tornado-chart-container"></div>);
  }
}

export default Tornado;
