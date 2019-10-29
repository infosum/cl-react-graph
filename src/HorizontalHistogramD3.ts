import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';
import { Selection } from 'd3-selection';
import merge from 'lodash/merge';

import colorScheme from './colors';
import attrs from './d3/attrs';
import {
  drawHorizontalGrid,
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  EGroupedBarLayout,
  IChartAdaptor,
  IHistogramProps,
} from './Histogram';
import {
  IGroupData,
  IGroupDataItem,
} from './HistogramD3';
import tips, { makeTip } from './tip';
import {
  barMargin,
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedMargin,
} from './utils/bars';
import {
  annotationAxisDefaults,
  axis as defaultAxis,
  grid as defaultGrid,
} from './utils/defaults';
import {
  appendDomainRange,
  isStacked,
  maxValueCount,
  ticks,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
} from './utils/mouseOver';
import {
  makeGrid,
  makeScales,
  makeSvg,
  sizeSVG,
  TSelection,
} from './utils/svg';
import { DeepPartial } from './utils/types';

export const horizontalHistogramD3 = ((): IChartAdaptor<IHistogramProps> => {
  let svg: Selection<any, any, any, any>;;
  let tipContainer;
  let tipContent;
  const x = scaleLinear();
  const y = scaleBand();
  const yAnnotations = scaleBand();
  const innerScaleBand = scaleBand();
  let container: Selection<SVGElement, any, any, any>;
  let dataSets: IGroupData;
  let gridX: TSelection;
  let gridY: TSelection;
  let yAxisContainer: TSelection;
  let xAxisContainer: TSelection;
  let xAxisLabel: TSelection;
  let yAxisLabel: TSelection;
  let AnnotationAxisContainer: TSelection;

  const props: IHistogramProps = {
    axis: defaultAxis,
    bar: {
      groupMargin: 0.1,
      margin: 10,
      overlayMargin: 5,
      width: 50,
    },
    className: 'histogram-d3',
    colorScheme,
    data: {
      bins: [],
      colorScheme: [],
      counts: [],
    },
    delay: 0,
    domain: {
      max: null,
      min: null,
    },
    duration: 400,
    grid: defaultGrid,
    groupLayout: EGroupedBarLayout.GROUPED,
    height: 200,
    margin: {
      bottom: 0,
      left: 5,
      right: 0,
      top: 5,
    },
    stacked: false, // Deprecated use groupLayout instead
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

  const HorizontalHistogramD3 = {
    /**
     * Initialization
     */
    create(el: Element, newProps: DeepPartial<IHistogramProps> = {}) {
      merge(props, newProps);
      svg = makeSvg(el, svg);
      const { margin, width, height, className } = props;
      sizeSVG(svg, { margin, width, height, className });
      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
      [gridX, gridY] = makeGrid(svg);
      [xAxisContainer, yAxisContainer, xAxisLabel, yAxisLabel, AnnotationAxisContainer] = makeScales(svg);
      container = svg
        .append<SVGElement>('g')
        .attr('class', 'histogram-container');

      this.update(el, newProps);
    },

    /**
    * Draw Axes
    */
    drawAxes() {
      const { annotations, bar, data, domain, groupLayout, stacked, margin, width, height, axis } = props;
      const valuesCount = maxValueCount(data.counts);
      const w = gridWidth(props);
      const h = gridHeight(props);
      const dataLabels = data.counts.map((c) => c.label);

      y.domain(data.bins)
        .rangeRound([0, h])
        .paddingInner(groupedMargin(bar));

      innerScaleBand
        .domain(groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels)
        .rangeRound([0, y.bandwidth()])
        .paddingInner(barMargin(props.bar));

      const xAxis = axisBottom<number>(x);
      const yAxis = axisLeft<string>(y);

      /** Y-Axis (label axis) set up */

      ticks({
        axis: yAxis,
        valuesCount,
        axisLength: h,
        axisConfig: axis.y,
        scaleBand: y,
        limitByValues: true,
      });

      yAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ', ' + margin.top + ' )')
        .call(yAxis);

      /** X-Axis 2 (bottom axis) for annoations if annotations data sent (and match bin length) */
      if (annotations && annotations.length === data.bins.length) {

        yAnnotations
          .domain(data.bins)
          .rangeRound([0, h])
          .paddingInner(groupedMargin(bar));

        const annotationAxis = axisLeft<string>(yAnnotations);

        ticks({
          axis: annotationAxis,
          valuesCount: annotations.length,
          axisLength: h,
          axisConfig: annotationAxisDefaults,
          scaleBand: yAnnotations,
          limitByValues: true,
        });
        // Override the default axis bin labels with the custom annotations 
        annotationAxis.tickFormat((d, i) => annotations[i].value);
        AnnotationAxisContainer
          .attr('transform', 'translate(' + Number(yAxisWidth(axis) - 20) + ', ' + margin.top + ' )')
          .call(annotationAxis);

        // Annotation Axis styling
        attrs(svg.selectAll('.x-axis-top .domain, .x-axis-top .tick line'), axis.x.style);
        attrs(svg.selectAll('.x-axis-top .tick text'), axis.x.text.style as any);

        // Style the annotations with their specific color
        AnnotationAxisContainer
          .selectAll('g.tick')
          .select('text')
          .style('fill', (d, i) => annotations[i].color);
        // Hide the line for the annotations axis
        AnnotationAxisContainer.call(g => g.select(".domain").remove());

      }

      /** X-Axis (value axis) set up */
      appendDomainRange({
        data: dataSets,
        domain,
        range: [0, Number(width) - (margin.top * 2) - axis.y.width],
        scale: x,
        stacked: isStacked({ groupLayout, stacked })
      })

      const xAxisY = height - xAxisHeight(props.axis) - margin.top;
      xAxisContainer
        .attr('transform', 'translate(' + yAxisWidth(axis) + ',' +
          xAxisY + ')')
        .call(xAxis);

      attrs(svg.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
      attrs(svg.selectAll('.y-axis .tick text'), axis.y.text.style as any);

      attrs(svg.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
      attrs(svg.selectAll('.x-axis .tick text'), axis.x.text.style as any);
    },

    /**
     * Draw a single data set into the chart
     */
    updateChart(
      bins: string[],
      groupData: IGroupData,
    ) {
      const { axis, height, margin, delay, duration, tip, groupLayout, showBinPercentages, stacked } = props;

      const stackedOffset = (d: IGroupDataItem, stackIndex: number) => {
        const thisGroupData = groupData.find((gData) => {
          return gData.find((dx) => dx.label === d.label) !== undefined;
        });
        const oSet = (thisGroupData || [])
          .filter((_, i) => i < stackIndex)
          .reduce((prev, next) => prev + next.value, 0);
        const isItStacked = isStacked({ groupLayout, stacked });
        const offset = isItStacked && stackIndex > 0
          ? oSet
          : 0;
        return isItStacked ? x(offset) : 0;
      }

      const colors = scaleOrdinal(props.colorScheme);
      const gWidth = gridWidth(props);

      const g = container
        .selectAll<SVGElement, {}>('g')
        .data(groupData);

      const bars = g.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let yd = y(d[0].label);
          if (yd === undefined) {
            yd = 0;
          }
          const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
          return `translate(${x}, ${margin.top + yd})`;
        })

        .selectAll<SVGElement, {}>('rect')
        .data((d) => d);

      bars
        .enter()
        .append<SVGElement>('rect')
        .attr('width', 0)
        .attr('x', stackedOffset)
        .attr('class', 'bar')
        .on('click', onClick(props.onClick))
        .on('mouseover', onMouseOver({ bins, hover: props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
        .merge(bars)
        .attr('y', (d: IGroupDataItem, i: number) => {
          const overlay = (props.groupLayout === EGroupedBarLayout.OVERLAID)
            ? i * props.bar.overlayMargin
            : Number(innerScaleBand(String(d.groupLabel)));
          return overlay;
        })
        .attr('height', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
        .attr('fill', (d, i) => colors(String(i)))
        .transition()
        .duration(duration)
        .delay(delay)
        .attr('x', stackedOffset)
        // Hide bar's bottom border
        .attr('stroke-dasharray',
          (d: IGroupDataItem, i): string => {
            const currentHeight = gWidth - (x(d.value));
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            return `${barWidth} 0 ${currentHeight} ${barWidth}`;
          })
        .attr('width', (d: IGroupDataItem): number => x(d.value));

      // We need to show the bar percentage splits if flag enabled
      if (showBinPercentages) {

        const percents = g.enter()
          .append<SVGElement>('g')
          .merge(g)
          .attr('transform', (d: any[]) => {
            let yd = y(d[0].label);
            if (yd === undefined) {
              yd = 0;
            }
            const x = yAxisWidth(axis) + axis.x.style['stroke-width'];
            return `translate(${x}, ${margin.top + yd})`;
          })

          .selectAll<SVGElement, {}>('text')
          .data((d) => d);

        percents
          .enter()
          .append<SVGElement>('text')
          .attr('width', 0)
          .attr('x', 0)
          .attr('y', 0)
          .attr('dy', 0)
          .attr('dx', 0)
          .attr('class', 'percentage-label')
          .attr('x', stackedOffset)
          .text((d, i) => {
            // To show the correct percentage split we need to total all the other values in this count set
            const total = groupData.reduce((prev, group) => prev + group[i].value, 0);
            const percentage = Math.round((d.value / total) * 100);
            return showBinPercentages[i] ? `${d.value === 0 ? 0 : percentage}%` : '';
          })
          .data((d) => d)
          .style('text-anchor', 'middle')
          .style('font-size', '0.675rem')
          .attr('fill', (d, i) => colors(String(i)))
          .merge(percents)
          .attr('x', (d: IGroupDataItem): number => x(d.value) + 15) // 15 added to space the label away from the bar
          .attr('dy', (d, i) => {
            const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
            const datasetsCount = innerScaleBand.domain().length;
            // Overlaid group type we need to use the bar width / 2 for the first bar 
            // center point but for the second bar we need to take into account half of the overlay margin as it's
            // positioned within the previous bar
            if (props.groupLayout === EGroupedBarLayout.OVERLAID) {
              return i === 0 ? (barWidth / 2) : (barWidth + props.bar.overlayMargin * 2) / 2
            } else {
              // If we are using grouped layout then we need to calculate the total width of the bars + margin
              // Center point calculated by dividing the bar width and margin / datasets count and adding together
              // Second bar calculation needs to minus this value from the total width
              const totalWidth = ((barWidth * innerScaleBand.domain().length)) + props.bar.margin;
              const centerPos = (barWidth / datasetsCount) + (props.bar.margin / datasetsCount);
              return i === 0 ? centerPos : totalWidth - centerPos
            }
          });
        percents.exit().remove();
      };

      bars.exit().remove();
      g.exit().remove();

      const yText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.y.label]);

      yText.enter().append('text')
        .attr('class', 'y-axis-label')
        .merge(yText)
        .attr('transform',
          'translate(' + (Number(height) / 2) + ' ,' +
          ((height - yAxisWidth(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
        .style('text-anchor', 'middle')
        .text((d) => d);

      const xText = yAxisLabel
        .selectAll<any, any>('text')
        .data([axis.x.label]);

      xText.enter().append('text')
        .attr('class', 'x-axis-label')
        .merge(xText)
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - (gWidth / 2 - (margin.top * 2)))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text((d) => d);
    },

    /**
     * Update chart
     */
    update(el: Element, newProps: DeepPartial<IHistogramProps>) {
      if (!props.data) {
        return;
      }
      merge(props, newProps);
      if (!props.data.bins) {
        return;
      }
      const { margin, width, height, className, data, visible } = props;
      sizeSVG(svg, { margin, width, height, className });
      dataSets = [];

      data.counts.forEach((count) => {
        count.data.forEach((value, i) => {
          if (!dataSets[i]) {
            dataSets[i] = [];
          }
          dataSets[i].push({
            groupLabel: count.label,
            label: data.bins[i],
            value: visible[data.bins[i]] !== false && visible[count.label] !== false ? value : 0,
          });
        });
      });

      this.drawAxes();
      drawHorizontalGrid({ x, y, gridX, gridY, props, ticks: maxValueCount(data.counts) });
      this.updateChart(data.bins, dataSets);
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };
  return HorizontalHistogramD3;
});
