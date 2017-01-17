import * as d3 from 'd3';
import type {HistogramData, ChartAdaptor} from '../types';
import colorScheme from './colors';

export const histogramD3 = ((): ChartAdaptor => {
  let svg,
    tipContainer,
    tipContent,
    y = d3.scaleLinear(),
    x = d3.scaleBand();

  const defaultProps = {
      className: 'histogram-d3',
      width: 200,
      height: 200,
      delay: 0,
      duration: 400,
      barWidth: 50,
      barMargin: 5,
      yTicks: 10,
      tipContentFn: (info, i, d) => info.bins[i] + '<br />' + d + '%',
      tipContainer: 'body',
      tip: {
        fx: {
          in: (tipContainer: Node) => {
            tipContainer.style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY - 55) + 'px');
            tipContainer.transition()
              .duration(200)
              .style('opacity', 0.9);
          },
          move: (tipContainer: Node) => {
            tipContainer.style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY - 55) + 'px');
          },
          out: (tipContainer: Node) => {
            tipContainer.transition()
              .duration(500)
              .style('opacity', 0);
          }
        }
      },
      xAxisHeight: 15,
      yXaisWidth: 18,
      stroke: '#005870',
      colorScheme,
      margin: {
        left: 5,
        top: 5
      }
    },
    HistogramD3 = {
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
     */
      _makeSvg(el: Node) {
        if (svg) {
          svg.selectAll('svg > *').remove();
          svg.remove();
          let childNodes = el.getElementsByTagName('svg');
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
        this._makeTip();
      },

    /**
     * Create a bootstrap tip
     */
      _makeTip() {
        if (tipContainer) {
          // Chart could be rebuilt - remove old tip
          tipContainer.remove();
        }
        tipContainer = d3.select(this.props.tipContainer).append('div')
        .attr('class', 'tooltip top')
        .style('opacity', 0);

        tipContainer.append('div')
          .attr('class', 'tooltip-arrow');
        tipContent = tipContainer.append('div')
      .attr('class', 'tooltip-inner');
      },

    /**
     * Draw scales
     * @param {Object} data Chart data
     */
      _drawScales(data: HistogramData) {
        const {xAxisHeight, margin, width,
          height, yXaisWidth, yTicks} = this.props;

        svg.selectAll('.y-axis').remove();
        svg.selectAll('.x-axis').remove();

        let w = width - (margin.left * 2),
          yDomain,
          xAxis, yAxis, yRange;

        x.domain(data.bins)
        .rangeRound([0, w]);

        xAxis = d3.axisBottom(x);

        if (w / data.counts.length < 10) {
          // Show one in 10 x axis labels
          xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
        }
        svg.append('g').attr('class', 'x-axis')
          .attr('transform', 'translate(' + yXaisWidth + ',' +
            (height - xAxisHeight - (margin.left * 2)) + ')')
          .call(xAxis);

        yDomain = d3.extent(data.counts, d => d);
        yDomain[0] = 0;
        yRange = [height - (margin.top * 2) - xAxisHeight, 0];
        y.range(yRange)
        .domain(yDomain);

        yAxis = d3.axisLeft(y).ticks(yTicks);

        svg.append('g').attr('class', 'y-axis')
        .attr('transform', 'translate(' + yXaisWidth + ', 0)')
        .call(yAxis);
      },

      /**
       * Draw the bars
       * @param {Object} info Bar data etc
       */
      _drawBars: function(info: HistogramData) {
        let data = info.counts,
          {colorScheme, height, width, margin, barWidth, delay, duration,
          xAxisHeight, yXaisWidth, barMargin, tip, tipContentFn} = this.props,
          bar,
          w = width - (margin.left * 2),
          colors = d3.scaleOrdinal(colorScheme);

        // Ensure we don't have negative bar widths
        barWidth = Math.max(1, (w - (data.length + 1) * barMargin) /
          data.length);

        // Small bars - reduce margin and re-calcualate bar width
        if (barWidth < 5) {
          barMargin = 1;
          barWidth = Math.max(1, (w - (data.length + 1) * barMargin) /
            data.length);
        }

        svg.selectAll('.bar').remove();

        bar = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', (d, index, all) =>
            ((barMargin + barWidth) * index) + barMargin + yXaisWidth)
          .attr('width', d => barWidth)
          .attr('fill', (d, i) => colors(i))
          .on('mouseover', (d: number, i: number) => {
            tipContent.html(() => tipContentFn(info, i, d));
            tip.fx.in(tipContainer);
          })
          .on('mousemove', () => tip.fx.move(tipContainer))
          .on('mouseout', () => tip.fx.out(tipContainer))
          .attr('y', d => height - xAxisHeight - margin.top * 2)
          .attr('height', 0);

        bar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('y', (d: number) => y(d))
          .attr('height',
            d => (height - xAxisHeight - margin.top * 2) - (y(d)));

        bar.exit().remove();
      },

    /**
     * Update chart
     * @param {Node} el Chart element
     * @param {Object} props Chart props
    */
      update: function(el: Node, props: Object) {
        if (!props.data) return;
        this.props = Object.assign({}, defaultProps, props);
        this._makeSvg(el);
        if (!this.props.data.bins) {
          return;
        }
        this._drawScales(this.props.data);
        this._drawBars(this.props.data);
      },

    /**
     * Any necessary clean up
     * @param {Node} el To remove
    */
      destroy: function(el: Node) {
        svg.selectAll('svg > *').remove();
      }
    };
  return HistogramD3;
});
