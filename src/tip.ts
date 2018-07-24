import { event } from 'd3-selection';
import { select } from 'd3-selection';

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

export const makeTip = (selector, tipContainer): { tipContainer: any, tipContent: any } => {
  if (tipContainer) {
    // Chart could be rebuilt - remove old tip
    tipContainer.remove();
  }
  tipContainer = select(selector).append('div')
    .attr('class', 'tooltip top')
    .style('opacity', 0);

  tipContainer.append('div')
    .attr('class', 'tooltip-arrow');
  return {
    tipContainer,
    tipContent: tipContainer.append('div')
      .attr('class', 'tooltip-inner'),
  };
};
