import {
  CurveFactory,
  CurveFactoryLineOnly,
} from 'd3-shape';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  IAxes,
  IChartAdaptor,
  IGrid,
  IMargin,
  ISVGLineStyle,
  TipContentFn,
} from './Histogram';
import { lineChartD3 } from './lineChartD3';

interface IState {
  parentWidth?: number;
}

export type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number, Y extends IChartPointValue = number> {
  x: X;
  y: Y;
}
export interface ILineProps {
  show: boolean;
  fill: {
    show: boolean;
    fill: string;
  };
  curveType: CurveFactory | CurveFactoryLineOnly;
  stroke: string;
  strokeDashOffset: number;
  strokeDashArray: string;
}

export interface ILineChartDataSet<T> {
  label: string;
  point: {
    radius: number;
    stroke: string;
    fill: string;
    show: boolean;
  };
  line: ILineProps;
  data: T[];
}

export interface ISVGPoint extends ISVGLineStyle {
  radius?: 4;
  show: boolean;
}

export interface ILineChartProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  axis: IAxes;
  className: string;
  data: Array<ILineChartDataSet<T>>;
  grid: IGrid;
  height: number | string;
  margin: IMargin;
  tip: any;
  tipContainer?: string;
  tipContentFn: TipContentFn<{ x: string | number, y: string | number }>;
  visible: { [key: string]: boolean };
  width: number | string;
}

class LineChart extends React.Component<ILineChartProps, IState> {

  private chart: IChartAdaptor<ILineChartProps>;
  private ref: HTMLDivElement | null = null;

  constructor(props: ILineChartProps) {
    super(props);
    this.chart = lineChartD3();
    this.state = {
      parentWidth: 300,
    };
  }

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

  public componentDidUpdate() {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.update(el, this.getChartState());
  }

  /**
   * Get the chart state. If a histogram has been assigned
   * to the props, then render this data. Otherwise generate
   * a random normal dist
   */
  public getChartState(): ILineChartProps {
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

  public componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.destroy(el);
  }

  private getDOMNode(): Element | undefined {
    const node = ReactDOM.findDOMNode(this.ref);
    if (node instanceof HTMLElement) {
      return node;
    }
    return undefined;
  }

  public render(): JSX.Element {
    return <div ref={(ref) => this.ref = ref} className="chart-container"></div>;
  }
}

export default LineChart;
