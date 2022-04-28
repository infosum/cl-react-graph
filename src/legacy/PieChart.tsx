import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  EColorManipulations,
  IBarChartDataSet,
} from '../Histogram';
import { DeepPartial } from '../utils/types';
import { pieChartD3 } from './PieChartD3';
import {
  IChartAdaptor,
  IChartState,
  IMargin,
  TipContentFn,
} from './types';

export interface IPieLabels {
  display: boolean;
  displayFn: (d: any, ix: number) => string | number;
};

export interface IPieDataItem {
  count: number;
  groupLabel: string;
  label: string;
};

export interface IPieChartProps {
  data: {
    bins: string[],
    counts: IBarChartDataSet[];
  };
  backgroundColor: string;
  className: string;
  colorScheme: string[];
  donutWidth: number;
  height: number;
  hover?: Partial<Record<EColorManipulations, number>>,
  labels: IPieLabels;
  margin: IMargin;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
};

/**
 * PieChart component
 */
class PieChart extends Component<DeepPartial<IPieChartProps>, IChartState> {

  private chart: IChartAdaptor<IPieChartProps>;
  private ref: HTMLDivElement | null = null;

  /**
   * Constructor
   */
  constructor(props: DeepPartial<IPieChartProps>) {
    super(props);
    this.chart = pieChartD3();

    this.state = {
      parentWidth: 300,
    };
  }

  /**
   * Handle the page resize
   */
  private handleResize() {
    const el = this.getDOMNode();
    if (el) {
      const width = (this.ref && this.ref.offsetWidth) ? this.ref.offsetWidth : 0;

      this.setState({
        parentWidth: width,
      }, () => this.chart.update(this.getChartState()));
    }
  }

  /**
   * Component mounted
   */
  public componentDidMount() {
    const el = this.getDOMNode();
    if (el) {
      this.chart.create(el, this.getChartState());
      if (this.props.width === '100%') {
        window.addEventListener('resize', (e) => this.handleResize());
        this.handleResize();
      }
    }
  }

  /**
   * Component updated
   */
  public componentDidUpdate() {
    const el = this.getDOMNode();
    if (el) {
      this.chart.update(this.getChartState());
    }
  }

  /**
   * Get the chart state
   */
  public getChartState(): DeepPartial<IPieChartProps> {
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
    const el = this.getDOMNode();
    if (el) {
      this.chart.destroy();
    }
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
    return (<div ref={(ref) => this.ref = ref} className="piechart-chart-container"></div>);
  }
};

export default PieChart;
