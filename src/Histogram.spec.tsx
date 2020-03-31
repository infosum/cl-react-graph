import { expect } from 'chai';
import Enzyme, {
  mount,
  ReactWrapper,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Histogram, {
  IHistogramData,
  IHistogramProps,
} from './Histogram';

Enzyme.configure({ adapter: new Adapter() });
let component: ReactWrapper;

export const data: IHistogramData = {
  bins: ['Female', 'Male', 'Other', 'sdfdfg', 'dagdsg', 'sfsd', 'ds34fsdf', 'dfsfsd', 'sdfs34dfs', 'ghf34hfg', 'fd33gag', 'jg343hj', 'a343wes', 'ye343ye', 'fd343gjs', 'sdfd343fg', '34', 'sfsd', '433', '45245', '745'],
  counts: [
    {
      data: [58483, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300, 79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [54932, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000, 60000, 34230, 10000],
      label: 'Filtered',
    },
  ]
}

const props: Partial<IHistogramProps> = {
  bar: {
    grouped: {
      paddingInner: 0.1,
      paddingOuter: 0,
    },
    paddingInner: 0.1,
    paddingOuter: 0,
    overlayMargin: 5,
    hover: {
      lighten: 0.1,
    },
  },
  data,
  delay: 0,
  duration: 800,
  width: '600',
};

describe('Histogram', () => {

  beforeEach(() => {
    component = mount(
      <Histogram {...props} />
      ,
    );
  });

  it('renders a Histogram', () => {
    expect(component.find('div')).to.have.length(1);
  });

});
