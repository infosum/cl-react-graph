import React from 'react';
import ReactDOM from 'react-dom';

import { IChartAdaptor } from './Histogram';
import { scatterPlotD3 } from './ScatterPlotD3';

interface IChartState {
  choices: string[];
  data: {
    keys: any[],
    values: any[],
  };
  height: number;
  distModels: string[];
  split: string;
  parentWidth: number;
  width: number | string;
}

export interface IScatterPlotProps {
  choices: string[];
  className: string;
  data: {
    keys: string[],
    values: any[];
  };
  delay: number;
  distModels: string[];
  duration: number;
  height: number;
  legendWidth: number;
  colorScheme: string[];
  padding: number;
  radius: number;
  split: string;
  width: string | number;
}
class ScatterPlot extends React.Component<IScatterPlotProps, IChartState> {

  private chart: IChartAdaptor<IScatterPlotProps>;
  private ref: HTMLDivElement | null = null;

  public static defaultProps = {
    height: 400,
    width: '100%',
  };

  constructor(props: IScatterPlotProps) {
    super(props);
    this.chart = scatterPlotD3();
    this.state = {
      choices: [],
      data: {
        keys: [],
        values: [],
      },
      distModels: [],
      height: this.props.height,
      parentWidth: 400,
      split: '',
      width: this.props.width,
    };
  }

  private handleResize() {
    const { legendWidth, padding } = this.props;
    if (!this.ref) {
      return;
    }
    const chartWidth = Math.max(200, this.ref.offsetWidth - padding - legendWidth);
    const chartHeight = Math.max(200, window.innerHeight - padding -
      this.ref.getBoundingClientRect().top);
    const width = Math.min(chartHeight, chartWidth);
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
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
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
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

  private getChartState(): IChartState {
    let { width } = this.props;
    const { data, choices, split, distModels, height } = this.props;
    if (typeof width === 'string' && width === '100%') {
      width = this.state.parentWidth || 300;
    }

    return {
      choices,
      data,
      distModels,
      height,
      parentWidth: this.state.parentWidth,
      split,
      width,
    };
  }

  public componentWillReceiveProps(props: IScatterPlotProps) {
    const el = this.getDOMNode();
    if (!el) {
      return;
    }
    this.chart.update(el, this.getChartState());
  }

  public componentWillUnmount() {
    const { width } = this.props;
    if (typeof width === 'string' && width === '100%') {
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

  public render() {
    return <div ref={(ref) => this.ref = ref} className="scatterplot-chart-container"></div>;
  }
}

export default ScatterPlot;
