import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextArea from './TextArea';

Enzyme.configure({ adapter: new Adapter() });

describe('<TextArea />', () => {
  let wrapper;
  const error = 'Some error message';
  const errorStyle = { visibility: 'hidden' };
  const taErrorStyle = {
    borderColor: 'rgb(213, 0, 0)',
    backgroundColor: 'rgba(250, 128, 114, 0.5)'
  };
  const onChange = () => {};

  beforeEach(() => {
    wrapper = shallow(
      <TextArea
        name="test"
        label="Test"
        onChange={onChange}
        value="test"
        placeholder="Test"
        error={error}
      />
    )
      .first()
      .shallow();
  });

  it('should render textarea with error message if error prop is provided', () => {
    expect(wrapper.contains(<small className="custom-text-area__error">{error}</small>)).toEqual(
      true
    );
  });

  it('should render textarea without error message if error prop is not provided', () => {
    wrapper.setProps({ error: '' });
    expect(
      wrapper.contains(
        <small className="custom-text-area__error" style={errorStyle}>
          No error :)
        </small>
      )
    ).toEqual(true);
  });

  it('should render textarea with taErrorStyle if error prop is provided', () => {
    const textarea = wrapper.find('.custom-text-area');
    expect(textarea.props().style).toEqual(taErrorStyle);
  });

  it('should render textarea without error style if error prop is not provided', () => {
    wrapper.setProps({ error: '' });
    const textarea = wrapper.find('.custom-text-area');
    expect(textarea.props().style).toBeNull();
  });
});
