import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PaginationNormalItem from './PaginationNormalItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<PaginatonNormalItem />', () => {
  let wrapper;
  const onPageChanged = () => {};
  beforeEach(() => {
    wrapper = shallow(
      <PaginationNormalItem page={5} currentPage={5} onPageChanged={onPageChanged} label={5} />
    );
  });

  it('should render <PaginatonNormalItem /> with pagination__link--active class if page === currentPage', () => {
    expect(wrapper.find('.pagination__link').hasClass('pagination__link--active')).toEqual(true);
  });

  it('should render <PaginatonNormalItem /> without pagination__link--active class if page !== currentPage', () => {
    wrapper.setProps({ currentPage: 6 });
    expect(wrapper.find('.pagination__link').hasClass('pagination__link--active')).toEqual(false);
  });
});
