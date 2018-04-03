/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import { ScaleLinear } from 'd3';
import merge from 'deepmerge';
import { get } from 'lodash';
import colorScheme from './colors';
import attrs from './d3/attrs';
import { IHistogramProps } from './Histogram';
import tips from './tip';

export const histogramD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let tipContent;
  const y = d3.scaleLinear();
  const x = d3.scaleBand();

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

  const defaultProps: IHistogramProps = {
    axis: {
      x: {
        height: 20,
        label: '',
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
        label: '',
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
    bar: {
      margin: 10,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
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
    height: 200,
    margin: {
      left: 5,
      top: 5,
    },
    stroke: {
      color: '#005870',
      dasharray: '',
      linecap: 'butt',
      width: 0,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number): string =>
      bins[i] + '<br />' + d,
    visible: {},
    width: 200,
  };

  const HistogramD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
    create(el: HTMLElement, props = {}) {
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      this.previousData = this.props.data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count: 0,
            label: this.props.data.bins[i],
          }));
      });
      this.makeGrid(props);
      this.makeScales();
      this.container = svg
        .append('g')
        .attr('class', 'histogram-container');

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
        .attr('viewBox', `0 0 ${width} ${height}`)
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
    valuesCount(counts: IHistogramDataSet[]): number {
      return counts.reduce((a: number, b: IHistogramDataSet): number => {
        return b.data.length > a ? b.data.length : a;
      }, 0);
    },

    /**
     * Update a linear scale with range and domain values taken either from the data set
     * or from props.
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IHistogramData): void {
      const yDomain: number[] = [];
      const { axis, domain, margin, height } = this.props;
      const allCounts = data.counts.reduce((a: number[], b: IHistogramDataSet): number[] => {
        return [...a, ...b.data];
      }, []);
      const extent = d3.extent(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
        ? domain.max
        : extent[1];
      yDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
        ? domain.min
        : 0;
      const yRange = [height - (margin.top * 2) - this.xAxisHeight(), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    yAxisWidth() {
      const { axis } = this.props;
      return axis.y.label === ''
        ? axis.y.width
        : axis.y.width + 30;
    },

    xAxisHeight() {
      const { axis } = this.props;
      return axis.x.label === ''
        ? axis.x.height
        : axis.x.height + 30;
    },

    makeScales() {
      const { axis, margin, height, width } = this.props;
      this.xAxis = svg.append('g').attr('class', 'x-axis');
      this.yAxis = svg.append('g').attr('class', 'y-axis');

      if (axis.x.label !== '') {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('transform',
          'translate(' + (width / 2) + ' ,' +
          ((height - this.xAxisHeight() - (margin.left * 2)) + 25) + ')')
          .style('text-anchor', 'middle')
          .text(axis.x.label);
      }

      if (axis.y.label !== '') {
        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - (height / 2 - (margin.top * 2)))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(axis.y.label);
      }
    },

    /**
     * Draw scales
     * @param {Object} data Chart data
     */
    _drawScales(data: IHistogramData) {
      const { domain, margin, width, height, axis } = this.props;
      const valuesCount = this.valuesCount(data.counts);
      const w = this.gridWidth();

      let xAxis;
      let yAxis;

      x.domain(data.bins)
        .rangeRound([0, w]);

      xAxis = d3.axisBottom(x);

      const tickSize = get(axis, 'x.tickSize', undefined);
      if (tickSize !== undefined) {
        xAxis.tickSize(tickSize);
      } else {
        if (w / valuesCount < 10) {
          // Show one in 10 x axis labels
          xAxis.tickValues(x.domain().filter((d, i) => !(i % 10)));
        }
      }

      this.xAxis
        .attr('transform', 'translate(' + this.yAxisWidth() + ',' +
        (height - this.xAxisHeight() - (margin.left * 2)) + ')')
        .call(xAxis);

      this.appendDomainRange(y, data);

      yAxis = d3.axisLeft(y).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }

      this.yAxis
        .attr('transform', 'translate(' + this.yAxisWidth() + ', 0)')
        .call(yAxis);

      const { transform, x: xx, y: yy, ...xLabelStyle } = axis.x.text.style;
      const { transform: yt, x: xxx, y: yyy, ...yLabelStyle } = axis.y.text.style;
      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style);
      attrs(svg.selectAll('.y-axis-label'), yLabelStyle);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style);
      attrs(svg.selectAll('.x-axis-label'), xLabelStyle);
    },

    /**
     * Draw the bars
     * @param {Object} info Bar data etc
     */
    _drawBars(info: IHistogramData) {
      // const valuesCount = this.valuesCount(info.counts);
      const { visible } = this.props;
      this.dataSets = info.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return {
          ...set,
          data: set.data
            .map((count, i) => visible[info.bins[i]] !== false ? count : 0),
        };
      });

      this.dataSets.forEach((set: IHistogramDataSet, setIndex: number) => {
        this.updateChart(info.bins, set, setIndex, info.counts.length);
      });
    },

    /**
     * Calculate the width of the area used to display the
     * chart bars. Removes chart margins and Y axis from
     * chart total width.
     * @return {number} width
     */
    gridWidth(): number {
      const { axis, width, margin } = this.props;
      return width - (margin.left * 2) - this.yAxisWidth();
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     * @return {number} width
     */
    gridHeight(): number {
      const { height, margin, axis } = this.props;
      return height - (margin.top * 2) - this.xAxisHeight();
    },

    /**
     * Returns the margin between similar bars in different data sets
     * @return {Number} Margin
     */
    groupedMargin(): number {
      const { data } = this.props;
      return ((data.counts.length - 1) * 3);
    },

    /**
     * Calculate the bar width
     * @return {number} bar width
     */
    barWidth() {
      const { axis, width, margin, data, bar, stroke } = this.props;
      const w = this.gridWidth();
      const valuesCount = this.valuesCount(data.counts);
      const setCount = data.counts.length;
      let barWidth = (w / valuesCount) - (bar.margin * 2) - this.groupedMargin();

      // Small bars - reduce margin and re-calcualate bar width
      if (barWidth < 5) {
        bar.margin = 1;
        barWidth = Math.max(1, (w - (valuesCount + 1) * bar.margin) /
          valuesCount);
      }

      // show data sets next to each other...
      return barWidth / setCount;
    },

    /**
     * Draw a single data set into the chart
     * @param {Array} bins Data set labels
     * @param {Object} set HistogramDataSet
     * @param {number} setIndex Data set index
     * @param {number} setCount Total number of data sets
     */
    updateChart(
      bins: string[], set: IHistogramDataSet,
      setIndex: number, setCount: number,
    ) {
      const { height, width, margin, bar, delay, duration,
        axis, stroke, tip, tipContentFn } = this.props;
      const barWidth = this.barWidth();
      const colors = d3.scaleOrdinal(set.colors || this.props.colorScheme);
      const borderColors = set.borderColors ? d3.scaleOrdinal(set.borderColors) : null;

      const selector = '.bar-' + setIndex;
      const multiLineOffset = (index) => setCount === 1
        ? 0
        : ((index + setIndex) * (barWidth + this.groupedMargin()));
      const gridHeight = this.gridHeight();

      console.log('set.data', set.data, setIndex);
      const u = this.container
        .selectAll('rect')
        .data(set.data);

      u.enter()
        .append('rect')
        .attr('height', 0)
        .attr('y', (d: number): number => gridHeight)

        .attr('class', 'bar ' + selector)
        .attr('x', (d, index, all) => {
          return this.yAxisWidth()
            + axis.y.style['stroke-width']
            + bar.margin
            + (barWidth + (bar.margin * 2)) * (index)
            + multiLineOffset(index);
        })
        .attr('width', (d) => barWidth)
        .attr('fill', (d, i) => colors(i))
        .on('mouseover', (d: number, i: number) => {
          tipContent.html(() => tipContentFn(bins, i, d));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .merge(u)
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('y', (d: number): number => y(d))
        // Hide bar's bottom border
        .attr('stroke-dasharray',
        (d: number): string => {
          const currentHeight = gridHeight - (y(d));
          return `${barWidth} 0 ${currentHeight} ${barWidth}`;
        })
        .attr('height', (d: number): number => gridHeight - (y(d)));

      u.exit().remove();

    },

    makeGrid(props: IHistogramProps) {
      const { grid } = props;
      this.gridX = svg.append('g')
        .attr('class', 'grid gridX');
      this.gridY = svg.append('g')
        .attr('class', 'grid gridY');
    },

    /**
     * Draw a grid onto the chart background
     * @param {Object} props Props
     */
    _drawGrid(props: IHistogramProps) {
      const { data, height, width, axis, grid, margin, bar } = props;
      const ticks = this.valuesCount(data.counts);
      const setCount = data.counts.length;
      const axisWidth = axis.y.style['stroke-width'];

      const offset = {
        x: this.yAxisWidth() + ((this.barWidth() * setCount) / 2) + bar.margin + this.groupedMargin() / 2,
        y: this.gridHeight(),
      };

      if (grid.x.visible) {
        // Add the X gridlines
        this.gridX.attr('transform', `translate(${offset.x}, ${offset.y})`);

        this.gridX.call(make_x_gridlines(get(grid, 'x.ticks', ticks))
          .tickSize(-height + this.xAxisHeight() + (margin.top * 2))
          .tickFormat(() => ''));

        attrs(this.gridX.selectAll('.tick line'), grid.x.style);
        attrs(this.gridX.selectAll('.domain'), { stroke: 'transparent' });
      }

      if (grid.y.visible) {
        // add the Y gridlines
        this.gridY.attr('transform', 'translate(' + (this.yAxisWidth() + axisWidth) + ', 0)')
          .call(make_y_gridlines(get(grid, 'y.ticks', ticks))
            .tickSize(-width + (margin.left * 2) + this.yAxisWidth())
            .tickFormat(() => ''),
        );

        attrs(this.gridY.selectAll('.tick line'), grid.y.style);

        // Hide the first horizontal grid line to show axis
        this.gridY.selectAll('.gridY .tick line').filter((d, i) => i === 0)
          .attr('display', 'none');
        attrs(this.gridY.selectAll('.domain'), { stroke: 'transparent' });
      }
    },

    /**
     * Update chart
     * @param {HTMLElement} el Chart element
     * @param {Object} props Chart props
     */
    update(el: HTMLElement, props: IHistogramProps) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      if (!this.props.data.bins) {
        return;
      }

      this._drawScales(this.props.data);
      this._drawGrid(this.props);
      this._drawBars(this.props.data);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HistogramD3;
});
