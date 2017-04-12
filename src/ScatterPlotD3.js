// @flow
import * as d3 from 'd3';
import colorScheme from './colors';
import {ChartPoint, ScatterPlotProps} from '../types';


export const scatterPlotD3 = (() => {
  let svg,
    yScale = d3.scaleLinear(),
    xScale = d3.scaleLinear(),
    domainByTrait = {},
    xAxis,
    color,
    yAxis;

  const defaultProps = {
      choices: [],
      className: 'scatter-plot-d3',
      chartSize: 400,
      delay: 0,
      duration: 400,
      legendWidth: 100,
      colorScheme,
      padding: 20,
      radius: 4
    },

    scatterPlotD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
      create: function(el: Node, props: Object = {}) {
        this.props = Object.assign({}, defaultProps, props);
        this.update(el, props);
      },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
     * @param {Dom} el Dom container node
     * @param {Array} data Chart data
     */
      _makeSvg(el: Node, data) {
        if (svg) {
          svg.selectAll('svg > *').remove();
          svg.remove();
          let childNodes = el.getElementsByTagName('svg');
          if (childNodes.length > 0) {
            el.removeChild(childNodes[0]);
          }
        }
        const {chartSize, className,
          colorScheme, legendWidth, padding} = this.props;

        // Reference to svg element containing chart
        svg = d3.select(el).append('svg')
        .attr('class', className)
        .attr('width', chartSize + padding + legendWidth)
        .attr('height', chartSize + padding)
        .append('g')
        .attr('transform', 'translate(' + padding + ',' + padding / 2 + ')');

        color = d3.scaleOrdinal(colorScheme);
      },

    /**
     * Draw the chart scales
     * @param {Object} data Chart data
     */
      _drawScales: function(data) {
        const {chartSize, padding} = this.props,
          size = chartSize / data.length;
        xScale.range([padding / 2, size - padding / 2]);
        yScale.range([size - padding / 2, padding / 2]);

        svg.selectAll('.x.axis')
        .data(data)
        .enter().append('g')
        .attr('class', 'x axis')
        .attr('transform', (d, i) =>
          'translate(' + (data.length - i - 1) * size + ',0)')
        .each(function(d) {
          xScale.domain(domainByTrait[d]);
          d3.select(this).call(xAxis);
        });

        svg.selectAll('.y.axis')
        .data(data)
      .enter().append('g')
        .attr('class', 'y axis')
        .attr('transform', (d, i) => 'translate(0,' + i * size + ')')
        .each(function(d) {
          yScale.domain(domainByTrait[d]);
          d3.select(this).call(yAxis);
        });
      },

      /**
       * Make a legend showing spit choice options
       */
      _drawLegend() {
        const {choices, padding, chartSize, split} = this.props,
          legend = svg.append('g')
          .attr('transform', 'translate(' + (chartSize + padding / 2) +
            ', ' + (padding + 50) + ')');

        legend.append('g').append('text')
          .attr('x', 0)
          .attr('y', 0)
          .attr('dy', '.71em')
          .text(d => split);
        legend.selectAll('.legendItem')
          .data(choices)
          .enter().append('g')
          .each(function(c, i: number) {
            var cell = d3.select(this);
            cell.append('rect')
            .attr('class', 'legendItem')
            .attr('x', 0)
            .attr('y', 20 + (i * 15))
            .attr('fill', color(i))
            .attr('height', 10)
            .attr('width', 10);

            cell.append('text')
            .attr('x', 15)
            .attr('y', 20 + (i * 15))
            .attr('dy', '.71em')
            .text(d => c);
          });

        legend.exit().remove();
      },

      /**
       * Draw scatter points
       * @param {Object} traits Chart data
       * @param {Number} size Chart size
       */
      _drawPoints(traits, size: number) {
        const {data, delay, duration,
          choices, split, padding, radius} = this.props,
          n = traits.length;
        let cell = svg.selectAll('.cell')
        .data(cross(traits, traits))
        .enter().append('g')
        .attr('class', 'cell')
        .attr('transform', d => 'translate(' + (n - d.i - 1) * size +
          ',' + d.j * size + ')')
        .each(plot);

        // Titles for the diagonal.
        cell.filter(d => d.i === d.j).append('text')
        .attr('x', padding)
        .attr('y', padding)
        .attr('dy', '.71em')
        .text(d => d.x);

        /**
         * Plot a point
         * @param {Object} p Point
         */
        function plot(p: ChartPoint) {
          let cell, circle;
          cell = d3.select(this);
          xScale.domain(domainByTrait[p.x]);
          yScale.domain(domainByTrait[p.y]);

          cell.append('rect')
          .attr('class', 'frame')
          .attr('x', padding / 2)
          .attr('y', padding / 2)
          .attr('width', size - padding)
          .attr('height', size - padding);

          circle = cell.selectAll('circle')
          .data(data.values)
          .enter().append('circle')
          .attr('r', d => radius)
          .attr('cx', d => xScale(d[p.x]))
          .attr('cy', d => yScale(d[p.y]))
           .style('fill', (d) => {
             if (d[split]) {
               let i = choices.findIndex(c => c === d[split]);
               return color(i);
             }
             return '#eeaabb';
           });

          circle
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('r', d => radius);
        }

        /**
         * Create cross array
         * @param {Object} a point
         * @param {Object} b point
         * @return {Array} data
         */
        function cross(a, b) {
          let c = [],
            n = a.length,
            m = b.length,
            i, j;
          for (i = -1; ++i < n;) {
            for (j = -1; ++j < m;) {
              c.push({x: a[i], i: i, y: b[j], j: j});
            }
          }
          return c;
        }
      },

      /**
       * Update chart
       * @param {Node} el Chart element
       * @param {Object} props Chart props
      */
      update: function(el: Node, props: ScatterPlotProps) {
        this.props = {...this.props, ...props};
        if (!props.data) return;
        const {chartSize, data, distModels} = this.props;
        this._makeSvg(el, props.data);
        this._drawLegend();
        let traits = data.keys.filter(k => distModels.indexOf(k) !== -1),
          size = chartSize / traits.length,
          n = traits.length;

        traits.forEach(trait => {
          domainByTrait[trait] = d3.extent(data.values, d => d[trait]);
        });
        xAxis = d3.axisBottom(xScale)
          .ticks(6)
          .tickSize(size * n);
        yAxis = d3.axisLeft(yScale)
          .ticks(6)
          .tickSize(-size * n);

        this._drawScales(traits);
        this._drawPoints(traits, size);
      },

    /**
     * Any necessary clean up
     * @param {Node} el To remove
    */
      destroy: function(el: Node) {
        svg.selectAll('svg > *').remove();
      }
    };
  return scatterPlotD3;
});
