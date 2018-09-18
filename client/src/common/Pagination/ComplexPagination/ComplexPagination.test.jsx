import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ComplexPagination from './ComplexPagination';

Enzyme.configure({ adapter: new Adapter() });

describe('<ComplexPagination />', () => {
  let wrapper;
  const pages = [1, 2, 3, 4, 5];
  const onPageChanged = () => {};
  const currentPage = 3;

  beforeEach(() => {
    wrapper = shallow(
      <ComplexPagination pages={pages} currentPage={currentPage} onPageChanged={onPageChanged} />
    );
  });

  it('should render current page if currentPage > pages[0] && currentPage < pages[pages.length - 1]', () => {
    expect(
      wrapper.contains(
        <li className="pagination__item">
          <p className="pagination__current">{currentPage}</p>
        </li>
      )
    ).toEqual(true);
  });

  it('shouldn`t render current page if currentPage === pages[0] || currentPage === pages[pages.length - 1]', () => {
    wrapper.setProps({ currentPage: 1 });
    expect(
      wrapper.contains(
        <li className="pagination__item">
          <p className="pagination__current">{1}</p>
        </li>
      )
    ).toEqual(false);
  });

  it('should render ... if currentPage === pages[0] || currentPage === pages[pages.length - 1]', () => {
    wrapper.setProps({ currentPage: 1 });
    expect(
      wrapper.contains(
        <li className="pagination__item">
          <p className="pagination__current">...</p>
        </li>
      )
    ).toEqual(true);
  });
});
