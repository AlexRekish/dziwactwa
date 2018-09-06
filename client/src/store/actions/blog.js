export const BlogAction = {
  START_LOAD_POSTS: 'START_LOAD_POSTS',
  LOAD_POSTS_SUCCEED: 'LOAD_POSTS_SUCCEED',
  LOAD_POSTS_FAILED: 'LOAD_POSTS_FAILED',

  START_LOAD_POST: 'START_LOAD_POST',
  LOAD_POST_SUCCEED: 'LOAD_POST_SUCCEED',
  LOAD_POST_FAILED: 'LOAD_POST_FAILED',

  START_DELETE_POST: 'START_DELETE_POST',
  DELETE_POST_SUCCEED: 'DELETE_POST_SUCCEED',
  DELETE_POST_FAILED: 'DELETE_POST_FAILED',

  START_ADD_POST: 'START_ADD_POST',

  START_EDIT_POST: 'START_EDIT_POST',
  EDIT_POST: 'EDIT_POST',
  END_EDIT_POST: 'END_EDIT_POST'
};

const getBlogActions = () => ({
  startLoadPosts: () => ({ type: BlogAction.START_LOAD_POSTS }),
  loadPostsSucceed: posts => ({ type: BlogAction.LOAD_POSTS_SUCCEED, posts }),
  loadPostsFailed: err => ({ type: BlogAction.LOAD_POSTS_FAILED, err }),
  startLoadPost: (id, history) => ({ type: BlogAction.START_LOAD_POST, id, history }),
  loadPostSucceed: post => ({ type: BlogAction.LOAD_POST_SUCCEED, post }),
  loadPostFailed: err => ({ type: BlogAction.LOAD_POST_FAILED, err }),
  startDeletePost: (id, history, user) => ({
    type: BlogAction.START_DELETE_POST,
    id,
    history,
    user
  }),
  deletePostSucceed: () => ({ type: BlogAction.DELETE_POST_SUCCEED }),
  deletePostFailed: err => ({ type: BlogAction.START_DELETE_POST, err }),
  startAddPost: (post, history, user) => ({ type: BlogAction.START_ADD_POST, post, history, user }),
  startEditPost: photo => ({ type: BlogAction.START_EDIT_POST, photo }),
  endEditPost: () => ({ type: BlogAction.END_EDIT_POST }),
  editPost: (id, post, history, user) => ({ type: BlogAction.EDIT_POST, id, post, history, user })
});

export default getBlogActions;
