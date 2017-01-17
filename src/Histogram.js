// @flow
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {histogramD3} from './HistogramD3';
import type {DOMEvent, ChartAdaptor, HistogramData} from '../types';

type Props = {
  data: HistogramData,
  width: string | number
};

type ChartState = {
  data: HistogramData,
  height: number,
  tipContainer: string,
  tipContentFn: ((info: HistogramData, i: number, d: number) => string),
  width: number | string,
  yTicks: number
};

class Histogram extends Component {

  histogram: ChartAdaptor

  props: Props

  state: {
    parentWidth: number
  }

  // static defaultProps = {
  //   width: '100%'
  // };

  constructor(props: Props) {
    super(props);
    this.histogram = histogramD3();
    this.state = {
      parentWidth: 300
    };
  }

  handleResize(e: DOMEvent) {
    let elem = this.getDOMNode(),
      width = elem.offsetWidth;

    this.setState({
      parentWidth: width
    });

    this.histogram.create(this.getDOMNode(), this.getChartState());
  }

  componentDidMount() {
    this.histogram.create(this.getDOMNode(), this.getChartState());
    if (this.props.width === '100%') {
      window.addEventListener('resize', e => this.handleResize());
      this.handleResize();
    }
  }

  componentDidUpdate() {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  getChartState(): ChartState {
    let {width, data} = this.props;
    if (width === '100%') {
      width = this.state.parentWidth || 300;
    }
    return {
      data,
      height: 200,
      tipContentFn: (info, i, d) =>
        info.bins[i] + '<br />' + d.toFixed(2) + '%',
      width,
      yTicks: 0
    };
  }

  componentWillReceiveProps(props: Props) {
    this.histogram.update(this.getDOMNode(), this.getChartState());
  }

  componentWillUnmount() {
    if (this.props.width === '100%') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.histogram.destroy(this.getDOMNode());
  }

  getDOMNode(): Node {
    return ReactDOM.findDOMNode(this);
  }

  render(): React$Element<any> {
    return (<div className="histogram-chart-container"></div>);
  }
}

export default Histogram;
