/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';

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
      className: 'line-chart-d3',
      fx: d3.easeCubic,
      height: 250,
      line: lineProps,
      margin: {
        left: 5,
        top: 5,
      },
      point: pointProps,
      tip: {
        fx: {
          in: (container) => {
            container.style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY - 55) + 'px');
            container.transition()
              .duration(200)
              .style('opacity', 0.9);
          },
          move: (container) => {
            container.style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY - 55) + 'px');
          },
          out: (container) => {
            container.transition()
              .duration(500)
              .style('opacity', 0);
          },
        },
      },
      tipContainer: null,
      tipContentFn: (info, i, d) => info[i].x.toFixed(3) + ',' + info[i].y,
      width: 200,
      xAxisHeight: 15,
      xTicks: 5,
      yTicks: 10,
      yXaisWidth: 18,
    };

  const datumProps = {
    line: lineProps,
    point: pointProps,
  };

  const LineChartD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
      create(el: Node, props: Object = {}) {
        this.props = Object.assign({}, defaultProps, props);
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
        const {margin, width, height, className} = this.props;

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
        const {yXaisWidth, tip, tipContentFn} = this.props;
        const {radius, stroke, fill} = datum.point;
        svg.selectAll(selector).remove();
        const point = svg.selectAll(selector)
        .data(datum.data)
        .enter()
        .append('circle')
          .attr('class', 'point')
          .attr('cx', (d) => x(d.x) + yXaisWidth)
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
        const {margin, width, height, yXaisWidth, xTicks, yTicks} = this.props;
        const xAxisHeight = 15;
        let yDomain;
        let xDomain;
        const ys = [];
        const xs = [];
        const yAxis = d3.axisLeft(y).ticks(yTicks);
        const xAxis = d3.axisBottom(x).ticks(xTicks);

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
        y.range([height - (margin.top * 2) - xAxisHeight, 0]);

        svg.append('g').attr('class', 'y-axis')
        .attr('transform', 'translate(' + yXaisWidth + ', 0)')
        .call(yAxis);

        svg.append('g').attr('class', 'x-axis')
        .attr('transform', 'translate(' + yXaisWidth + ',' +
          (height - xAxisHeight - (margin.left * 2)) + ')')
        .call(xAxis);
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
        const {fx, height, margin, yXaisWidth, xAxisHeight} = this.props;
        const {curveType, stroke, strokeDashOffset, strokeDashArray} = datum.line;
        const path = svg.selectAll(selector).data([datum.data]);
        let area;
        const curve = d3.line()
          .curve(curveType)
          .x((d: any) => x(d.x) + yXaisWidth)
          .y((d: any) => y(d.y));

        if (datum.line.fill === true) {
          area = d3.area()
          .curve(curveType)
          .x((d: any) => x(d.x) + yXaisWidth + 1)
          .y0((d) => height - (margin.top * 2) - xAxisHeight)
          .y1((d: any) => y(d.y));

          svg.append('path')
          .datum(datum.data)
          .attr('class', 'curve-area')
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
       * Update chart
       * @param {Element} el Chart element
       * @param {Object} props Chart props
       */
      update(el: Element, props) {
        this.props = Object.assign({}, this.props, props);
        if (!props.data) {
          return;
        }
        this._makeSvg(el);
        let data = props.data;
        data = data.map((datum: ILineChartDataSet) =>
          Object.assign({}, datumProps, datum));
        this._drawScales(data);
        this._drawLines(data);
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
