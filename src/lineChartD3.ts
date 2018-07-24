import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { easeCubic } from 'd3-ease';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { area, curveCatmullRom, line } from 'd3-shape';
import { timeFormat, timeParse } from 'd3-time-format';
import merge from 'deepmerge';
import * as get from 'lodash.get';
import attrs from './d3/attrs';
import {
  drawGrid, gridHeight, gridWidth, makeXGridlines, makeYGridlines,
  xAxisHeight as getXAxisHeight, yAxisWidth as getYAxisWidth,
} from './grid';
import { IChartAdaptor, IHistogramDataSet } from './Histogram';
import { IChartPoint, ILineChartDataSet, ILineChartProps, ISVGPoint } from './LineChart';
import tips, { makeTip } from './tip';

export const lineChartD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let xParseTime;
  let xFormatTime;
  let tipContent;
  const y = scaleLinear();
  let x: any = scaleLinear();

  const
    lineProps = {
      curveType: curveCatmullRom,
      fill: false,
      show: true,
      stroke: '#005870',
      strokeDashArray: '5 5',
      strokeDashOffset: 0,
    };

  const pointProps: ISVGPoint = {
    fill: 'rgba(255, 255, 255, 0)',
    radius: 4,
    stroke: '#005870',
  };

  const defaultProps: ILineChartProps = {
    axis: {
      x: {
        height: 20,
        scale: 'LINEAR',
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
        scale: 'LINEAR',
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
    fx: easeCubic,
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
    tipContainer: 'body',
    tipContentFn: (info, i, d) => {
      switch (typeof info[i].x) {
        case 'object': // date
          return xFormatTime(info[i].x) + ', ' + info[i].y;
        default:
          return Number(info[i].x).toFixed(3) + ', ' + info[i].y;
      }
    },
    width: 200,
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
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      this.container = svg
        .append('g')
        .attr('class', 'linechart-container');
      this.makeGrid();
      this.lineContainer = svg.append('g').attr('class', 'line-container');
      this.makeScales();
      this.update(el, this.props);
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
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const r = makeTip(this.props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    /**
     * Iterate over the dataset drawing points for sets marked as
     * requiring points.
     * @param {Array} data LineChartDataSet
     */
    _drawDataPointSet(data: ILineChartDataSet[]) {
      const { axis, tip } = this.props;
      const yAxisWidth = getYAxisWidth(axis);

      const pointContainer = this.container.selectAll('g').data(data);

      // Don't ask why but we must reference tipContentFn as this.props.tipContentFn otherwise
      // it doesn't update with props changes
      const onMouseOver = (d: ILineChartDataSet, i: number) => {
        tipContent.html(() => this.props.tipContentFn([d], 0));
        tip.fx.in(tipContainer);
      };

      const point = pointContainer.enter()
        .append('g')
        .attr('class', (d, i) => 'point-container' + i)
        .merge(pointContainer)
        .selectAll('circle')
        .data((d) => {
          return d.data.map((dx) => {
            return {
              ...dx,
              point: d.point,
            };
          });
        });

      // UPDATE - Update old elements as needed.
      point.attr('class', 'update');

      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      point.enter().append('circle')
        .attr('class', 'enter')
        .on('mouseover', onMouseOver)
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .merge(point)
        .attr('class', 'point')
        .attr('cy', (d) => y(d.y))
        .attr('r', (d, i) => 0)
        .attr('fill', (d) => d.point.fill)
        .attr('stroke', (d) => d.point.stroke)
        .attr('cx', (d) => {
          return x(d.x) + yAxisWidth;
        })
        .transition()
        .duration(400)
        .attr('r', (d) => d.point.radius)
        .delay(50);

      // EXIT - Remove old elements as needed.
      pointContainer.exit().remove();
      point.exit().remove();
    },

    makeScales() {
      this.xAxis = svg.append('g').attr('class', 'x-axis');
      this.yAxis = svg.append('g').attr('class', 'y-axis');

      this.xAxisLabel = svg.append('g');
      this.yAxisLabel = svg.append('g');
    },

    /**
     * Draw the chart scales
     * @param {Array} data LineChartDataSet
     */
    _drawScales(data: ILineChartDataSet[]) {
      // @TODO Grid not rendering down to x axis
      const { axis, height } = this.props;
      const w = gridWidth(this.props);
      let yDomain;
      let xDomain;
      const ys: any[] = [];
      const xs: any[] = [];
      const yAxis = axisLeft(y).ticks(axis.y.ticks);
      const xAxis = axisBottom(x); // .ticks(axis.x.ticks);
      const xAxisHeight = getXAxisHeight(axis);
      const yAxisWidth = getYAxisWidth(axis);

      data.forEach((datum: ILineChartDataSet) => {
        datum.data.forEach((d: IChartPoint) => {
          ys.push((d.y));
          xs.push((d.x));
        });
      });
      yDomain = extent(ys);
      xDomain = extent(xs);
      x
        .domain(xDomain)
        .rangeRound([0, w]);

      y.domain(yDomain)
        .range([height - xAxisHeight, 0]);

      this.yAxis
        .attr('transform', `translate(${yAxisWidth}, 0)`)
        .transition()
        .call(yAxis);

      this.xAxis
        .attr('transform', `translate(${yAxisWidth},${(height - xAxisHeight)})`)
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
      const { axis } = this.props;
      const yAxisWidth = getYAxisWidth(axis);
      const xAxisHeight = getXAxisHeight(axis);
      const curve = (curveType) => line()
        .curve(curveType)
        .x((d: any) => x(d.x) + yAxisWidth)
        .y((d: any) => {
          return y(d.y);
        });

      const path = this.lineContainer.selectAll('g').data(data);

      // TODO update data is adding in new lines - was hoping the transition would simply update the 'd' attr.
      path.enter().append('path')
        .attr('d', (d) => curve(d.line.curveType)(d.data))
        .attr('class', (d, i) => 'path' + i)
        .attr('fill', 'none')
        .attr('stroke-dashoffset', (d, i) => d.line.strokeDashOffset)
        .attr('stroke-dasharray', (d) => d.line.strokeDashArray)
        .attr('stroke', (d) => d.line.stroke);
      path.transition()
        .duration(500)
        .attr('d', (d) => curve(d.data))
        .delay(50);

      this.lineContainer.exit().remove();
      path.exit().remove();
    },

    drawAreas(data: ILineChartDataSet[]) {
      const { axis, height } = this.props;
      const yAxisWidth = getYAxisWidth(axis);
      const xAxisHeight = getXAxisHeight(axis);
      const thisArea = (curveType) => area()
        .curve(curveType)
        .x((d: any) => x(d.x) + yAxisWidth)
        .y0((d) => height - xAxisHeight)
        .y1((d: any) => y(d.y));

      const dx = data.filter((d) => get(d, 'line.show') === true && get(d, 'line.fill.show') === true);
      const path = this.lineContainer.selectAll('g.areas').data(dx);
      // TODO update data is adding in new lines - was hoping the transition would simply update the 'd' attr.
      path.enter().append('path')
        .attr('d', (d) => thisArea(d.line.curveType)(d.data))
        .attr('class', (d, i) => 'curve-area path' + i)
        .attr('fill', (d) => d.line.fill.fill);
      path.transition()
        .duration(500)
        .attr('d', (d) => thisArea(d.data))
        .delay(50);

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

    makeGrid() {
      this.gridX = svg.append('g')
        .attr('class', 'grid gridX');
      this.gridY = svg.append('g')
        .attr('class', 'grid gridY');
    },

    /**
     * Update chart
     */
    update(el: Element, props) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      switch (props.axis.x.scale) {
        case 'TIME':
          x = scaleTime();
          break;
        default:
          x = scaleLinear();
          break;
      }

      let data = props.data;

      xParseTime = timeParse(props.axis.x.dateFormat);
      xFormatTime = timeFormat(props.axis.x.dateFormat);
      data = data.map((datum: ILineChartDataSet) => {
        if (props.axis.x.scale === 'TIME') {
          datum.data = datum.data.map((d) => {
            const newd = {
              ...d,
              x: typeof d.x === 'object'
                ? d.x
                : xParseTime(d.x.toString()),
            };
            return newd;
          });
        }
        return Object.assign({}, datumProps, datum);
      });
      this._drawScales(data);
      this._drawLines(data);
      this.drawAreas(data);
      drawGrid(x, y, this.gridX, this.gridY, this.props, this.valuesCount(data));
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
