import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<Button />', () => {
  let wrapper;
  const clicked = () => {};

  beforeEach(() => {
    wrapper = shallow(<Button type="button" label="button" clicked={clicked} />)
      .first()
      .shallow();
  });

  it('should render disabled button if disabled prop is provided', () => {
    wrapper.setProps({ disabled: true });
    const button = wrapper.find('.custom-button');
    expect(button.props().disabled).toEqual(true);
  });

  it('should render button with "custom-button--danger" if danger prop is provided', () => {
    wrapper.setProps({ danger: true });
    expect(wrapper.find('.custom-button').hasClass('custom-button--danger')).toEqual(true);
  });

  it('should render button with "custom-button--confirm" if confirm prop is provided', () => {
    wrapper.setProps({ confirm: true });
    expect(wrapper.find('.custom-button').hasClass('custom-button--confirm')).toEqual(true);
  });
});
