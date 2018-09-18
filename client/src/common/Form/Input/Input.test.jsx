import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from './Input';

Enzyme.configure({ adapter: new Adapter() });

describe('<Input />', () => {
  let wrapper;
  const error = 'Some error message';
  const errorStyle = { visibility: 'hidden' };
  const inputErrorStyle = {
    borderColor: 'rgb(213, 0, 0)',
    backgroundColor: 'rgba(250, 128, 114, 0.5)'
  };
  const onChange = () => {};

  beforeEach(() => {
    wrapper = shallow(
      <Input
        name="test"
        label="Test"
        onChange={onChange}
        value="test"
        placeholder="Test"
        type="text"
        error={error}
      />
    )
      .first()
      .shallow();
  });

  it('should render input with error message if error prop is provided', () => {
    expect(wrapper.contains(<small className="custom-input__error">{error}</small>)).toEqual(true);
  });

  it('should render input without error message if error prop is not provided', () => {
    wrapper.setProps({ error: '' });
    expect(
      wrapper.contains(
        <small className="custom-input__error" style={errorStyle}>
          No error :)
        </small>
      )
    ).toEqual(true);
  });

  it('should render input with inputErrorStyle if error prop is provided', () => {
    const input = wrapper.find('.custom-input');
    expect(input.props().style).toEqual(inputErrorStyle);
  });

  it('should render input without error style if error prop is not provided', () => {
    wrapper.setProps({ error: '' });
    const input = wrapper.find('.custom-input');
    expect(input.props().style).toBeNull();
  });
});
