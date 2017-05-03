import React, { Component, PropTypes } from 'react';
import { Form, Input, Select } from 'formsy-react-components';
import { Modal } from 'react-bootstrap';
import './index.scss';
import coverBook from '../../img/Default/cover-book.png';

//for test
const selectCountry = [
  {value: null, label: 'Select your country'},
  {value: 'United States', label: 'United States'},
  {value: 'Afghanistan', label: 'Afghanistan'},
  {value: 'Aland Islands', label: 'Aland Islands'},
  {value: 'Albania', label: 'Albania'},
  {value: 'Algeria', label: 'Algeria'}
];

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      file: '',
      coverBook: coverBook
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    // this.onSubmitChannel = this.onSubmitChannel.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
  }

  // onSubmitChannel(data) {
  //   console.log(data);
  //   //this.props.createChannel(data.name, data.description);
  //   this.props.createChannelRequest(data.name, data.description);
  // }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
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

  render() {
    const { book_name, book_description } = this.props;
    const { coverBook } = this.state;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <a href="#">+ Create new book</a>

        <Modal show={this.state.showModal} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Create new book</Modal.Title>
          </Modal.Header>

          <Form
            rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}
            onSubmit={this.onSubmitChannel}
          >
            <Modal.Body>
              <div className="cover-book">
                <h4>Cover image</h4>
                <img src={coverBook} alt=""/>
                <div className="add-cover-book">
                  <input type="file" onChange={(e) => this.handleCoverChange(e)}/>
                  <span>Change Cover</span>
                </div>
              </div>

              <Input
                name="name"
                value={book_name}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Book name"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Type name or select book template"
                type="text"
              />
              <Select
                name="location"
                value=""
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Book location"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Select location"
                options={selectCountry}
              />
              <Input
                name="description"
                value={book_description}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Description"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="(Optional)"
                type="text"
              />

            </Modal.Body>

            <Modal.Footer>
              {/*<Button onClick={this.Close}>Cancel</Button>*/}
              {/*<Button bsStyle="primary" type="submit">Create Book</Button>*/}
              <div style={{float: 'right'}}>
                <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
                <button className="btn-brand" style={{marginLeft: '10px'}} type="submit">Create Book</button>
              </div>

            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    );
  }
}

AddBook.propTypes = {
  book_name: PropTypes.string,
  book_description: PropTypes.string,
  // createChannelRequest: PropTypes.func
};

export default AddBook;
