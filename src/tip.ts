import { event } from 'd3-selection';

export default {
  fx: {
    in: (container) => {
      container.style('left', (event.pageX) + 'px')
        .style('top', (event.pageY - 55) + 'px');
      container.transition()
        .duration(200)
        .style('opacity', 0.9);
    },
    move: (container) => {
      container.style('left', (event.pageX) + 'px')
        .style('top', (event.pageY - 55) + 'px');
    },
    out: (container) => {
      container.transition()
        .duration(100)
        .style('opacity', 0);
    },
  },
};
