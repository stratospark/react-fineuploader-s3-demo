import React from 'react'
import axios, { post } from 'axios';
import './App.css';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
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



export default SimpleReactFileUpload