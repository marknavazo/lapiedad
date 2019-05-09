import React from 'react';
import { shallow } from 'enzyme';

// Component
import HomePage from './HomePage';

function setup() {
  const wrapper = shallow(<HomePage />);
  return { wrapper };
}

describe('HomePage', () => {
  it('Should render', () => {
    const { wrapper } = setup();
    expect(wrapper.children()).toHaveLength(3);
  });
  it('Should have Title', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h2')).toHaveLength(1);
  });
  it('Should have Footer', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
