import * as d3 from 'd3';
import type {HistogramData, ChartAdaptor, HistogramDataSet} from '../types';
import colorScheme from './colors';
import attrs from './d3/attrs';

export const histogramD3 = ((): ChartAdaptor => {
  let svg,
    tipContainer,
    tipContent,
    y = d3.scaleLinear(),
    x = d3.scaleBand();

// gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return d3.axisBottom(x)
        .ticks(ticks);
  }

  // gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return d3.axisLeft(y)
        .ticks(ticks);
  }

  const defaultProps = {
      barWidth: 50,
      barMargin: 5,
      className: 'histogram-d3',
      colorScheme,
      width: 200,
      height: 200,
      delay: 0,
      duration: 400,
      grid: {
        x: {
          style: {
            'stroke': '#bbb',
            'fill': 'none',
            'stroke-width': '1'
          },
          visible: true,
          ticks: 10
        },
        y: {
          style: {
            'stroke': '#bbb',
            'fill': 'none',
            'stroke-width': '1'
          },
          visible: true,
          ticks: 10
        }
      },
      margin: {
        left: 5,
        top: 5
      },
      stroke: {
        color: '#005870',
        dasharray: '',
        width: 1,
        linecap: 'butt'
      },
      tipContentFn: (bins: string[], i: number, d: number): string =>
        bins[i] + '<br />' + d + '%',
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
      yTicks: 10,
      yXaisWidth: 18
    },

    HistogramD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
      create: function(el: Node, props: Object = {}) {
        this.props = {...defaultProps, ...props};
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
       * Get a max count of values in each data set
       * @param {Object} counts Histogram data set values
       * @return {Number} count
       */
      valuesCount(counts: HistogramDataSet): number {
        return counts.reduce((a: number, b: HistogramDataSet): number => {
          return b.data.length > a ? b.data.length : a;
        }, 0);
      },

    /**
     * Draw scales
     * @param {Object} data Chart data
     */
      _drawScales(data: HistogramData) {
        const {xAxisHeight, margin, width,
          height, yXaisWidth, yTicks} = this.props,
          valuesCount = this.valuesCount(data.counts);

        svg.selectAll('.y-axis').remove();
        svg.selectAll('.x-axis').remove();

        let w = width - (margin.left * 2),
          yDomain,
          xAxis, yAxis, yRange,
          allCounts = data.counts.reduce((a: number[], b: HistogramDataSet): number[] => {
            return [...a, ...b.data];
          }, []);

        x.domain(data.bins)
        .rangeRound([0, w]);

        xAxis = d3.axisBottom(x);

        if (w / valuesCount < 10) {
          // Show one in 10 x axis labels
          xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
        }
        svg.append('g').attr('class', 'x-axis')
          .attr('transform', 'translate(' + yXaisWidth + ',' +
            (height - xAxisHeight - (margin.left * 2)) + ')')
          .call(xAxis);

        yDomain = d3.extent(allCounts, d => d);
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
        const valuesCount = this.valuesCount(info.counts);
        info.counts.forEach((set: HistogramDataSet, setIndex: number) => {
          this.drawDataSet(info.bins, set, setIndex, info.counts.length, valuesCount);
        });
      },

      /**
       * Draw a single data set into the chart
       * @param {Array} bins Data set labels
       * @param {Object} set HistogramDataSet
       * @param {number} setIndex Data set index
       * @param {number} setCount Total number of data sets
       * @param {number} valuesCount Max total number of
       * values across all data sets
       */
      drawDataSet(bins: string[], set: HistogramDataSet,
        setIndex: number, setCount: number, valuesCount: number) {
        let {colorScheme, height, width, margin, barWidth, delay, duration,
          xAxisHeight, yXaisWidth, barMargin, stroke,
          tip, tipContentFn} = this.props,
          bar,
          w = width - (margin.left * 2),

          colors = d3.scaleOrdinal(colorScheme);

        // Ensure we don't have negative bar widths
        barWidth = Math.max(1, (w - (valuesCount + 1) * barMargin) /
          valuesCount);

        // Small bars - reduce margin and re-calcualate bar width
        if (barWidth < 5) {
          barMargin = 1;
          barWidth = Math.max(1, (w - (valuesCount + 1) * barMargin) /
            valuesCount);
        }

        // show data sets next to each other...
        barWidth = barWidth / setCount;
        const selector = '.bar-' + setIndex,
          multiLineOffset = (index) => setCount === 1 ? 0 : ((index + setIndex) * barWidth);

        svg.selectAll(selector).remove();
        bar = svg.selectAll(selector)
          .data(set.data)
          .enter()
          .append('rect')
            .attr('class', 'bar ' + selector)
            .attr('x', (d, index, all) =>
              ((barMargin + barWidth) * index) + barMargin + yXaisWidth
              + multiLineOffset(index)
              )
            .attr('width', d => barWidth - barMargin / 2)
            .attr('fill', (d, i) => colors(i))
            .on('mouseover', (d: number, i: number) => {
              tipContent.html(() => tipContentFn(bins, i, d));
              tip.fx.in(tipContainer);
            })
            .on('mousemove', () => tip.fx.move(tipContainer))
            .on('mouseout', () => tip.fx.out(tipContainer))
            .attr('y', (d: number): number => {
              return height - xAxisHeight - margin.top * 2;
            })
            .attr('height', 0);


        bar.attr('stroke', (d, i) => typeof stroke.color === 'function'
          ? stroke.color(d, i, colors)
          : stroke.color)
          .attr('stroke-width', stroke.width)
          .attr('stroke-linecap', stroke.linecap);

        if (stroke.dasharray !== '') {
          bar.attr('stroke-dasharray', stroke.dasharray);
        }

        bar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('y', (d: number): number => {
            return y(d);
          })
          .attr('height',
            (d: number): number => {
              return (height - xAxisHeight - margin.top * 2) - (y(d));
            });

        bar.exit().remove();
      },

      /**
       * Draw a grid onto the chart backgroud
       * @param {Object} data HistogramData
       */
      _drawGrid(data: HistogramData) {
        const {height, width, yXaisWidth, grid} = this.props,
          ticks = this.valuesCount(data.counts);
        let g, gy;

        if (grid.x.visible) {
           // Add the X gridlines
          g = svg.append('g')
            .attr('class', 'grid gridX')
            .attr('transform', 'translate(' + yXaisWidth + ',' + height + ')');
console.log('grid x ticks', grid.x.ticks);
          g.call(make_x_gridlines(grid.x.ticks || ticks)
                .tickSize(-height)
                .tickFormat(''));
          attrs(g.selectAll('.tick line'), grid.x.style);
        }

        if (grid.y.visible) {
        // add the Y gridlines
          gy = svg.append('g')
          .attr('class', 'grid gridY')
          .attr('transform', 'translate(' + yXaisWidth + ', 0)')
          .call(make_y_gridlines(grid.y.ticks || ticks)
              .tickSize(-width)
              .tickFormat('')
          );
          attrs(gy.selectAll('.tick line'), grid.y.style);
        }
      },

    /**
     * Update chart
     * @param {Node} el Chart element
     * @param {Object} props Chart props
    */
      update: function(el: Node, props: Object) {
        if (!props.data) return;
        this.props = {...defaultProps, ...props};
        this._makeSvg(el);
        if (!this.props.data.bins) {
          return;
        }

        this._drawScales(this.props.data);
        this._drawGrid(this.props.data);
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
