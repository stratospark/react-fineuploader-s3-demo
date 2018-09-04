import React, { Component } from 'react';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';

import logo from './logo.svg';
import './App.css';
import 'react-fine-uploader/gallery/gallery.css';

const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: "https://fullfillment-engine-file-uploader.s3-us-east-2.amazonaws.com",
      accessKey: process.env.S3_BUCKET
    },
    signature: {
      endpoint: "https://apk-file-uploader.sysco.com",
      version: 1
    },
    chunking: {
      enabled: true
    },
    objectProperties: {
      region: "us-east-2"
    }
  }
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="centered">Secure Data File Uploads for Buckhead and FreshPoint RDC information </h1>
        <p className="centered">
         Data uploaded here will feed the Available to Promise (ATP) service

        </p>
        <Gallery 
          className="gallery" 
          uploader={uploader}/>
      </div>
    );
  }
}

export default App;
