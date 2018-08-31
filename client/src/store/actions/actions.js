import getAuthActions, { AuthAction } from './auth';
import getUploadImageActions, { UploadImageAction } from './uploadImage';
import getDataLoadActions, { DataAction } from './dataLoad';
import getBlogActions, { BlogAction } from './blog';
import getUsersActions, { UsersAction } from './users';
import getGalleryActions, { GalleryAction } from './gallery';

const ActionType = {
  ...AuthAction,
  ...UploadImageAction,
  ...DataAction,
  ...BlogAction,
  ...UsersAction,
  ...GalleryAction
};

export const Actions = {
  ...getAuthActions(),
  ...getUploadImageActions(),
  ...getDataLoadActions(),
  ...getBlogActions(),
  ...getUsersActions(),
  ...getGalleryActions()
};

export default ActionType;
