export const GalleryAction = {
  START_LOAD_IMAGES: 'START_LOAD_IMAGES',
  LOAD_IMAGES_SUCCEED: 'LOAD_IMAGES_SUCCEED',
  LOAD_IMAGES_FAILED: 'LOAD_IMAGES_FAILED',

  START_ADD_IMAGE: 'START_ADD_IMAGE',

  START_DELETE_IMAGE: 'START_DELETE_IMAGE',
  DELETE_IMAGE_SUCCEED: 'DELETE_IMAGE_SUCCEED',
  DELETE_IMAGE_FAILED: 'DELETE_IMAGE_FAILED',

  OPEN_LIGHTBOX: 'OPEN_LIGHTBOX',
  CLOSE_LIGHTBOX: 'CLOSE_LIGHTBOX',
  NEXT_IMAGE: 'NEXT_IMAGE',
  PREV_IMAGE: 'PREV_IMAGE',

  FILTER_IMAGE: 'FILTER_IMAGE'
};

const getGalleryActions = () => ({
  startLoadImages: () => ({ type: GalleryAction.START_LOAD_IMAGES }),
  loadImagesSucceed: images => ({ type: GalleryAction.LOAD_IMAGES_SUCCEED, images }),
  loadImagesFailed: err => ({ type: GalleryAction.LOAD_IMAGES_FAILED, err }),

  startDeleteImage: (id, index, user) => ({
    type: GalleryAction.START_DELETE_IMAGE,
    id,
    index,
    user
  }),
  deleteImageSucceed: id => ({ type: GalleryAction.DELETE_IMAGE_SUCCEED, id }),
  deleteImageFailed: err => ({ type: GalleryAction.START_DELETE_IMAGE, err }),

  startAddImage: (image, history, user) => ({
    type: GalleryAction.START_ADD_IMAGE,
    image,
    history,
    user
  }),

  openLightBox: index => ({
    type: GalleryAction.OPEN_LIGHTBOX,
    index
  }),
  closeLightBox: () => ({ type: GalleryAction.CLOSE_LIGHTBOX }),
  nextImage: () => ({ type: GalleryAction.NEXT_IMAGE }),
  prevImage: () => ({ type: GalleryAction.PREV_IMAGE }),
  filterImage: filteredImages => ({ type: GalleryAction.FILTER_IMAGE, filteredImages })
});

export default getGalleryActions;
