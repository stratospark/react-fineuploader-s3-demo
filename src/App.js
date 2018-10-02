import React from 'react';
import axios from 'axios';
import './App.css';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import DayPicker, { DateUtils } from 'react-day-picker';
import "react-day-picker/lib/style.css";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      selectedDays: [],
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.displaySuccess = this.displaySuccess.bind(this)
    this.displayError = this.displayError.bind(this)
    this.fileError = this.fileError.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
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

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }


  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">GATP Data tools </h1>
          <p className="subTitle">
          Intended for BuckHead and FreshPoint </p>
        </div>
        <Grid 
          container spacing={24}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Alert timeout={5000}/>
            <form onSubmit={this.onFormSubmit}>
              <Grid  item xs={18}>
                <h1>Item file upload</h1>
                <h3> Note: CSV files only </h3>
              </Grid>
                <input 
                  type="file" 
                  onChange={this.onChange}
                  className="uploadFile"
                  id='fileUploadInput'
                />
              <Button 
                variant="contained" 
                component="span" 
                className='button'
                onClick={this.onFormSubmit}
              >
                Submit File
              </Button>
            </form>
          <div className='calendar'>
            <h1> Select Holiday or Skip days</h1>
            <h3> Note: You make select multiple days </h3>
            
            <DayPicker
              selectedDays={this.state.selectedDays}
              onDayClick={this.handleDayClick}
            />
            <Button 
              variant="contained" 
              component="span" 
              className='button'> 
              Save
            </Button>
          </div>
        </Grid>
        <div className="footer"> 
          <p>Crafted by Sysco BT-Ignite </p>
        </div>
      </div>
   )
  }
}



export default App