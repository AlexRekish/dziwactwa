import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Actions } from '../../store/actions/actions';
import Button from '../Button/Button';
import http from '../../services/httpService';
import { validateFileType } from '../../services/uploadImageService';
import './FileUploadForm.sass';

class FileUploadForm extends Component {
  state = {
    focus: false
  };

  inputFocusHandler = () => {
    this.setState({ focus: true });
  };

  inputBlurHandler = () => {
    this.setState({ focus: false });
  };

  dragEnterAndOverHandler = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.currentTarget.style.border = '5px solid #DD2C00';
    evt.currentTarget.style.opacity = '0.8';
  };

  dragLeaveHandler = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.currentTarget.style.border = '';
    evt.currentTarget.style.opacity = '';
  };

  dropHandler = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.currentTarget.style.border = '';
    evt.currentTarget.style.opacity = '';

    const dt = evt.dataTransfer;
    const file = dt.files[0];
    this.changeFileInputHandler(null, file);
  };

  changeFileInputHandler = (evt, file) => {
    const { onSelectImage } = this.props;
    const selectedImage = file || evt.target.files[0];
    if (validateFileType(selectedImage)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        onSelectImage(reader.result, selectedImage);
      });
      reader.readAsDataURL(selectedImage);
    } else http.error(null, 'Wrong file type');
  };

  uploadImageHandler = evt => {
    evt.preventDefault();
    const { selectedImage, onUploadImage } = this.props;
    if (!validateFileType(selectedImage)) return;
    onUploadImage(selectedImage);
  };

  render() {
    const { selectedImage, photo, dataURL, onClearImage } = this.props;
    const { focus } = this.state;
    return (
      <form onSubmit={this.uploadImageHandler} className="file-upload">
        <input
          id="file-upload"
          type="file"
          onChange={evt => this.changeFileInputHandler(evt)}
          onFocus={this.inputFocusHandler}
          onBlur={this.inputBlurHandler}
          name="image"
          accept="image/*"
          className={
            focus
              ? 'visually-hidden file-upload__input file-upload__input--focus'
              : 'visually-hidden file-upload__input'
          }
        />
        <label
          htmlFor="file-upload"
          className="file-upload__preview"
          style={{
            backgroundImage: `url(${photo || dataURL})`
          }}
          onDragEnter={this.dragEnterAndOverHandler}
          onDragOver={this.dragEnterAndOverHandler}
          onDragLeave={this.dragLeaveHandler}
          onDrop={this.dropHandler}
        >
          <div className="file-upload__background-decorator">
            <FontAwesomeIcon icon={['far', 'plus-square']} />
            <FontAwesomeIcon icon={['far', 'clone']} />
          </div>
        </label>
        <div className="file-upload__buttons-wrapper">
          <Button
            type="submit"
            label="Upload image"
            clicked={this.uploadImageHandler}
            disabled={!validateFileType(selectedImage)}
          />
          <Button type="reset" label="Clear image" clicked={onClearImage} />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.uploadImage.photo,
  selectedImage: state.uploadImage.selectedImage,
  dataURL: state.uploadImage.dataURL
});

const mapDispatchToProps = dispatch => ({
  onSelectImage: (dataURL, selectedImage) => dispatch(Actions.selectImage(dataURL, selectedImage)),
  onUploadImage: selectedImage => dispatch(Actions.initUploadImage(selectedImage)),
  onClearImage: () => dispatch(Actions.clearImage())
});

FileUploadForm.propTypes = {
  selectedImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  photo: PropTypes.string.isRequired,
  dataURL: PropTypes.string.isRequired,
  onClearImage: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  onUploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadForm);
