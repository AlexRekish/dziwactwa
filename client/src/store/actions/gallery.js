const getGalleryActions = actionTypes => ({
  startLoadImages: () => ({ type: actionTypes.START_LOAD_IMAGES }),
  loadImagesSucceed: images => ({ type: actionTypes.LOAD_IMAGES_SUCCEED, images }),
  loadImagesFailed: err => ({ type: actionTypes.LOAD_IMAGES_FAILED, err }),
  startDeleteImage: id => ({ type: actionTypes.START_DELETE_IMAGE, id }),
  deleteImageSucceed: id => ({ type: actionTypes.DELETE_IMAGE_SUCCEED, id }),
  deleteImageFailed: err => ({ type: actionTypes.START_DELETE_IMAGE, err }),
  startAddImage: (image, history) => ({ type: actionTypes.START_ADD_IMAGE, image, history })
});

export default getGalleryActions;
