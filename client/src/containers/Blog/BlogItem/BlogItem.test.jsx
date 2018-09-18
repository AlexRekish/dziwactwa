import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BlogItem from './BlogItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<BlogItem />', () => {
  let wrapper;
  const visible = { opacity: 1 };
  const hidden = { opacity: 0 };
  const post = {
    _id: 1,
    photo: 'photo',
    title: 'title'
  };

  beforeEach(() => {
    wrapper = shallow(<BlogItem post={post} />);
  });

  it('should show img if img loaded', () => {
    wrapper.setState({ loaded: true });
    expect(wrapper.find('.blog__img').props().style).toEqual(visible);
  });

  it('should hide img if img not loaded', () => {
    expect(wrapper.find('.blog__img').props().style).toEqual(hidden);
  });
});
