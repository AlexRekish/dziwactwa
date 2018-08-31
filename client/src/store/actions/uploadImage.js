export const UploadImageAction = {
  SELECT_IMAGE: 'SELECT_IMAGE',
  INIT_UPLOAD_IMAGE: 'INIT_UPLOAD_IMAGE',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  CLEAR_IMAGE: 'CLEAR_IMAGE'
};

const getUploadImageActions = () => ({
  startEditPost: photo => ({ type: UploadImageAction.START_EDIT_POST, photo }),
  endEditPost: () => ({ type: UploadImageAction.END_EDIT_POST }),
  selectImage: (dataURL, selectedImage) => ({
    type: UploadImageAction.SELECT_IMAGE,
    dataURL,
    selectedImage
  }),
  initUploadImage: selectedImage => ({
    type: UploadImageAction.INIT_UPLOAD_IMAGE,
    selectedImage
  }),
  uploadImage: photo => ({ type: UploadImageAction.UPLOAD_IMAGE, photo }),
  clearImage: () => ({ type: UploadImageAction.CLEAR_IMAGE })
});

export default getUploadImageActions;
