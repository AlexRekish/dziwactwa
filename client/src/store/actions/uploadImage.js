import uploadImage, { validateFileType } from '../../services/uploadImageService';
import http from '../../services/httpService';

const getUploadImageActions = actionTypes => ({
  startEditPost: photo => ({ type: actionTypes.START_EDIT_POST, photo }),
  endEditPost: () => ({ type: actionTypes.END_EDIT_POST }),
  selectImage: (evt, file) => dispatch => {
    const selectedImage = file || evt.target.files[0];
    if (validateFileType(selectedImage)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        dispatch({ type: actionTypes.SELECT_IMAGE, dataURL: reader.result, selectedImage });
      });
      reader.readAsDataURL(selectedImage);
    } else return http.error(null, 'Wrong file type');
  },
  uploadImage: (evt, selectedImage) => async dispatch => {
    evt.preventDefault();
    if (!validateFileType(selectedImage)) return;
    try {
      const { data: link } = await uploadImage(selectedImage);
      dispatch({ type: actionTypes.UPLOAD_IMAGE, photo: link });
    } catch (err) {
      http.error(err);
    }
  },
  clearImage: () => ({ type: actionTypes.CLEAR_IMAGE })
});

export default getUploadImageActions;
