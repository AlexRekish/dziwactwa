const getBlogActions = actionTypes => ({
  startLoadPosts: () => ({ type: actionTypes.START_LOAD_POSTS }),
  loadPostsSucceed: posts => ({ type: actionTypes.LOAD_POSTS_SUCCEED, posts }),
  loadPostsFailed: err => ({ type: actionTypes.LOAD_POSTS_FAILED, err }),
  startLoadPost: (id, history) => ({ type: actionTypes.START_LOAD_POST, id, history }),
  loadPostSucceed: post => ({ type: actionTypes.LOAD_POST_SUCCEED, post }),
  loadPostFailed: err => ({ type: actionTypes.LOAD_POST_FAILED, err }),
  startDeletePost: (id, history) => ({ type: actionTypes.START_DELETE_POST, id, history }),
  deletePostSucceed: () => ({ type: actionTypes.DELETE_POST_SUCCEED }),
  deletePostFailed: err => ({ type: actionTypes.START_DELETE_POST, err }),
  startAddPost: (post, history) => ({ type: actionTypes.START_ADD_POST, post, history })
});

export default getBlogActions;
