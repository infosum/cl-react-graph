import {
  geoMercator,
  geoPath,
} from 'd3-geo';
import { select } from 'd3-selection';
import * as merge from 'deepmerge';
import { FeatureCollection } from 'geojson';

import { IChartAdaptor } from './Histogram';
import { IMapProps } from './Map';

export const mapD3 = ((): IChartAdaptor => {
  let svg;

  const defaultProps: IMapProps = {
    className: 'map-d3',
    data: [],
    geojson: {
      features: [],
      type: 'FeatureCollection',
    },
    height: 200,
    width: 200,
  };

  const MapD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
    create(el: HTMLElement, props: Partial<IMapProps> = {}) {
      this.mergeProps(props);
      this._makeSvg(el);
      this.container = svg
        .append('g')
        .attr('class', 'histogram-container');

      this.update(el, props);
    },

    mergeProps(newProps: Partial<IMapProps>) {
      this.props = merge<IMapProps>(defaultProps, newProps);
      this.props.data = newProps.data;
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     * @param {Dom} el Dom container node
     */
    _makeSvg(el) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { width, height, className } = this.props;

      // Reference to svg element containing chart
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g');
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      data: any,
      geojson: FeatureCollection<any, any>,
    ) {

      const { width, height } = this.props;
      const zoom = 3;
      const projection = geoMercator()
        .scale((width / 2 / Math.PI) * zoom)
        .translate([(width / 2), (height / 2)]);

      const geoGenerator = geoPath()
        .projection(projection);

      // const g = this.container
      // .selectAll('g')
      // .data(groupData);

      // Join the FeatureCollection's features array to path elements
      const u = this.container
        .selectAll('path')
        .data(geojson.features);

      // Create path elements and update the d attribute using the geo generator
      u.enter()
        .append('path')
        .attr('d', geoGenerator);
    },

    /**
     * Update chart
     * @param {HTMLElement} el Chart element
     * @param {Object} props Chart props
     */
    update(el: HTMLElement, props: IMapProps) {
      if (!props.data) {
        return;
      }
      this.mergeProps(props);
      const { data, geojson } = this.props;
      this.updateChart(data, geojson);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };
  return MapD3;
});
