import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal';

Enzyme.configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  let wrapper;
  const visible = { visibility: 'visible', opacity: 1 };
  const hidden = { visibility: 'hidden', opacity: 0 };
  const confirm = () => {};
  const decline = () => {};

  beforeEach(() => {
    wrapper = shallow(<Modal isOpen confirm={confirm} decline={decline} />)
      .first()
      .shallow();
  });

  it('should render <Modal /> if isOpen prop is true', () => {
    expect(wrapper.find('.modal').props().style).toEqual(visible);
  });

  it('shouldn`t render <Modal /> if isOpen prop is false', () => {
    wrapper.setProps({ isOpen: false });
    expect(wrapper.find('.modal').props().style).toEqual(hidden);
  });
});
