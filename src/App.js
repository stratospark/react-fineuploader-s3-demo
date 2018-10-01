import React from 'react'
import axios, { post } from 'axios';
import './App.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.displaySuccess = this.displaySuccess.bind(this)
    this.displayError = this.displayError.bind(this)
    this.fileError = this.fileError.bind(this)
  }

  fileError() {
    Alert.error('Please upload file', {
      position: 'top-right',
      effect: 'slide',
    });
  }

  displayError() {
    Alert.error('Only CSV files accepted. Refresh and Try Again', {
      position: 'top-right',
      effect: 'slide',
    });
  }

  displaySuccess() {
    Alert.success('Save Successful', {
      position: 'top-right',
      effect: 'slide',
    });
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    if (this.state.file) {
      this.fileUpload(this.state.file)
    }
    else if (this.state.file === null) {
      this.fileError();
    }
  }

  fileUpload(file){
    const url = 'https://1brxufrp5l.execute-api.us-east-1.amazonaws.com/qa/upload-file';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(url, formData, config)
    .then(response =>{
        console.log(response, 'response');
        if (response.status === 200) {
          this.displaySuccess();
          this.setState({ file: null});
        };
    })
    .catch(error => {
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request,'error request');
      this.displaySuccess();
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      this.displayError();
    }
  });
  }

  render() {
    return (
       <div className="App">
        <div className="header">
          <h1 className="title">Secure Data File Uploads for (ATP) service </h1>
          <p className="subTitle">
          Intended for BuckHead and FreshPoint data uploads
          </p>
        </div>
      <Alert timeout={5000}/>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <h3> CSV files only </h3>
        <input 
          type="file" 
          onChange={this.onChange}
          className="uploader"
          />
        <button type="submit">Upload</button>
        <div className="footer"> 
          <p>Crafted by Sysco BT-Ignite </p>
        </div>
      </form>
      </div>
   )
  }
}



export default App