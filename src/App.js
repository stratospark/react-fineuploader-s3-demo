import React, { Component } from 'react';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

import logo from './logo.png';
import './App.css';
import 'react-fine-uploader/gallery/gallery.css';

const uploader = new FineUploaderTraditional({
  options: {
    debug: true,
    request: {
      method: "POST",
      endpoint: "https://1brxufrp5l.execute-api.us-east-1.amazonaws.com/qa/upload-file",
    },
    chunking: {
      enabled: true
    },
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
