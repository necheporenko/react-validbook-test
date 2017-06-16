import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import { upload as uploadUserCover } from '../../redux/modules/user';
import './index.scss';
import coverBook from '../../img/Default/cover-book.png';


@connect((state) => ({
  // bookTreeArr: state.book.bookTreeArr,
}), {
  uploadUserCover
})

export default class ChangeCoverImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      file: '',
      coverBook: coverBook,
      scale: 1.2,
      rotate: 0,
      border: 0,
      preview: null,
      width: 1920,
      height: 235,
      picture: 'http://devianmbanks.validbook.org/cdn/stories_images/713/original.jpg',
      test: '',
      // qwerty,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  Close() {
    this.props.showPopUp(false, '');
  }
  Open() {
    this.props.showPopUp(true);
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        coverBook: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSave() {
    const newImage = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      test: newImage,
    });
    this.props.updateUserCover(newImage);
    this.props.uploadUserCover(newImage);
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  render() {
    const visible = this.props.visible;
    const currentImage = this.props.currentImage;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Edit cover image USEER</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              {/*<img src={coverBook} alt=""/>*/}
              <AvatarEditor
                ref={this.setEditorRef}
                image={currentImage}
                width={1920}
                height={235}
                border={0}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={parseFloat(this.state.scale)}
                rotate={0}
                onSave={this.handleSave}
              />
            </div>

            Zoom:
            <br />
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit" onClick={this.handleSave}>Crop and Save</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

ChangeCoverImage.propTypes = {

};
