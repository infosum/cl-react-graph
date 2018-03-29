/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { pieChartD3 } from './PieChartD3';

interface ILegend {
  display: boolean;
  fontSize?: string;
  rectSize?: number;
  spacing?: number;
}

interface ILabels {
  display: boolean;
  displayFn?: (d: any, ix: number) => string | number;
}

export interface IPieChartProps {
  data: {
    bins: string[],
    counts: IHistogramDataSet[];
  };
  backgroundColor?: string;
  className?: string;
  colorScheme?: string[];
  donutWidth?: number;
  height: number;
  labels?: ILabels;
  legend?: ILegend;
  margin?: IMargin;
  tip?: any;
  tipContainer?: string;
  tipContentFn?: TipContentFn;
  width: number | string;
}

/**
 * PieChart component
 */
class PieChart extends Component<IPieChartProps, IChartState> {

  private chart: IChartAdaptor;
  private ref;

  public static defaultProps = {
    backgroundColor: '#ddd',
    donutWidth: 0,
    height: 200,
    legend: {
      display: false,
    },
    margin: {
      left: 5,
      top: 5,
    },
  };

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props: IPieChartProps) {
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
    const elem = this.getDOMNode();
    const width = this.ref.offsetWidth ? this.ref.offsetWidth : 0;

    this.setState({
      parentWidth: width,
    });

    this.chart.create(elem, this.getChartState());
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
  public getChartState(): IPieChartProps {
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
   * Props recieved, update the chart
   * @param {Object} props Props
   */
  public componentWillReceiveProps(props: IHistogramProps) {
    this.chart.update(this.getDOMNode(), this.getChartState());
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
    return (<div ref={(ref) => this.ref = ref} className="piechart-chart-container"></div>);
  }
}

export default PieChart;
