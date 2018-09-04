import React, { Component } from 'react';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';

import logo from './logo.png';
import './App.css';
import 'react-fine-uploader/gallery/gallery.css';

const uploader = new FineUploaderS3({
  options: {
    debug: true,
    request: {
      endpoint: "https://fullfillment-engine-file-uploader.s3-us-east-2.amazonaws.com",
      accessKey: process.env.S3_BUCKET,
    },
    signature: {
      endpoint: "https://fullfillment-engine-file-uploader.s3-us-east-2.amazonaws.com",
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
        <div className="header">
          <h1 className="title">Secure Data File Uploads for (ATP) service </h1>
          <p className="subTitle">
          Intended for BuckHead and FreshPoint data uploads
          </p>
        </div>
        <Gallery 
          className="gallery" 
          uploader={uploader}
        />
        <div className="footer"> 
        <p>Crafted by Sysco BT-Ignite </p>
        </div>
      </div>

    );
  }
}

export default App;
