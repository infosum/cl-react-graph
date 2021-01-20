import {
  geoMercator,
  geoPath,
} from 'd3-geo';
import {
  select,
  Selection,
} from 'd3-selection';
import { FeatureCollection } from 'geojson';
import merge from 'lodash/merge';

import { DeepPartial } from '../utils/types';
import { IMapProps } from './Map';
import { IChartAdaptor } from './types';

export const mapD3 = ((): IChartAdaptor<IMapProps> => {

  const props: IMapProps = {
    className: 'map-d3',
    data: [],
    geojson: {
      features: [],
      type: 'FeatureCollection',
    },
    height: 200,
    width: 200,
  };

  let svg: Selection<any, any, any, any>;
  let container: Selection<SVGElement, any, any, any>;

  const MapD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<IMapProps> = {}) {
      this.mergeProps(newProps);
      this._makeSvg(el);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(props);
    },

    mergeProps(newProps: DeepPartial<IMapProps>) {
      merge(props, newProps);
      props.data = newProps.data;
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     */
    _makeSvg(el: Element) {
      if (svg) {
        svg.selectAll('svg > *').remove();
        svg.remove();
        const childNodes = el.getElementsByTagName('svg');
        if (childNodes.length > 0) {
          el.removeChild(childNodes[0]);
        }
      }
      const { width, height, className } = props;

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

      const { width, height } = props;
      const zoom = 3;
      const projection = geoMercator()
        .scale((Number(width) / 2 / Math.PI) * zoom)
        .translate([(Number(width) / 2), (height / 2)]);

      const geoGenerator = geoPath()
        .projection(projection);

      // const g = this.container
      // .selectAll('g')
      // .data(groupData);

      // Join the FeatureCollection's features array to path elements
      const u = container
        .selectAll('path')
        .data(geojson.features);

      // Create path elements and update the d attribute using the geo generator
      u.enter()
        .append('path')
        .attr('d', geoGenerator);
    },

    /**
     * Update chart
     */
    update(newProps: DeepPartial<IMapProps>) {
      if (!props.data) {
        return;
      }
      this.mergeProps(newProps);
      const { data, geojson } = props;
      this.updateChart(data, geojson);
    },

    /**
     * Any necessary clean up
     */
    destroy() {
      svg.selectAll('svg > *').remove();
    },
  };
  return MapD3;
});
