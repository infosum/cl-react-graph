import {
  axisBottom,
  axisLeft,
} from 'd3-axis';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from 'd3-scale';

import {
  BaseHistogramD3,
  IGroupData,
  IGroupDataItem,
} from './BaseHistogramD3';
import attrs from './d3/attrs';
import {
  gridHeight,
  gridWidth,
  xAxisHeight,
  yAxisWidth,
} from './grid';
import {
  EGroupedBarLayout,
  IAxis,
} from './Histogram';
import {
  getBarWidth,
  groupedBarsUseSameXAxisValue,
  groupedPaddingInner,
  groupedPaddingOuter,
  paddingInner,
  paddingOuter,
} from './utils/bars';
import { annotationAxisDefaults } from './utils/defaults';
import {
  appendDomainRange,
  formatTick,
  isStacked,
  maxValueCount,
  shouldFormatTick,
  ticks,
} from './utils/domain';
import {
  onClick,
  onMouseOut,
  onMouseOver,
  onMouseOverAxis,
} from './utils/mouseOver';

export class HistogramD3 extends BaseHistogramD3 {

  y = scaleLinear();
  x = scaleBand();

  /**
   * Draw scales
   */
  drawAxes() {
    const { props, tipContent, x, y, innerScaleBand } = this;
    const { axis, bar, annotations, annotationTextSize, domain, groupLayout,
      stacked, data, margin, height, tip, tipContainer } = props;
    const valuesCount = maxValueCount(data.counts);
    const w = gridWidth(props);
    const h = gridHeight(props);
    const dataLabels = data.counts.map((c) => c.label);
    const annotationsEnabled = annotations && annotations.length === data.bins.length;

    x
      .domain(data.bins)
      .rangeRound([0, w])
      .paddingInner(paddingInner(bar))
      .paddingOuter(paddingOuter(bar));

    innerScaleBand
      .domain(groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels)
      .rangeRound([0, x.bandwidth()])
      .paddingInner(groupedPaddingInner(bar))
      .paddingOuter(groupedPaddingOuter(bar)) // Center the bar distribution around the middle;

    const xAxis = axisBottom<string>(x);
    const yAxis = axisLeft<number>(y);

    const axisXAnnotationAllowance: IAxis = {
      ...axis.x,
      tickSize: 5,
    }
    /** X-Axis (label axis) set up */
    ticks({
      axis: xAxis,
      valuesCount,
      axisLength: w,
      axisConfig: annotationsEnabled ? axisXAnnotationAllowance : axis.x,
      scaleBand: x,
      limitByValues: true,
    });

    this.xAxisContainer
      ?.attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' +
        (height - xAxisHeight(props.axis) - (margin.left * 2)) + ')')
      .call(xAxis);

    // Add a tooltip to the x axis if a custom method has been sent
    const colors = scaleOrdinal(props.colorScheme);
    if (this.props.axisLabelTipContentFn) {
      this.xAxisContainer
        ?.selectAll('g.tick')
        .select('text')
        .on('mouseover', (onMouseOverAxis({ ...props.data, colors, tipContentFn: props.axisLabelTipContentFn, tipContent, tip, tipContainer })))
        .on('mousemove', () => tip.fx.move(this.tipContainer))
        .on('mouseout', () => tip.fx.out(this.tipContainer))
    }

