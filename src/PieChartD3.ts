/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import merge from 'deepmerge';
import * as textWidth from 'text-width';
import colorScheme from './colors';
import { IPieChartProps } from './PieChart';
import tips from './tip';

export const pieChartD3 = ((): IChartAdaptor => {

  let svg;
  let tipContainer;
  let tipContent;

  const defaultProps: IPieChartProps = {
    backgroundColor: '#ddd',
    className: 'piechart-d3',
    colorScheme,
    data: {
      bins: [],
      counts: [],
    },
    donutWidth: 0,
    height: 200,
    labels: {
      display: true,
      displayFn: (d, ix) => d.value,
    },
    margin: {
      left: 10,
      top: 10,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number): string => {
      return bins[i] + '<br />' + d;
    },
    visible: {},
    width: 200,
  };

  const PieChartD3 = {

    create(el: HTMLElement, props: Partial<IPieChartProps> = {}) {
      console.log('create', props.data);
      this.props = merge(defaultProps, { ...props });
      this.previousData = props.data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count,
            label: props.data.bins[i],
          }));
      });
      this._makeSvg(el);
      this.containers = [];
      this.previousData.forEach((dataSet, i) => {
        this.drawChartBg(this.props.data, i);
        // this.drawChart(dataSet, i, this.props.data.bins);
      });

      this.update(el, props);
    },

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
      tipContainer = d3.select(this.props.tipContainer)
        .append('div')
        .attr('class', 'tooltip top pietip')
        .style('opacity', 0);

      tipContainer.append('div')
        .attr('class', 'tooltip-arrow');
      tipContent = tipContainer.append('div')
        .attr('class', 'tooltip-inner');
    },

    update(el: HTMLElement, props: Partial<IPieChartProps>) {
      console.log('update', props.data, props.visible);
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      if (props.colorScheme) {
        this.props.colorScheme = props.colorScheme;
      }
      // this._makeSvg(el);
      if (!this.props.data.bins) {
        return;
      }

      this.drawCharts();
    },

    outerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;

      const radius = Math.min(width, height) / 2;
      return donutWidth === 0
        ? radius - 10
        : radius - 10 - (setIndex * (donutWidth + 10));
    },

    innerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;
      const radius = Math.min(width, height) / 2;
      return donutWidth === 0
        ? 0
        : radius - 10 - donutWidth - (setIndex * (donutWidth + 10));
    },

    drawCharts() {
      const { data, visible } = this.props;
      this.dataSets = data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count: visible[data.bins[i]] !== false ? count : 0,
            label: data.bins[i],
          }));
      });
      this.dataSets.forEach((dataSet, i) => {
        this.drawChart(dataSet, i, data.bins);
        this.updateChart(dataSet, i, data.bins);
      });
      this.previousData = this.dataSets;
    },

    drawChartBg(data, i) {
      console.log('drawChartBg', data);
      const { backgroundColor, width, height } = this.props;
      const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);
      const bgArc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(tau);
      const container = svg
        .append('g')
        .attr('class', 'pie-bg');
      const background = container.append('path')
        .attr('class', 'pie-background')
        .style('fill', backgroundColor)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .attr('d', bgArc);

      if (!this.containers[i]) {
        this.containers[i] = svg
          .append('g')
          .attr('class', 'pie-container');
      }
    },

    updateChart(data, i, bins) {
      console.log('data', data);
      const { labels, width, height, tip, tipContentFn } = this.props;

      // Stack multiple charts in concentric circles
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);
      const colors = d3.scaleOrdinal(this.props.colorScheme);

      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      // Function to calculate pie chart paths from data
      const pie = d3
        .pie()
        .sort(null)
        .value((d: any) => {
          return d.count;
        });

      // DATA JOIN
      // Join new data with old elements, if any.
      let text = this.containers[i].selectAll('text')
        .data(data);

      // UPDATE
      // Update old elements as needed.
      text.attr('class', 'update');

      // ENTER
      // Create new elements as needed.
      //
      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      text.enter().append('text')
        .attr('class', 'enter')
        .attr('x', function (d, i) { return i * 32; })
        .attr('dy', '.35em')
        .merge(text)
        .text(function (d) { return d.count; });

      // EXIT
      // Remove old elements as needed.
      text.exit().remove();
    },

    drawChart(data, i, bins) {
      console.log('drawChart', data);
      const { labels, width, height, tip, tipContentFn } = this.props;
      // Stack multiple charts in concentric circles
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);

      // Function to calculate pie chart paths from data
      const pie = d3
        .pie()
        .sort(null)
        .value((d: any) => {
          return d.count;
        });

      // Formated pie chart arcs based on previous current data
      const arcs = pie(this.previousData[i]);

      const colors = d3.scaleOrdinal(this.props.colorScheme);

      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const container = this.containers[i]
        .datum(data).selectAll('path')
        .data(pie)
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      const path = container.append('path')
        .attr('stroke', '#FFF')
        .attr('fill', (d, j) => colors(j))
        .attr('d', arc)
        .each(function (d, j) { this._current = arcs[j]; }) // store the initial angles
        .on('mouseover', (d: any, ix: number) => {
          tipContent.html(() => tipContentFn(bins, ix, d.data.count));
          tip.fx.in(tipContainer);
        })

        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer));

      path.merge(path);
      path.transition()
        .duration(500)
        .attrTween('d', arcTween(arc));

      if (labels.display) {

        const texts = container.append('text')
          .attr('class', 'label')
          .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
          .attr('dy', '0.35em')
          .text((d, ix) => labels.displayFn(d, ix));
      }
      path.exit().remove();
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },
  };

  return PieChartD3;
});

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(arc) {
  return function (d) {
    const i = d3.interpolate(this._current, d);
    this._current = i(0);
    return function (t) {
      return arc(i(t));
    };
  };
}
