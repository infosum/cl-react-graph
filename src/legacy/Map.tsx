import { FeatureCollection } from 'geojson';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { DeepPartial } from '../utils/types';
import { mapD3 } from './MapD3';
import { IChartAdaptor } from './types';

interface IChartState {
  parentWidth?: number;
}

export interface IMapProps {
  className: string;
  data: any;
  geojson: FeatureCollection<any, any>;
  height: number;
  width: number | string;
  children?: React.ReactNode;
}

/**
 * Map component
 */
class Map extends Component<DeepPartial<IMapProps>, IChartState> {

  private chart: IChartAdaptor<IMapProps>;
  private ref: HTMLDivElement | null = null;

  /**
   * Constructor
   */
  constructor(props: DeepPartial<IMapProps>) {
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
    this.chart.update(this.getChartState());
  }

  /**
   * Get the chart state
   */
  public getChartState(): DeepPartial<IMapProps> {
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
    return (<div ref={(ref) => this.ref = ref} className="map-chart-container"></div>);
  }
}

export default Map;
