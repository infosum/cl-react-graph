import { rgb } from 'd3-color';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  IAxes,
  IChartAdaptor,
  IChartState,
  IDomain,
  IGrid,
  IHistogramBar,
  IHistogramData,
  IMargin,
  IStroke,
  TipContentFn,
} from './Histogram';
import { joyPlotD3 } from './JoyplotD3';
import {
  axis as defaultAxis,
  grid as gridDefault,
  lineStyle,
  stroke,
} from './utils/defaults';

export interface IJoyPlotProps {
  axis: IAxes;
  bar: IHistogramBar;
  className: string;
  data: IHistogramData[];
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

/**
 * JoyPlot component
 */
class JoyPlot extends React.Component<IJoyPlotProps, IChartState> {

  private chart: IChartAdaptor<IJoyPlotProps>;
  private ref: HTMLDivElement | null = null;

  public static defaultProps: Partial<IJoyPlotProps> = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 0,
      width: 10,
    },
    grid: gridDefault,
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
      width: 1,
    },
    width: '100%',
  };

  /**
   * Constructor
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

export default JoyPlot;
