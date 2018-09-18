import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PaginationControlItem from './PaginationControlItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<PaginationControlItem />', () => {
  let wrapper;
  const onPageChanged = () => {};
  beforeEach(() => {
    wrapper = shallow(
      <PaginationControlItem page={5} currentPage={5} label="prev" onPageChanged={onPageChanged} />
    );
  });

  it('should render disabled PaginationControlItem if currentPage === page', () => {
    expect(wrapper.find('.pagination__link').props().disabled).toEqual(true);
  });

  it('should render enabled PaginationControlItem if currentPage !== page', () => {
    wrapper.setProps({ page: 6 });
    expect(wrapper.find('.pagination__link').props().disabled).toEqual(false);
  });
});
