/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import merge from 'deepmerge';
import attrs from './d3/attrs';
import tips from './tip';

export const lineChartD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let tipContent;
  const y = d3.scaleLinear();
  const x = d3.scaleLinear();

  const
    lineProps = {
      curveType: d3.curveCatmullRom,
      fill: false,
      show: true,
      stroke: '#005870',
      strokeDashArray: '5 5',
      strokeDashOffset: 0,
    };

  const pointProps = {
    fill: 'rgba(255, 255, 255, 0)',
    radius: 4,
    stroke: '#005870',
  };

  const defaultProps = {
    axis: {
      x: {
        height: 20,
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
      },
      y: {
        style: {
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke': '#666',
          'stroke-opacity': 1,
          'stroke-width': 1,
        },
        text: {
          style: {
            fill: '#666',
          },
        },
        ticks: 10,
        width: 25,
      },
    },
    className: 'line-chart-d3',
    fx: d3.easeCubic,
    grid: {
      x: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
      y: {
        style: {
          'fill': 'none',
          'stroke': '#bbb',
          'stroke-opacity': 0.7,
          'stroke-width': 1,
        },
        ticks: 5,
        visible: true,
      },
    },
    height: 250,
    line: lineProps,
    margin: {
      left: 5,
      top: 5,
    },
    point: pointProps,
    tip: tips,
    tipContainer: null,
    tipContentFn: (info, i, d) => info[i].x.toFixed(3) + ',' + info[i].y,
    width: 200,
  };

  const datumProps = {
    line: lineProps,
    point: pointProps,
  };

  // Gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return d3.axisBottom(x)
      .ticks(ticks);
  }

  // Gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return d3.axisLeft(y)
      .ticks(ticks);
  }

  const LineChartD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
    create(el: Node, props: Object = {}) {
      this.props = merge(defaultProps, props);
      this.update(el, props);
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
      const { margin, width, height, className } = this.props;

      // Reference to svg element containing chart
      svg = d3.select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

      this._makeTip(el);
    },

    /**
     * Create a bootstrap tip
     * @param {Node} el Container
     */
    _makeTip(el: Node) {
      if (tipContainer) {
        // Chart could be rebuilt - remove old tip
        tipContainer.remove();
      }
      tipContainer = d3.select(this.props.tipContainer || el).append('div')
        .attr('class', 'tooltip top')
        .style('opacity', 0);

      tipContainer.append('div')
        .attr('class', 'tooltip-arrow');
      tipContent = tipContainer.append('div')
        .attr('class', 'tooltip-inner');
    },

    /**
     * Iterate over the dataset drawing points for sets marked as
     * requiring points.
     * @param {Array} data LineChartDataSet
     */
    _drawDataPointSet(data: ILineChartDataSet[]) {
      data.forEach((datum: ILineChartDataSet, i: number) => {
        if (datum.point.show !== false) {
          this._drawDataPoints(datum, '.points-' + i);
        }
      });
    },

    /**
     * Draw data points
     * @param {Object} datum LineChartDataSet
     * @param {String} selector Class name
     */
    _drawDataPoints(datum: ILineChartDataSet, selector: string) {
      const { axis, tip, tipContentFn } = this.props;
      const { radius, stroke, fill } = datum.point;
      svg.selectAll(selector).remove();
      const point = svg.selectAll(selector)
        .data(datum.data)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', (d) => x(d.x) + axis.y.width)
        .attr('cy', (d) => y(d.y))
        .attr('r', (d, i) => 0)
        .attr('fill', fill)
        .attr('stroke', stroke)
        .on('mouseover', (d: number, i: number) => {
          tipContent.html(() => tipContentFn(datum.data, i, d));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer));

      point
        .transition()
        .duration(400)
        .attr('r', () => radius)
        .delay(50);

      point.exit().remove();
    },

    /**
     * Draw the chart scales
     * @param {Array} data LineChartDataSet
     */
    _drawScales(data: ILineChartDataSet[]) {
      svg.selectAll('.y-axis').remove();
      svg.selectAll('.x-axis').remove();
      const { axis, margin, width, height } = this.props;
      let yDomain;
      let xDomain;
      const ys = [];
      const xs = [];
      const yAxis = d3.axisLeft(y).ticks(axis.y.ticks);
      const xAxis = d3.axisBottom(x).ticks(axis.x.ticks);

      data.forEach((datum: ILineChartDataSet) => {
        datum.data.forEach((d: IChartPoint) => {
          ys.push(d.y);
          xs.push(d.x);
        });
      });
      yDomain = d3.extent(ys);
      xDomain = d3.extent(xs);
      x.domain(xDomain);
      x.range([0, width - (margin.left * 2)]);
      y.domain(yDomain);
      y.range([height - (margin.top * 2) - axis.x.height, 0]);

      svg.append('g').attr('class', 'y-axis')
        .attr('transform', 'translate(' + axis.y.width + ', 0)')
        .call(yAxis);

      svg.append('g').attr('class', 'x-axis')
        .attr('transform', 'translate(' + axis.y.width + ',' +
        (height - axis.x.height - (margin.left * 2)) + ')')
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style);
    },

    /**
     * Iterate over data and draw lines
     * @param {Array} data Chart data objects
     */
    _drawLines(data: ILineChartDataSet[]) {
      data.forEach((datum: ILineChartDataSet, i: number) => {
        if (datum.line.show !== false) {
          this._drawLine(datum, '.line-' + i);
        }
      });
    },

    /**
     * Draw the chart's line
     * @param {Object} datum LineChartDataSet
     * @param {String} selector Line selector
     */
    _drawLine(datum: ILineChartDataSet, selector: string) {
      // @Todo fx transition not working.
      svg.selectAll(selector).remove();
      const { axis, fx, height, margin } = this.props;
      const { curveType, stroke, strokeDashOffset, strokeDashArray } = datum.line;
      const path = svg.selectAll(selector).data([datum.data]);
      let area;
      const curve = d3.line()
        .curve(curveType)
        .x((d: any) => x(d.x) + axis.y.width)
        .y((d: any) => y(d.y));

      if (datum.line.fill.show === true) {
        area = d3.area()
          .curve(curveType)
          .x((d: any) => x(d.x) + axis.y.width + 1)
          .y0((d) => height - (margin.top * 2) - axis.x.height)
          .y1((d: any) => y(d.y));

        svg.append('path')
          .datum(datum.data)
          .attr('class', 'curve-area')
          .attr('fill', datum.line.fill.fill)
          .attr('d', area);
      }

      path
        .attr('d', (d) => curve(d))
        .attr('class', 'path')
        .attr('fill', 'none')
        .attr('stroke-dashoffset', strokeDashOffset)
        .attr('stroke-dasharray', strokeDashArray)
        .attr('stroke', stroke);

      path
        .transition()
        .duration(1000)
        .ease(fx);

      path.enter().append('path')
        .attr('d', curve)
        .attr('class', 'path')
        .attr('fill', 'none')
        .attr('stroke', stroke);

      path.exit().remove();
    },

    /**
     * Get a max count of values in each data set
     * @param {Object} counts Histogram data set values
     * @return {Number} count
     */
    valuesCount(data: IHistogramDataSet[]): number {
      return data.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     * @return {number} width
     */
    gridHeight(): number {
      const { height, margin, axis } = this.props;
      return height - (margin.top * 2) - axis.x.height;
    },

    /**
     * Draw a grid onto the chart background
     * @param {Object} props Props
     */
    _drawGrid(props: ILineChartProps) {
      const { data, height, width, axis, grid, margin } = props;
      const ticks = this.valuesCount(data);
      const setCount = data.length;
      const axisWidth = axis.y.style['stroke-width'];
      const offset = {
        x: axis.y.width,
        y: this.gridHeight(),
      };
      let g;
      let gy;

      if (grid.x.visible) {
        // Add the X gridlines
        g = svg.append('g')
          .attr('class', 'grid gridX')
          .attr('transform', `translate(${offset.x}, ${offset.y})`);

        g.call(make_x_gridlines(grid.x.ticks || ticks)
          .tickSize(-height + axis.x.height + (margin.top * 2))
          .tickFormat(() => ''));

        attrs(g.selectAll('.tick line'), grid.x.style);
        attrs(g.selectAll('.domain'), { stroke: 'transparent' });
      }

      if (grid.y.visible) {
        // add the Y gridlines
        gy = svg.append('g')
          .attr('class', 'grid gridY')
          .attr('transform', 'translate(' + (axis.y.width + axisWidth) + ', 0)')
          .call(make_y_gridlines(grid.y.ticks || ticks)
            .tickSize(-width + (margin.left * 2) + axis.y.width)
            .tickFormat(() => ''),
        );
        attrs(gy.selectAll('.tick line'), grid.y.style);

        // Hide the first horizontal grid line to show axis
        gy.selectAll('.gridY .tick line').filter((d, i) => i === 0)
          .attr('display', 'none');

        attrs(gy.selectAll('.domain'), { stroke: 'transparent' });
      }
    },

    /**
     * Update chart
     * @param {Element} el Chart element
     * @param {Object} props Chart props
     */
    update(el: Element, props) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      let data = props.data;
      data = data.map((datum: ILineChartDataSet) =>
        Object.assign({}, datumProps, datum));
      this._drawScales(data);
      this._drawLines(data);
      this._drawGrid(this.props);
      this._drawDataPointSet(data);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return LineChartD3;
});
