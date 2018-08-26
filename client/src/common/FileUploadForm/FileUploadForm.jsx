import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Actions } from '../../store/actions/actions';
import Button from '../Button/Button';
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

  render() {
    const {
      selectedImage,
      photo,
      dataURL,
      onClearImage,
      onSelectImage,
      onUploadImage
    } = this.props;
    const { focus } = this.state;
    return (
      <form onSubmit={evt => onUploadImage(evt, selectedImage)} className="file-upload">
        <input
          id="file-upload"
          type="file"
          onChange={evt => onSelectImage(evt)}
          onFocus={this.inputFocusHandler}
          onBlur={this.inputBlurHandler}
          name="image"
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
        >
          <div className="file-upload__background-decorator">
            <FontAwesomeIcon icon={['far', `plus-square`]} />
          </div>
        </label>
        <div className="file-upload__buttons-wrapper">
          <Button
            type="submit"
            label="Upload image"
            clicked={evt => onUploadImage(evt, selectedImage)}
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
  dataURL: state.uploadImage.dataURL,
  imageLoaded: state.uploadImage.imageLoaded
});

const mapDispatchToProps = dispatch => ({
  onSelectImage: evt => dispatch(Actions.selectImage(evt)),
  onUploadImage: (evt, selectedImage) => dispatch(Actions.uploadImage(evt, selectedImage)),
  onClearImage: () => dispatch(Actions.clearImage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadForm);
