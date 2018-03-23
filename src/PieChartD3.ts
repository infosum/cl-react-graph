/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import merge from 'deepmerge';
import * as textWidth from 'text-width';
import colorScheme from './colors';

export const pieChartD3 = ((): IChartAdaptor => {

  let svg;
  let arc;
  let path;
  let pie;

  const defaultProps = {
    className: 'piechart-d3',
    colorScheme,
    data: [],
    donutWidth: 0,
    height: 200,
    labels: {
      display: true,
    },
    legend: {
      display: false,
    },
    margin: {
      left: 10,
      top: 10,
    },
    width: 200,
  };

  const PieChartD3 = {

    create(el: HTMLElement, props = {}) {
      this.props = merge(defaultProps, props);
      this.selectedBins = Array(this.props.data.bins.length).fill(true);
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
    },

    update(el: HTMLElement, props: IHistogramChartState) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      if (!this.props.data.bins) {
        return;
      }

      this.drawCharts();
    },

    legendWidth() {
      const { legend, data } = this.props;
      const { rectSize = 10, spacing = 4 } = legend;
      if (!legend.display) {
        return 0;
      }
      const horz = -2 * rectSize;
      const longest = data.bins.reduce((prev, next) => next.length > prev.length ? next : prev, '');
      return textWidth(longest, {
        family: 'Arial',
        size: 12,
      }) - horz;
    },

    outerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;

      const radius = Math.min(width, height) / 2 - this.legendWidth();
      return donutWidth === 0
        ? radius - 10
        : radius - 10 - (setIndex * (donutWidth + 10));
    },

    innerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = this.props;
      const radius = Math.min(width, height) / 2 - this.legendWidth();
      return donutWidth === 0
        ? 0
        : radius - 10 - donutWidth - (setIndex * (donutWidth + 10));
    },

    drawLegend() {
      if (!this.props.legend.display) {
        return;
      }
      const { data, width } = this.props;
      const { rectSize = 10, spacing = 4, fontSize = '12px' } = this.props.legend;
      const colors = d3.scaleOrdinal(this.props.colorScheme);

      const x = this.outerRadius(0);
      const legend = svg.selectAll('.legend')
        .data(this.props.data.bins)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          const height = rectSize + spacing;
          const offset = height * colors.domain().length / 2;

          const vert = i * height - offset;
          return 'translate(' + (width - this.legendWidth()) + ',' + vert + ')';
        });

      const selectedBins = this.selectedBins;
      legend.append('rect')
        .attr('width', rectSize)
        .attr('height', rectSize)
        .style('fill', colors)
        .attr('class', '')
        .style('stroke-width', 2)
        .on('click', function (label) {
          const rect = d3.select(this);
          const enabled = rect.attr('class') === 'disabled';
          rect.attr('class', enabled ? '' : 'disabled');

          pie.value(function (d) {
            if (d.label === label) { d.enabled = enabled; }
            return (d.enabled) ? d.count : 0;
          });

          path = path.data(pie); // compute the new angles
          path.transition().duration(750).attrTween('d', arcTween(arc)); // redraw the arcs
        })

        .style('stroke', colors);

      legend.append('text')
        .style('font-size', fontSize)
        .attr('x', rectSize + spacing)
        .attr('y', rectSize - spacing)
        .text((d) => d);
    },

    drawCharts() {
      const { data } = this.props;
      this.drawLegend();
      this.visible = {};
      data.bins.forEach((bin) => {
        this.visible[bin] = true;
      });
      this.dataSets = data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data.map((count, i) => ({
          count,
          enabled: true,
          label: data.bins[i],
          nextCount: Math.random() * 100,
        }));
      });
      this.dataSets.forEach((dataSet) => this.drawChart(dataSet));
    },

    drawChart(data) {
      console.log('drawChart', data);

      const outerRadius = 100;
      const innerRadius = 80;

      // Function to calculate pie chart paths from data
      pie = d3
        .pie()
        .sort(null)
        .value((d: any) => {
          return d.count;
        });

      // Formated pie chart arcs based on current data
      const arcs = pie(data);

      const color = d3.scaleOrdinal(this.props.colorScheme);
      arc = d3.arc()
        .outerRadius(this.outerRadius())
        .innerRadius(this.innerRadius());

      path = svg.datum(data).selectAll('path')
        .data(pie)
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('transform', 'translate(' + outerRadius + ', ' + outerRadius + ')')
        .append('path')
        .attr('fill', function (d, i) { return color(i); })
        .attr('d', arc)
        .each(function (d) { this._current = d; }); // store the initial angles

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
