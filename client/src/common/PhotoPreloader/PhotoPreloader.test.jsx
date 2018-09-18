import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PhotoPreloader from './PhotoPreloader';

Enzyme.configure({ adapter: new Adapter() });

describe('<PhotoPreloader/>', () => {
  let wrapper;
  const visible = { opacity: 1, visibility: 'visible' };
  const hidden = { opacity: 0, visibility: 'hidden' };
  beforeEach(() => {
    wrapper = shallow(<PhotoPreloader loaded />)
      .first()
      .shallow();
  });

  it('should hide PhotoPreloader if loaded true', () => {
    expect(wrapper.find('.photo-preloader').props().style).toEqual(hidden);
  });

  it('should render PhotoPreloader if loaded false', () => {
    wrapper.setProps({ loaded: false });
    expect(wrapper.find('.photo-preloader').props().style).toEqual(visible);
  });
});
