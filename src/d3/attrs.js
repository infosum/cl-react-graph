// @flow
import type {D3Selection} from '../../types';
/**
 * Apply style object to a d3 selection
 * @param {Object} selection D3 selection
 * @param {Object} style Css styling
 * @return {Object} selection
 */
export default (selection: D3Selection, style: Object): D3Selection => {
  Object.keys(style).forEach((k: string) => {
    selection.attr(k, style[k]);
  });
  return selection;
};
