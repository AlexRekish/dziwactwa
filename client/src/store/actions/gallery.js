const getGalleryActions = actionTypes => ({
  startLoadImages: () => ({ type: actionTypes.START_LOAD_IMAGES }),
  loadImagesSucceed: images => ({ type: actionTypes.LOAD_IMAGES_SUCCEED, images }),
  loadImagesFailed: err => ({ type: actionTypes.LOAD_IMAGES_FAILED, err }),

  startDeleteImage: (id, index) => ({ type: actionTypes.START_DELETE_IMAGE, id, index }),
  deleteImageSucceed: id => ({ type: actionTypes.DELETE_IMAGE_SUCCEED, id }),
  deleteImageFailed: err => ({ type: actionTypes.START_DELETE_IMAGE, err }),

  startAddImage: (image, history) => ({ type: actionTypes.START_ADD_IMAGE, image, history }),

  openLightBox: index => ({ type: actionTypes.OPEN_LIGHTBOX, index }),
  closeLightBox: () => ({ type: actionTypes.CLOSE_LIGHTBOX }),
  nextImage: () => ({ type: actionTypes.NEXT_IMAGE }),
  prevImage: () => ({ type: actionTypes.PREV_IMAGE })
});

export default getGalleryActions;
