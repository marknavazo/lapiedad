import React from 'react';
import { shallow } from 'enzyme';

// Component
import ContactPage from './ContactPage';

function setup() {
  const wrapper = shallow(<ContactPage />);
  return { wrapper };
}

describe('ContactPage', () => {
  it('Should render', () => {
    const { wrapper } = setup();
    expect(wrapper.children()).toHaveLength(3);
  });
  it('Should call onHandleChangeForm & update form state', () => {
    const { wrapper } = setup();
    const event = {
      target: { name: 'username', value: 'testvalue' },
    };
    wrapper.instance().onHandleChangeForm(event);
    wrapper.update();
    expect(wrapper.state().form.username).toBe('testvalue');
  });
  it('Should do nothing when empty form submit', () => {
    const { wrapper } = setup();
    const event = { preventDefault: jest.fn() };
    wrapper.instance().onHandleSubmitForm(event);
    wrapper.update();
    expect(wrapper.state().isLoading).toBe(false);
  });
  it('Should have title', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h2')).toHaveLength(1);
  });
  it('Should have Footer', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
