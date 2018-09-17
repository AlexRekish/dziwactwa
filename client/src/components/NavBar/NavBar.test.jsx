import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './NavBar';
import NavItem from './NavItem/NavItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  let wrapper;
  const clicked = () => {};

  beforeEach(() => {
    wrapper = shallow(<NavBar open clicked={clicked} user={null} />)
      .first()
      .shallow();
  });

  it('should render 5 <NavItem />', () => {
    expect(wrapper.find(NavItem)).toHaveLength(5);
  });

  it('should render nav with "main-navigation--open" class if open prop is provided', () => {
    expect(wrapper.find('.main-navigation').hasClass('main-navigation--open')).toEqual(true);
  });

  it('should render nav without "main-navigation--open" class if open prop is not provided', () => {
    wrapper.setProps({ open: false });
    expect(wrapper.find('.main-navigation').hasClass('main-navigation--open')).toEqual(false);
  });

  it('should render login NavItem if user prop is not provided', () => {
    const login = wrapper.find('.main-navigation__login');
    expect(login.contains(<NavItem path="/login" label="Sign In" clicked={clicked} />)).toEqual(
      true
    );
  });

  it('should render logout NavItem if user prop is provided', () => {
    wrapper.setProps({ user: true });
    const login = wrapper.find('.main-navigation__login');
    expect(login.contains(<NavItem path="/logout" label="Logout" clicked={clicked} />)).toEqual(
      true
    );
  });
});
