import 'd3-transition';

import { interpolate } from 'd3-interpolate';
import { scaleOrdinal } from 'd3-scale';
import {
  select,
  Selection,
} from 'd3-selection';
import {
  arc,
  Arc,
  pie,
  PieArcDatum,
} from 'd3-shape';
import merge from 'deepmerge';
import get from 'lodash.get';
import { string } from 'prop-types';

import colorScheme from './colors';
import {
  IChartAdaptor,
  IHistogramDataSet,
} from './Histogram';
import {
  IPieChartProps,
  IPieDataItem,
} from './PieChart';
import tips, { makeTip } from './tip';

interface IPieDataset {
  count: number;
  groupLabel: string;
  label: string;
}

export const pieChartD3 = ((): IChartAdaptor<IPieChartProps> => {

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
      bottom: 0,
      left: 10,
      right: 0,
      top: 10,
    },
    tip: tips,
    tipContainer: 'body',
    tipContentFn: (bins: string[], i: number, d: number, groupLabel): string => {
      return groupLabel + ': ' + bins[i] + '<br />' + d;
    },
    visible: {},
    width: 200,
  };

  let containers: any[];
  let props: IPieChartProps;
  let svg: Selection<any, any, any, any>;
  let dataSets: IPieDataset[][];
  let previousData: any;
  let current: any;
  let storedWidth: number;
  let storedHeight: number;

  const PieChartD3 = {

    create(el: Element, newProps: Partial<IPieChartProps> = {}) {
      props = merge(defaultProps, newProps);
      previousData = props.data.counts.map((set: IHistogramDataSet, setIndex: number) => {
        return set.data
          .map((count, i) => ({
            count,
            groupLabel: set.label,
            label: props.data.bins[i],
          }));
      });
      this._makeSvg(el);
      containers = [];
      previousData.forEach((dataSet, i) => {
        this.drawChartBg(props.data, i);
      });

      this.update(el, props);
    },

    _makeSvg(el: Element) {
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

      const r = makeTip(props.tipContainer, tipContainer);
      tipContent = r.tipContent;
      tipContainer = r.tipContainer;
    },

    update(el: Element, newProps: Partial<IPieChartProps>) {
      if (!props.data) {
        return;
      }
      props = merge(defaultProps, newProps);
      if (props.colorScheme) {
        props.colorScheme = props.colorScheme;
      }
      if (!props.data.bins) {
        return;
      }

      this.drawCharts();
    },

    outerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = props;

      const radius = Math.min(Number(width), height) / 2;
      return donutWidth === 0
        ? radius - 10
        : radius - 10 - (setIndex * (donutWidth + 10));
    },

    innerRadius(setIndex = 0) {
      const { donutWidth = 0, width, height } = props;
      const radius = Math.min(Number(width), height) / 2;
      return donutWidth === 0
        ? 0
        : radius - 10 - donutWidth - (setIndex * (donutWidth + 10));
    },

    drawCharts() {
      const { data, visible } = props;
      dataSets = data.counts.map((set: IHistogramDataSet) => {
        return set.data
          .map((count, i) => ({
            count: visible[data.bins[i]] !== false ? count : 0,
            groupLabel: set.label,
            label: data.bins[i],
          }));
      });

      dataSets.forEach((dataSet, i) => {
        const theme = get(data.counts[i], 'colors', props.colorScheme);
        this.drawChart(dataSet, i, data.bins, theme);
      });
      previousData = dataSets;
    },

    drawChartBg(data, i) {
      const { backgroundColor, width, height } = props;
      const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);
      const bgArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(tau);
      const container = svg
        .append('g')
        .attr('class', 'pie-bg');
      const background = container.append('path')
        .attr('class', 'pie-background')
        .style('fill', backgroundColor);
      background.enter()
        .attr('transform', 'translate(' + Number(width) / 2 + ',' + height / 2 + ')')
        .attr('d', bgArc);

      background.merge(background);

      if (!containers[i]) {
        containers[i] = svg
          .append('g')
          .attr('class', 'pie-container');
      }
    },

    drawChart(data, i: number, bins: string[], theme: string[]) {
      const { labels, width, height, tip, tipContentFn } = props;
      // Stack multiple charts in concentric circles
      const outerRadius = this.outerRadius(i);
      const innerRadius = this.innerRadius(i);

      // Function to calculate pie chart paths from data
      const thisPie = pie()
        .sort(null)
        .value((d: any) => d.count);

      // Formated pie chart arcs based on previous current data
      const arcs = thisPie(previousData[i]);

      const colors = scaleOrdinal(theme);

      const thisArc = arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const path = containers[i].selectAll('path')
        .data(thisPie(data));

      const g = path.enter().append('g')
        .attr('class', 'arc');

      g.append('path')
        .attr('transform', 'translate(' + Number(width) / 2 + ',' + height / 2 + ')')
        .attr('stroke', '#FFF')
        .attr('fill', (d, j) => colors(j))

        .each((d, j) => { current = arcs[j]; }) // store the initial angles
        .attr('d', thisArc)
        .on('mouseover', (d: PieArcDatum<IPieDataItem>, ix: number) => {
          tipContent.html(() => tipContentFn(bins, ix, d.data.count, d.data.groupLabel));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .style('opacity', 0)
        .transition()
        .duration(500)
        .style('opacity', 1);

      // Fade in when adding (merge)
      path
        .merge(path)

        .on('mouseover', (d: PieArcDatum<IPieDataItem>, ix: number) => {
          tipContent.html(() => tipContentFn(bins, ix, d.data.count, d.data.groupLabel));
          tip.fx.in(tipContainer);
        })
        .on('mousemove', () => tip.fx.move(tipContainer))
        .on('mouseout', () => tip.fx.out(tipContainer))
        .transition()
        .delay(400)
        .duration(500)
        .attr('fill', (d, j) => colors(j))
        .attrTween('d', arcTween(thisArc));

      const path2 = containers[i].selectAll('text.label')
        .data(thisPie(data));
      const gLabel = path2.enter().append('text')
        .attr('class', 'label')
        .each(() => {
          // Store initial offset incase we change chart heights.
          storedHeight = height;
          storedWidth = Number(width);
        })
        .attr('transform', (d) => {
          const centroid = thisArc.centroid(d);
          const x = centroid[0] + (storedWidth / 2);
          const y = centroid[1] + (storedHeight / 2);
          return 'translate(' + x + ',' + y + ')';
        })
        .each((d: any) => {
          // Store current value to work out fx transition opacities
          current = d;
        })
        .text((d, ix) => {
          if (d.value === 0) {
            return '';
          }
          return labels.displayFn(d, ix);
        });

      path2
        .merge(path2)
        .transition()
        .duration(500)
        .style('opacity', 0)
        .transition()
        .attr('transform', (d) => {
          const centroid = thisArc.centroid(d);
          const x = centroid[0] + (storedWidth / 2);
          const y = centroid[1] + (storedHeight / 2);
          return 'translate(' + x + ',' + y + ')';
        })
        .transition()
        .duration(500)
        .style('opacity', (d, ix, c) => {
          // Only show if the new value is not 0 and labels are set to be displayed
          return labels.display === false || d.data.count === 0 || c[ix]._current.value === 0 ? 0 : 1;
        });

      path2.exit().remove();

      path.exit().transition()
        .duration(500)
        .style('opacity', 0).remove();
    },

    /**
     * Any necessary clean up
     */
    destroy(el: Element) {
      svg.selectAll('svg > *').remove();
    },
  };

  return PieChartD3;
});

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(this: any, thisArc: Arc<any, any>) {
  return function (this: any, d) {
    const i = interpolate(this._current, d);
    this._current = i(0);
    return function (this: any, t) {
      return thisArc(i(t));
    };
  };
}
