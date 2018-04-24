/// <reference path="./interfaces.d.ts" />
import { FeatureCollection } from 'geojson';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { mapD3 } from './MapD3';

export interface IMapProps {
  className?: string;
  data: any;
  geojson: FeatureCollection<any, any>;
  height: number;
  width: number | string;
}

/**
 * Map component
 */
class Map extends Component<IMapProps, IChartState> {

  private chart: IChartAdaptor;
  private ref;

  public static defaultProps: Partial<IMapProps> = {
    geojson: {
      features: [],
      type: 'FeatureCollection',
    },
    height: 200,
    width: '100%',
  };

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props: IMapProps) {
    super(props);
    this.chart = mapD3();
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
  public getChartState(): IMapProps {
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
    return (<div ref={(ref) => this.ref = ref} className="map-chart-container"></div>);
  }
}

export default Map;
