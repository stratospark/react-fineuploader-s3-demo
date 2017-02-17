import React, { Component } from 'react';
import FineUploaderS3 from 'fine-uploader-wrappers/s3';
import Gallery from 'react-fine-uploader';

import logo from './logo.svg';
import './App.css';
import 'react-fine-uploader/gallery/gallery.css';

const uploader = new FineUploaderS3({
  options: {
    request: {
      endpoint: "https://files-stratospark-us-public-upload.s3-us-west-1.amazonaws.com",
      accessKey: "AKIAJYVGHCVCR3DUFS2Q"
    },
    signature: {
      endpoint: "https://signature-prod.stratospark.us",
      version: 4
    },
    chunking: {
      enabled: true
    },
    objectProperties: {
      region: "us-west-1"
    }
  }
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="centered">Secure 'Serverless' File Uploads with AWS Lambda, S3, and Zappa</h1>
        <p className="centered">
          This demo uses a Zappa S3 Signing function executed on AWS Lambda
          to allow you to directly upload to an S3 bucket using Fine Uploader in your browser.

          Please read more about this project at: <br/><br/><a href="https://github.com/stratospark/zappa-s3-signature">https://github.com/stratospark/zappa-s3-signature</a>
          <br/><br/><a href="https://github.com/stratospark/react-fineuploader-s3-demo">https://github.com/stratospark/react-fineuploader-s3-demo</a>
        </p>
        <Gallery className="gallery" uploader={uploader}/>
      </div>
    );
  }
}

export default App;