    /** X-Axis 2 (bottom axis) for annotations if annotations data sent (and match bin length) */
    if (annotations && annotations.length === data.bins.length) {

      this.xAnnotations.domain(data.bins)
        .rangeRound([0, w])
        .paddingInner(paddingInner(bar))
        .paddingOuter(paddingOuter(bar));

      const annotationAxis = axisBottom<string>(this.xAnnotations);

      ticks({
        axis: annotationAxis,
        valuesCount: annotations.length,
        axisLength: w,
        axisConfig: annotationAxisDefaults,
        scaleBand: this.xAnnotations,
        limitByValues: true,
      });
      // Override the default axis bin labels with the custom annotations
      annotationAxis.tickFormat((d, i) => annotations[i].value);

      this.xAnnotationAxisContainer?.attr('transform', 'translate(' + (yAxisWidth(axis) + axis.y.style['stroke-width']) + ',' + (h + 14) + ')')
        .call(annotationAxis);

      // Style the annotations with their specific color
      this.xAnnotationAxisContainer?.selectAll('g.tick')
        .select('text')
        .style('fill', (d, i) => annotations[i].color)
        .style('font-size', annotationTextSize ? annotationTextSize : '0.475rem');

      this.xAnnotationAxisContainer?.selectAll('line')
        .style('opacity', 0);

      // Hide the line for the annotations axis
      this.xAnnotationAxisContainer?.call(g => g.select('.domain').remove());

    }
    /** Y-Axis (value axis) set up */
    appendDomainRange({
      data: this.dataSets,
      domain,
      range: [h, 0],
      scale: this.y,
      stacked: isStacked({ groupLayout, stacked })
    });

    ticks({
      axis: yAxis,
      valuesCount,
      axisLength: w,
      axisConfig: axis.y,
      scaleBand: this.y,
    });
    // Format number axis if format prop provided
    if (shouldFormatTick(axis.y)) {
      yAxis.tickFormat((v) => {
        const n = v.toString().replace('-', '');
        return String(formatTick(axis.y)(n));
      });
    }
    this.yAxisContainer?.attr('transform', 'translate(' + yAxisWidth(axis) + ', 0)')
      .transition()
      .call(yAxis);

    attrs(this.svg?.selectAll('.y-axis .domain, .y-axis .tick line'), axis.y.style);
    attrs(this.svg?.selectAll('.y-axis .tick text'), axis.y.text.style as any);

