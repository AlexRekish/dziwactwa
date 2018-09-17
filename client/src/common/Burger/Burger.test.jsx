import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from './Burger';

Enzyme.configure({ adapter: new Adapter() });

describe('<Burger />', () => {
  const clicked = () => {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Burger clicked={clicked} open={false} />)
      .first()
      .shallow();
  });

  it('should render button with "burger burger--open" classes if open prop === true', () => {
    wrapper.setProps({ open: true });
    expect(wrapper.find('.burger').hasClass('burger--open')).toEqual(true);
  });

  it('should render button with "burger" class if open prop === false', () => {
    expect(wrapper.find('.burger').hasClass('burger--open')).toEqual(false);
  });
});
