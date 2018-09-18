import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginForm } from '../containers/Auth/LoginForm/LoginForm';
import withFormBlueprint from './withFormBlueprint';

Enzyme.configure({ adapter: new Adapter() });

describe('withFormBlueprint HOC', () => {
  const WrappedForm = withFormBlueprint(LoginForm);
  const history = {};
  const onInitLogin = () => {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WrappedForm onInitLogin={onInitLogin} history={history} />);
  });

  it('should return FormComponent with provided by HOC props', () => {
    expect(wrapper.find(LoginForm).props().validate).toBeTruthy();
    expect(wrapper.find(LoginForm).props().validateProperty).toBeTruthy();
    expect(wrapper.find(LoginForm).props().renderInput).toBeTruthy();
    expect(wrapper.find(LoginForm).props().renderTextArea).toBeTruthy();
  });
});
