import React from 'react';
import { shallow } from 'enzyme';

// Component
import GalleryPage from './GalleryPage';

function setup() {
  const wrapper = shallow(<GalleryPage />);
  return { wrapper };
}

describe('GalleryPage', () => {
  it('Should render', () => {
    const { wrapper } = setup();
    expect(wrapper.children()).toHaveLength(3);
  });
  it('Should have title', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h2')).toHaveLength(1);
  });
  it('Should have Photos', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Photos')).toHaveLength(1);
  });
  it('Should have Footer', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
