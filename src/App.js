import React from 'react'
import { post } from 'axios';
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
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file)
    .then((response)=>{
      console.log(response.status);
        if (response.data !== 'OK') {
          this.displayError();
        }
        else { 
          this.displaySuccess();
        }
    })
  }

  displayError() {
    Alert.error('Error Saving Data. Only CSV files accepted', {
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
  fileUpload(file){
    const url = 'https://1brxufrp5l.execute-api.us-east-1.amazonaws.com/qa/upload-file';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
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
        <input type="file" onChange={this.onChange} />
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