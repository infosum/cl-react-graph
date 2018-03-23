/// <reference path="./interfaces.d.ts" />
import * as d3 from 'd3';
export default {
  fx: {
    in: (container) => {
      container.style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 55) + 'px');
      container.transition()
        .duration(200)
        .style('opacity', 0.9);
    },
    move: (container) => {
      container.style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 55) + 'px');
    },
    out: (container) => {
      container.transition()
        .duration(100)
        .style('opacity', 0);
    },
  },
};
