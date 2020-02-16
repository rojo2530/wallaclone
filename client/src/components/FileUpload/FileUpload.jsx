import React from 'react';
import axios, { post } from 'axios';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onUploadFile = this.onUploadFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onUploadFile() {
    const url = '/apiv1/anuncios/uploadfile';
    const formData = new FormData();
    formData.append('photo', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(url, formData, config)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file) {
    const url = '/apiv1/anuncios/uploadfile';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  }

  render() {
    return (
      <>
        <input type="file" onChange={this.onChange} />
        <button type="button" onClick={this.onUploadFile}>
          Upload
        </button>
      </>
    );
  }
}

export default FileUpload;
