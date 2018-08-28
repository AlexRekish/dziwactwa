const getUploadImageActions = actionTypes => ({
  startEditPost: photo => ({ type: actionTypes.START_EDIT_POST, photo }),
  endEditPost: () => ({ type: actionTypes.END_EDIT_POST }),
  selectImage: (dataURL, selectedImage) => ({
    type: actionTypes.SELECT_IMAGE,
    dataURL,
    selectedImage
  }),
  initUploadImage: selectedImage => ({
    type: actionTypes.INIT_UPLOAD_IMAGE,
    selectedImage
  }),
  uploadImage: photo => ({ type: actionTypes.UPLOAD_IMAGE, photo }),
  clearImage: () => ({ type: actionTypes.CLEAR_IMAGE })
});

export default getUploadImageActions;