    attrs(this.svg?.selectAll('.x-axis .domain, .x-axis .tick line'), axis.x.style);
    attrs(this.svg?.selectAll('.x-axis .tick text'), axis.x.text.style as any);
  }
  /**
   * Draw a single data set into the chart
   */
  updateChart(
    bins: string[],
    groupData: IGroupData,
  ) {
    const { props, x, y, innerScaleBand, container, tipContainer, tipContent, xAxisLabel, yAxisLabel } = this;
    const { axis, height, width, margin, delay, duration, tip, groupLayout, showBinPercentages, stacked } = props;

    const stackedOffset = (d: IGroupDataItem, stackIndex: number): number => {
      const thisGroupData = groupData.find((gData) => {
        return gData.find((dx) => dx.label === d.label) !== undefined;
      });
      const oSet = thisGroupData ?
        thisGroupData
          .filter((_, i) => i < stackIndex)
          .reduce((prev, next) => prev + next.value, 0)
        : 0;
      const offset = isStacked({ groupLayout, stacked }) && stackIndex > 0
        ? oSet
        : 0;
      return y(d.value + offset);
    }

    const calculateXPosition = (d: IGroupDataItem, stackIndex: number, offset: number, counts: number): number => {
      const dataLabels = props.data.counts.map((c) => c.label);
      const scaleVars = groupedBarsUseSameXAxisValue({ groupLayout, stacked }) ? ['main'] : dataLabels;
      let bandX = 0;

      switch (props.groupLayout) {
        case EGroupedBarLayout.OVERLAID:
          const overlaidOffset = props.bar.overlayMargin * stackIndex;
          bandX = Number(innerScaleBand(String(scaleVars[0]))) + overlaidOffset;
          break;
        case EGroupedBarLayout.STACKED:
          bandX = Number(innerScaleBand(String(scaleVars[0])));
          break;
        case EGroupedBarLayout.GROUPED:
          bandX = Number(innerScaleBand(String(d.groupLabel)));
          break;
      }

      return offset ? bandX + offset : bandX;
    }

    const colors = scaleOrdinal(props.colorScheme);
    const gHeight = gridHeight(props);

    const g = container
      ?.selectAll<SVGElement, {}>('g')
      .data(groupData);

    const bars = g?.enter()
      .append<SVGElement>('g')
      .merge(g)
      .attr('transform', (d: any[]) => {
        let xd = x(d[0].label);
        if (xd === undefined) {
          xd = 0;
        }
        const xDelta = yAxisWidth(axis)
          + axis.y.style['stroke-width']
          + xd;
        return `translate(${xDelta}, 0)`;
      })

      .selectAll<SVGElement, {}>('rect')
      .data((d) => d);

    bars
      ?.enter()
      .append<SVGElement>('rect')
      .attr('height', 0)
      .attr('y', y(0)) // Start animation from y Axis 0
      .attr('class', 'bar')
      .on('click', onClick(props.onClick))
      .on('mouseover', onMouseOver({ bins, hover: this.props.bar.hover, colors, tipContentFn: props.tipContentFn, tipContent, tip, tipContainer }))
      .on('mousemove', () => tip.fx.move(tipContainer))
      .on('mouseout', onMouseOut({ tip, tipContainer, colors }))
      .merge(bars)
      .attr('x', (d: IGroupDataItem, i: number) => calculateXPosition(d, i, 0, props.data.counts.length))
      .attr('width', (d, i) => getBarWidth(i, props.groupLayout, props.bar, innerScaleBand))
      .attr('fill', (d, i) => colors(String(i)))
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('y', stackedOffset)
      // Hide bar's bottom border
      .attr('stroke-dasharray',
        (d: IGroupDataItem, i): string => {
          const currentHeight = gHeight - (y(d.value));
          const barWidth = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
          return `${barWidth} 0 ${currentHeight} ${barWidth}`;
        })
      .attr('height', (d: IGroupDataItem): number => gHeight - (y(d.value)));

    // We need to show the bar percentage splits if flag enabled
    if (showBinPercentages) {

      const percents = g?.enter()
        .append<SVGElement>('g')
        .merge(g)
        .attr('transform', (d: any[]) => {
          let xd = x(d[0].label);
          if (xd === undefined) {
            xd = 0;
          }
          const xDelta = yAxisWidth(axis)
            + axis.y.style['stroke-width']
            + xd;
          return `translate(${xDelta}, 0)`;
        })

        .selectAll<SVGElement, {}>('text')
        .data((d) => d);

      percents
        ?.enter()
        .append<SVGElement>('text')
        .attr('class', 'percentage-label')
        .attr('y', stackedOffset)
        .data((d) => d)
        .merge(percents)
        .text((d, i) => {
          // To show the correct percentage split we need to total all the other values in this count set
          const total = groupData.reduce((prev, group) => prev + group[i].value, 0);
          const percentage = d.value === 0 ? 0 : Math.round((d.value / total) * 100);
          return showBinPercentages[i] ? `${percentage}%` : '';
        })
        .style('text-anchor', 'middle')
        .style('font-size', '0.675rem')
        .attr('fill', (d, i) => colors(String(i)))
        .attr('x', (d: IGroupDataItem, i: number) => {
          const barWidthForOffset = getBarWidth(i, props.groupLayout, props.bar, innerScaleBand);
          return calculateXPosition(d, i, barWidthForOffset / 2, props.data.counts.length);
        })
        .attr('dy', -2);
      percents?.exit().remove();
    };
    bars?.exit().remove();
    g?.exit().remove();

    const xText = xAxisLabel
      .selectAll('text')
      .data([axis.x.label]);

    xText.enter().append('text')
      .attr('class', 'x-axis-label')
      .merge(xText)
      .attr('transform',
        'translate(' + (Number(width) / 2) + ' ,' +
        ((height - xAxisHeight(props.axis) - (margin.left * 2)) + axis.x.margin) + ')')
      .style('text-anchor', 'middle')
      .text((d) => d);

    const yText = yAxisLabel
      ?.selectAll<any, any>('text')
      .data([axis.y.label]);

    yText?.enter().append('text')
      .attr('class', 'y-axis-label')
      .merge(yText)
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - (gHeight / 2 - (margin.top * 2)))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text((d) => d);
  }

}
