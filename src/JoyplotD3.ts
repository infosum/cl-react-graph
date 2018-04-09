/// <reference path="./interfaces.d.ts" />
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear, ScaleLinear, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import merge from 'deepmerge';
import { get } from 'lodash';
import colorScheme from './colors';
import attrs from './d3/attrs';
import { IJoyPlotProps } from './JoyPlot';
import tips from './tip';

interface IGroupDataItem {
  label: string;
  value: number;
}

type IGroupData = IGroupDataItem[][];

export const joyPlotD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let tipContent;
  let props: IJoyPlotProps;
  let dataSets: IGroupData[];
  const yOuterScaleBand = scaleBand();
  const y = scaleLinear();
  const x = scaleBand();
  const innerScaleBand = scaleBand();

  // Gridlines in x axis function
  function make_x_gridlines(ticks: number = 5) {
    return axisBottom(x)
      .ticks(ticks);
  }

  // Gridlines in y axis function
  function make_y_gridlines(ticks: number = 5) {
    return axisLeft(yOuterScaleBand)
      .ticks(ticks);
  }

  const defaultProps: IJoyPlotProps = {
    axis: {
      x: {
        height: 20,
        label: '',
        margin: 10,
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
      groupMargin: 0,
      margin: 0,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: [{
      bins: [],
      counts: [],
    }],
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
    tipContentFn: (bins, i, d, joyTitle): string =>
      joyTitle + ': ' +
      bins[i] + '<br />' + d,
    visible: {},
    width: 200,
  };

  const JoyPlotD3 = {
    /**
     * Initialization
     * @param {Node} el Target DOM node
     * @param {Object} props Chart properties
     */
    create(el: HTMLElement, newProps: Partial<IJoyPlotProps> = {}) {
      this.mergeProps(newProps);
      this._makeSvg(el);
      this.makeGrid(props);
      this.makeScales();
      this.containers = props.data.map((d, i) => svg
        .append('g')
        .attr('class', `histogram-container-${i}`)
      );

      this.update(el, props);
    },

    mergeProps(newProps: Partial<IJoyPlotProps>) {
      props = merge<IJoyPlotProps>(defaultProps, newProps);
      props.data = newProps.data;
      if (newProps.colorScheme) {
        props.colorScheme = newProps.colorScheme;
      }
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
      const { margin, width, height, className } = props;

      // Reference to svg element containing chart
      svg = select(el).append('svg')
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
      tipContainer = select(props.tipContainer).append('div')
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
     * Update a linear scale with range and domain values taken either from the compiled
     * group data
     */
    appendDomainRange(scale: ScaleLinear<number, number>, data: IGroupData[]): void {
      const yDomain: number[] = [];
      const { axis, domain, margin, height } = props;


      const allCounts: number[] = data.reduce((prev, next) => {
        const thisCounts: number[] = next.reduce((p, n) => {
          return [...p, ...n.map((n) => n.value)];
        }, [] as number[]);
        return [...prev, ...thisCounts];
      }, [0]);

      const thisExtent = extent(allCounts, (d) => d);
      yDomain[1] = domain && domain.hasOwnProperty('max') && domain.max !== null
        ? domain.max
        : thisExtent[1];
      yDomain[0] = domain && domain.hasOwnProperty('min') && domain.min !== null
        ? domain.min
        : thisExtent[0];
      const yRange = [yOuterScaleBand.bandwidth(), 0];
      scale.range(yRange)
        .domain(yDomain);
    },

    yAxisWidth() {
      const { axis } = props;
      return axis.y.label === ''
        ? axis.y.width
        : axis.y.width + 30;
    },

    xAxisHeight() {
      const { axis } = props;
      return axis.x.label === ''
        ? axis.x.height
        : axis.x.height + 30;
    },

    makeScales() {
      const { axis, margin, height, width } = props;
      this.xAxis = svg.append('g').attr('class', 'x-axis');
      this.yAxis = svg.append('g').attr('class', 'y-axis');

      if (axis.x.label !== '') {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('transform',
          'translate(' + (Number(width) / 2) + ' ,' +
          ((height - this.xAxisHeight() - (margin.left * 2)) + 10 + axis.x.margin) + ')')
          .style('text-anchor', 'middle')
          .text(axis.x.label);
      }

      if (axis.y.label !== '') {
        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('transform', 'translate(0, -' + this.gridHeight() + ')rotate(-90)')
          .attr('y', 0 - margin.left)
          .attr('x', 0 - (height / 2 - (margin.top * 2)))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text(axis.y.label);
      }
    },

    getBins() {
      return props.data.reduce((prev, next) => {
        return Array.from(new Set(prev.concat(next.bins)));
      }, [] as string[]);
    },

    /**
     * Draw scales
     * @param {Object} data Chart data
     */
    _drawScales(data: IHistogramData[]) {
      const { bar, domain, margin, width, height, axis } = props;
      const valuesCount = data.reduce((prev, next) => {
        const c = this.valuesCount(next.counts);
        return c > prev ? c : prev;
      }, 0);
      const w = this.gridWidth();

      let xAxis;
      const dataLabels = data[0].counts.map((c) => c.label);

      const bins = this.getBins();
      x
        .domain(bins)
        .rangeRound([0, w])
        .paddingInner(this.groupedMargin());

      innerScaleBand
        .domain(dataLabels)
        .rangeRound([0, x.bandwidth()])
        .paddingInner(this.barMargin());

      xAxis = axisBottom(x);

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
        .attr('transform', 'translate(' + (this.yAxisWidth() + axis.y.style['stroke-width']) + ',' +
        (height - this.xAxisHeight() - (margin.left * 2)) + ')')
        .call(xAxis);

      const yLabels = data.map((d) => d.title);
      const yOuterBounds: [number, number] = [height - (margin.top * 2) - this.xAxisHeight(), 0];
      yOuterScaleBand.domain(yLabels)
        .rangeRound(yOuterBounds)

      this.appendDomainRange(y, dataSets);



      const yAxis = axisLeft(yOuterScaleBand).ticks(axis.y.ticks);

      const yTickSize = get(axis, 'y.tickSize', undefined);
      if (yTickSize !== undefined) {
        yAxis.tickSize(yTickSize);
      }

      this.yAxis
        .attr('transform', 'translate(' + this.yAxisWidth() + ', 0)')
        .transition()
        .call(yAxis);

      const { ...xLabelStyle } = axis.x.text.style;
      const { ...yLabelStyle } = axis.y.text.style;
      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style);
    },

    /**
     * Calculate the width of the area used to display the
     * chart bars. Removes chart margins and Y axis from
     * chart total width.
     * @return {number} width
     */
    gridWidth(): number {
      const { axis, width, margin } = props;
      return Number(width) - (margin.left * 2) - this.yAxisWidth();
    },

    /**
     * Calculate the height of the area used to display the
     * chart bars. Removes chart margins and X axis from
     * chart total height.
     * @return {number} width
     */
    gridHeight(): number {
      const { height, margin, axis } = props;
      return height - (margin.top * 2) - this.xAxisHeight();
    },

    /**
     * Returns the margin between similar bars in different data sets
     * @return {Number} Margin
     */
    groupedMargin(): number {
      const m = get(props.bar, 'groupMargin', 0.1);
      return m >= 0 && m <= 1
        ? m
        : 0;
    },

    barMargin(): number {
      const m = get(props.bar, 'margin', 0);
      return m >= 0 && m <= 1
        ? m
        : 0.1;
    },

    /**
     * Calculate the bar width
     * @return {number} bar width
     */
    barWidth() {
      return innerScaleBand.bandwidth();
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      groupData: IGroupData[],
    ) {
      const bins = this.getBins();
      const { height, width, margin, bar, delay, duration,
        axis, stroke, tip, tipContentFn } = props;
      const barWidth = this.barWidth();

      const colors = scaleOrdinal(props.colorScheme);
      const borderColors = scaleOrdinal(['#FFF']);

      const yAxisWidth = this.yAxisWidth();
      const groupedMargin = this.groupedMargin();

      const maxItems = groupData.reduce((prev, next) => {
        const thisMax = next.reduce((p, n) => n.length > p ? n.length : p, 0)
        return thisMax > prev ? thisMax : prev;
      }, 0)
      groupData.forEach((data, i) => {
        const joyTitle = props.data[i].title;
        const g = this.containers[i]
          .selectAll('g')
          .data(data);

        const bars = g.enter()
          .append('g')
          .merge(g)
          .attr('transform', (d) => {
            const xdelta = yAxisWidth
              + axis.y.style['stroke-width']
              + x(d[0].label);

            const ydelta = yOuterScaleBand(d[0].joyLabel);
            return `translate(${xdelta}, ${ydelta})`;
          })
          .selectAll('rect')
          .data((d) => d);

        bars
          .enter()
          .append('rect')
          .attr('height', 0)
          .attr('y', (d: IGroupDataItem): number => yOuterScaleBand.bandwidth())

          .attr('class', 'bar')
          .attr('x', (d) => innerScaleBand(d.groupLabel))
          .attr('width', (d) => barWidth)
          .attr('fill', (d, i) => colors(i))

          .on('mouseover', (d: IGroupDataItem, i: number) => {
            const ix = bins.findIndex((b) => b === d.label);
            tipContent.html(() => tipContentFn(bins, ix, d.value, joyTitle));
            tip.fx.in(tipContainer);
          })
          .on('mousemove', () => tip.fx.move(tipContainer))
          .on('mouseout', () => tip.fx.out(tipContainer))
          .merge(bars)
          .transition()
          .duration(duration)
          .delay(delay)
          .attr('y', (d: IGroupDataItem): number => y(d.value))
          .attr('stroke', (d, i) => {
            if (borderColors) {
              return borderColors(i);
            }
          })
          .attr('shape-rendering', 'crispEdges')
          .attr('stroke-width', stroke.width)
          .attr('stroke-linecap', stroke.linecap)


          // Hide bar's bottom border
          .attr('stroke-dasharray',
          (d: IGroupDataItem): string => {
            const currentHeight = yOuterScaleBand.bandwidth() - y(d.value);
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
          .attr('height', (d: IGroupDataItem): number =>
            yOuterScaleBand.bandwidth() - y(d.value)
          );

        g.exit().remove();
      })

    },


    makeGrid(props: IJoyPlotProps) {
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
    _drawGrid() {
      const { data, height, width, axis, grid, margin, bar } = props;
      const ticks = data.reduce((prev, next) => {
        const c = this.valuesCount(next.counts);
        return c > prev ? prev : c;
      }, 0);
      const axisWidth = axis.y.style['stroke-width'];

      const offset = {
        x: this.yAxisWidth() + axisWidth,
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
          .transition()
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
    update(el: HTMLElement, newProps: IJoyPlotProps) {
      if (!props.data) {
        return;
      }
      this.mergeProps(newProps);
      const { data, visible } = props;

      dataSets = data.map((d) => {
        const lineData = [] as IGroupData;
        d.counts.forEach((count) => {
          count.data.forEach((value, i) => {
            if (!lineData[i]) {
              lineData[i] = [];
            }
            lineData[i].push({
              groupLabel: count.label,
              joyLabel: d.title,
              label: d.bins[i],
              value: visible[d.bins[i]] !== false && visible[count.label] !== false ? value : 0,
            } as IGroupDataItem);
          });
        });
        return lineData;
      });


      this._drawScales(props.data);
      this._drawGrid();
      this.updateChart(dataSets);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };
  return JoyPlotD3;
});
