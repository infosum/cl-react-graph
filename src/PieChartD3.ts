/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
import merge from 'deepmerge';
import * as textWidth from 'text-width';
import colorScheme from './colors';

export const pieChartD3 = ((): IChartAdaptor => {

  const rings = [];
  let svg;
  let tipContainer;
  let tipContent;
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

  const tau = 2 * Math.PI;

  // Returns a tween for a transition’s "d" attribute, transitioning any selected
  // arcs from their current angle to the specified new angle.
  function arcTween(arc) {

    // The function passed to attrTween is invoked for each selected element when
    // the transition starts, and for each element returns the interpolator to use
    // over the course of transition. This function is thus responsible for
    // determining the starting angle of the transition (which is pulled from the
    // element’s bound datum, d.endAngle), and the ending angle (simply the
    // newAngle argument to the enclosing function).
    return function (d) {
      console.log('d', d);
      // To interpolate between the two angles, we use the default d3.interpolate.
      // (Internally, this maps to d3.interpolateNumber, since both of the
      // arguments to d3.interpolate are numbers.) The returned function takes a
      // single argument t and returns a number between the starting angle and the
      // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
      // newAngle; and for 0 < t < 1 it returns an angle in-between.
      console.log('interpolate between', this._current, d.value);
      const interpolate = d3.interpolate(this._current, d.value);
      this._current = d.value;
      // The return value of the attrTween is also a function: the function that
      // we want to run for each tick of the transition. Because we used
      // attrTween("d"), the return value of this last function will be set to the
      // "d" attribute at every tick. (It’s also possible to use transition.tween
      // to run arbitrary code for every tick, say if you want to set multiple
      // attributes from a single function.) The argument t ranges from 0, at the
      // start of the transition, to 1, at the end.
      return function (t) {

        // Calculate the current arc angle based on the transition time, t. Since
        // the t for the transition and the t for the interpolate both range from
        // 0 to 1, we can pass t directly to the interpolator.
        //
        // Note that the interpolated angle is written into the element’s bound
        // data object! This is important: it means that if the transition were
        // interrupted, the data bound to the element would still be consistent
        // with its appearance. Whenever we start a new arc transition, the
        // correct starting angle can be inferred from the data.
        d.value = interpolate(t);
        //console.log(d.value, tmp);
        // Lastly, compute the arc path given the updated data! In effect, this
        // transition uses data-space interpolation: the data is interpolated
        // (that is, the end angle) rather than the path string itself.
        // Interpolating the angles in polar coordinates, rather than the raw path
        // string, produces valid intermediate arcs during the transition.
        console.log(arc(d));
        return arc(d);
      };
    };
  }

  const PieChartD3 = {

    create(el: HTMLElement, props = {}) {
      this.props = merge(defaultProps, props);
      this.selectedBins = Array(this.props.data.bins.length).fill(true);
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

    update(el: HTMLElement, props: IHistogramChartState) {
      if (!props.data) {
        return;
      }
      this.props = merge(defaultProps, props);
      this._makeSvg(el);
      if (!this.props.data.bins) {
        return;
      }

      this._drawChart(this.props.data);
    },

    /**
     * Any necessary clean up
     * @param {Element} el To remove
     */
    destroy(el: HTMLElement) {
      svg.selectAll('svg > *').remove();
    },

    _drawChart(data) {
      this.drawLegend();
      data.counts.forEach((set: IHistogramDataSet, setIndex: number) => {
        const dataSet = set.data.map((count, i) => ({
          count,
          enabled: true,
          label: data.bins[i],
        }));
        this.drawDataSet(data.bins, dataSet, setIndex, data.counts.length);
      });

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
          debugger;
          const rect = d3.select(this);
          let enabled = true;
          const totalEnabled = d3.sum(selectedBins.filter((d) => d));
          if (rect.attr('class') === 'disabled') {
            rect.attr('class', '');
          } else {
            if (totalEnabled < 2) { return; }
            rect.attr('class', 'disabled');
            enabled = false;
          }

          pie.value(function (d) {
            if (d.label === label) { d.enabled = enabled; }
            console.log('value', d.label, (d.enabled) ? d.count : 0);
            return (d.enabled) ? d.count : 0;
          });

          rings.forEach((ring) => {
            let { arc, path } = ring;

            // Redifine the path data base on if a value is disabled
            path = path.data(pie(ring.set));

            console.log('path', path);
            path.transition()
              .duration(750)
              .attrTween('d', arcTween(arc));
            // .attrTween('d', function (d) {
            //   console.log('interpolate =', this._current, d.value);
            //   const interpolate = d3.interpolate(this._current, d.value);
            //   this._current = interpolate(0);
            //   console.log('this._current', this._current);
            //   return (t) => {
            //     const r = arc(interpolate(t));
            //     console.log('interpolate', interpolate(t), r);
            //     return r;
            //   };
            // });
          });
        })

        .style('stroke', colors);

      legend.append('text')
        .style('font-size', fontSize)
        .attr('x', rectSize + spacing)
        .attr('y', rectSize - spacing)
        .text((d) => d);
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

    drawDataSet(
      bins: string[], set: [{ count: number, enabled: boolean, label: string }],
      setIndex: number, setCount: number,
    ) {
      const { donutWidth = 0, width, height, labels } = this.props;
      const radius = Math.min(width, height) / 2;
      const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      const colors = d3.scaleOrdinal(this.props.colorScheme);
      //    const borderColors = set.borderColors ? d3.scaleOrdinal(set.borderColors) : null;

      const innerRadius = this.innerRadius(setIndex);
      const outerRadius = this.outerRadius(setIndex);

      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      pie = d3.pie()
        .sort(null)
        .value((d: any) => {
          console.log('d', d);
          return d.count;
        });
      console.log('set', set);
      const group = g.selectAll('.arc')
        .data(pie(set))
        .enter().append('g')
        .attr('class', 'arc')
        .attr('stroke-width', 1)
        .attr('stroke', (d, i) => {
          // if (borderColors) {
          //   return borderColors(i);
          // }
        });
      // .each(function (d) {
      //   console.log('set current', d, d.value);
      //   this._current = d.value;
      // });

      const path = group.append('path')
        .attr('d', arc)
        .attr('fill', (d) => {
          return colors(d.data.count);
        })
        .each(function (d) {
          console.log('set current', d, d.value);
          this._current = d.value;
        });
      // .each(function (d) {
      //   console.log('current', this._current);
      // });

      // if (labels.display) {
      //   const label = d3.arc()
      //     .outerRadius(outerRadius)
      //     .innerRadius(innerRadius);

      //   path.append('text')
      //     .attr('transform', (d) => 'translate(' + label.centroid(d) + ')')
      //     .attr('dy', '0.35em')
      //     .text((d, i) => {
      //       return set[i].count;
      //     });
      // }

      rings.push({ arc, set, path });
      console.log('rings', rings);
    },
  };

  return PieChartD3;
});
