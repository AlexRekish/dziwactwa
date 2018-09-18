import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ComplexPagination from './ComplexPagination/ComplexPagination';
import SimplePagination from './SimplePagination/SimplePagination';
import Pagination from './Pagination';

Enzyme.configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let wrapper;
  const onPageChanged = () => {};

  beforeEach(() => {
    wrapper = shallow(
      <Pagination itemCount={20} pageSize={5} onPageChanged={onPageChanged} currentPage={1} />
    )
      .first()
      .shallow();
  });

  it('shouldn`t render Pagination if itemCount / pageSize === 1', () => {
    wrapper.setProps({ itemCount: 5 });
    expect(wrapper.find('.pagination')).toHaveLength(0);
  });

  it('should render Pagination if itemCount / pageSize > 1', () => {
    expect(wrapper.find('.pagination')).toHaveLength(1);
  });

  it('should render ComplexPagination if itemCount / pageSize > 7', () => {
    wrapper.setProps({ itemCount: 40 });
    expect(wrapper.find(ComplexPagination)).toHaveLength(1);
  });

  it('shouldn`t render SimplePagination if itemCount / pageSize > 7', () => {
    wrapper.setProps({ itemCount: 40 });
    expect(wrapper.find(SimplePagination)).toHaveLength(0);
  });

  it('shouldn`t render ComplexPagination if itemCount / pageSize <= 7', () => {
    expect(wrapper.find(ComplexPagination)).toHaveLength(0);
  });

  it('should render SimplePagination if itemCount / pageSize <= 7', () => {
    expect(wrapper.find(SimplePagination)).toHaveLength(1);
  });
});
