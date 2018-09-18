import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BlogPost } from './BlogPost';
import Preloader from '../../../common/Preloader/Preloader';

Enzyme.configure({ adapter: new Adapter() });

describe('<BlogPost />', () => {
  let wrapper;
  const post = {
    _id: 1,
    photo: 'photo',
    title: 'title'
  };
  const user = {
    isAdmin: true
  };
  const anotherUser = {
    isAdmin: false
  };
  const onStartLoadPost = () => {};
  const match = {
    params: {
      id: 1
    }
  };
  const history = {};
  const visible = { opacity: 1 };
  const hidden = { opacity: 0 };

  beforeEach(() => {
    wrapper = shallow(
      <BlogPost
        user={user}
        post={post}
        dataLoading={false}
        onStartLoadPost={onStartLoadPost}
        match={match}
        history={history}
      />
    );
  });

  it('should render Preloader if dataLoading is true', () => {
    wrapper.setProps({ dataLoading: true });
    expect(wrapper.find(Preloader)).toHaveLength(1);
  });

  it('should render BlogPost if dataLoading is false', () => {
    expect(wrapper.find('.blog--post')).toHaveLength(1);
  });

  it('should show img if img loaded', () => {
    wrapper.setState({ loaded: true });
    expect(wrapper.find('.post__photo').props().style).toEqual(visible);
  });

  it('should hide img if img not loaded', () => {
    expect(wrapper.find('.post__photo').props().style).toEqual(hidden);
  });

  it('should render control-panel__button-wrapper if user exist && user.isAdmin === true', () => {
    expect(wrapper.find('.control-panel__button-wrapper')).toHaveLength(1);
  });

  it('shouldn`t render control-panel__button-wrapper if user.isAdmin !== true', () => {
    wrapper.setProps({ user: anotherUser });
    expect(wrapper.find('.control-panel__button-wrapper')).toHaveLength(0);
  });

  it('shouldn`t render control-panel__button-wrapper if user doesn`t exist', () => {
    wrapper.setProps({ user: null });
    expect(wrapper.find('.control-panel__button-wrapper')).toHaveLength(0);
  });
});
