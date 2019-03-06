import { extent } from 'd3-array';
import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import { easeCubic } from 'd3-ease';
import { format } from 'd3-format';
import {
  scaleLinear,
  scaleLog,
  scaleTime,
} from 'd3-scale';
import { select } from 'd3-selection';
import {
  area,
  curveCatmullRom,
  line,
} from 'd3-shape';
import {
  timeFormat,
  timeParse,
} from 'd3-time-format';
import * as merge from 'deepmerge';
import * as get from 'lodash.get';

import attrs from './d3/attrs';
import {
  drawGrid,
  gridWidth,
  xAxisHeight as getXAxisHeight,
  yAxisWidth as getYAxisWidth,
} from './grid';
import {
  IChartAdaptor,
  IHistogramDataSet,
} from './Histogram';
import {
  IChartPoint,
  ILineChartDataSet,
  ILineChartProps,
  ISVGPoint,
} from './LineChart';
import tips, { makeTip } from './tip';

const ZERO_SUBSITUTE: number = 1e-6;

export const lineChartD3 = ((): IChartAdaptor => {
  let svg;
  let tipContainer;
  let xParseTime;
  let xFormatTime;
  let tipContent;
  let y = scaleLinear();
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

  const hasArea = (d) => get(d, 'line.show') === true && get(d, 'line.fill.show') === true;

  const curve = (curveType, yAxisWidth) => line()
    .curve(curveType)
    .x((d: any) => x(d.x) + yAxisWidth)
    .y((d: any) => {
      return y(d.y);
    });

  const LineChartD3 = {
    /**
     * Initialization
     */
    create(el: Node, props: Object = {}) {
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      this.container = svg
        .append('g')
        .attr('class', 'linechart-container');
      this.makeGrid();
      this.lineContainer = svg
        .append('g')
        .attr('class', 'line-container');
      this.makeScales();
      this.buildScales(this.props);
      this._createLines(this.props.data);
      this.update(el, this.props);
    },

    /**
     * Make the SVG container element
     * Recreate if it previously existed
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
      const scale = {
        x: 1 - (margin.left / width),
        y: 1 - (margin.top / height),
      };

      // Reference to svg element containing chart
      svg = select(el).append('svg')
        .attr('class', className)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top}) scale(${scale.x},${scale.y})`);

      const r = makeTip(this.props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    /**
     * Iterate over the dataset drawing points for sets marked as
     * requiring points.
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
        .delay(650);

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
     */
    _drawScales(data: Array<ILineChartDataSet<IChartPoint<number, number>>>) {
      // @TODO Grid not rendering down to x axis
      const { axis, height } = this.props;
      const w = gridWidth(this.props);
      let yDomain;
      let xDomain;
      const ys: any[] = [];
      const xs: any[] = [];
      const yAxis = axisLeft(y);
      if (axis.y.tickValues) {
        yAxis.tickValues(axis.y.tickValues);
      } else {
        yAxis.ticks(axis.y.ticks);
      }
      if (axis.y.numberFormat) {
        yAxis.tickFormat(format(axis.y.numberFormat));
      }

      const xAxis = axisBottom(x); // .ticks(axis.x.ticks);
      if (axis.x.tickValues) {
        xAxis.tickValues(axis.x.tickValues);
      }
      if (axis.x.scale === 'TIME' && axis.x.dateFormat) {
        xAxis.tickFormat(timeFormat(axis.x.dateFormat));
      }
      const xAxisHeight = getXAxisHeight(axis);
      const yAxisWidth = getYAxisWidth(axis);

      data.forEach((datum: ILineChartDataSet<IChartPoint<number, number>>) => {
        datum.data.forEach((d: IChartPoint<number, number>) => {
          let parsedY = d.y;
          let parsedX = d.x;
          if (axis.y.scale === 'LOG' && d.y === 0) {
            parsedY = ZERO_SUBSITUTE;
          }
          if (axis.x.scale === 'LOG' && d.x === 0) {
            parsedX = ZERO_SUBSITUTE;
          }
          ys.push((parsedY));
          xs.push((parsedX));
        });
      });
      yDomain = extent(ys);
      xDomain = extent(xs);
      // domain mustn't be 0 as log(0) gives Infinity. 1 lower domain gives better looking graphs
      if (axis.y.scale === 'LOG' && yDomain[0] === ZERO_SUBSITUTE) {
        yDomain[0] = 1;
      }
      if (axis.x.scale === 'LOG' && xDomain[0] === ZERO_SUBSITUTE) {
        xDomain[0] = 1;
      }
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

    _createLines(data: ILineChartDataSet[]) {
      data.forEach((d, i) => {
        this.lineContainer.append('path')
          .attr('class', `line-${i}`);
      });

      // change the line
      data
        .filter(hasArea)
        .forEach((d, i) => {
          this.lineContainer.append('path')
            .attr('class', `fill-${i}`);

        });

    },

    /**
     * Iterate over data and update lines
     */
    _drawLines(data: ILineChartDataSet[]) {
      const { axis } = this.props;
      const yAxisWidth = getYAxisWidth(axis);

      // change the line
      data.forEach((d, i) => {
        this.lineContainer.select(`.line-${i}`)
          .attr('fill', 'none')
          .attr('stroke-dashoffset', d.line.strokeDashOffset)
          .attr('stroke-dasharray', d.line.strokeDashOffset)
          .attr('stroke', d.line.stroke)
          .transition()
          .duration(500)
          .attr('d', curve(d.line.curveType, yAxisWidth)(d.data as any))
          .delay(50);
      });
    },

    /**
     * Iterates ove data and updates area fills
     */
    drawAreas(data: ILineChartDataSet[]) {
      const { axis, height } = this.props;
      const yAxisWidth = getYAxisWidth(axis);
      const xAxisHeight = getXAxisHeight(axis);
      const thisArea = (curveType) => area()
        .curve(curveType)
        .x((d: any) => x(d.x) + yAxisWidth)
        .y0((d) => height - xAxisHeight)
        .y1((d: any) => y(d.y));

      // change the line
      data
        .filter(hasArea)
        .forEach((d, i) => {
          this.lineContainer.select(`.fill-${i}`)
            .attr('fill', d.line.fill.fill)
            .transition()
            .duration(500)
            .delay(50)
            .attr('d', thisArea(d.line.curveType)(d.data as any))
            ;
        });
    },

    /**
     * Get a max count of values in each data set
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

    buildScales(props) {
      switch (props.axis.x.scale) {
        case 'TIME':
          x = scaleTime();
          break;
        default:
          x = scaleLinear();
          break;
      }

      switch (props.axis.y.scale) {
        case 'LOG':
          y = scaleLog().clamp(true); // clamp values below 1 to be equal to 0
          break;
        default:
          y = scaleLinear();
          break;
      }
    },

    /**
     * Update chart
     */
    update(el: Element, props) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      this.buildScales(this.props);
      let data = props.data;

      xParseTime = timeParse(props.axis.x.dateFormat);
      xFormatTime = timeFormat(props.axis.x.dateFormat);
      data = data.map((datum: ILineChartDataSet<IChartPoint<number, number>>) => {
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
