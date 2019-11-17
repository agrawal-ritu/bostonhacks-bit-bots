import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import Webcam from "react-webcam"; 
import {Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import { string } from 'prop-types';

const videoConstraints = {
  width: 1280,
  "border-radius": "1vw",
  height: 720,
  facingMode: "user"
};

const GRADIENT_COLORS = [
  "to right, #00F260, #0575E6",
  "to right top, #ff5e62, #36D1DC",
  "to right, #7a0f35, #800096",
  "to left bottom, #EB5757, #000042",
  "to right, #F2994A, #F2C94C",
  "to left, #36D1DC, #5B86E5",
  "to right bottom, #30E8BF, #FF8235",
  "to right, #8e44ad, #c0392b",
  "to right top, #000046, #1CB5E0",
  "to right bottom, #1CB5E0, #CB356B",
  "to left bottom, #CB356B, #ff9966",
  "to left, #5B86E5, #F2C94C",
  "to left top, #F2C94C, #00F260",
  "to right top, #000046, #0575E6",
  "to right top, #000046, #1CB5E0",
  "to right, #1CB5E0, #8e44ad"
];

var button_style = {
  alignSelf: 'center',
  fontWeight: "bolder",
  borderRadius: "1vw",
  backgroundColor: "#2f416d",
  borderColor: "#FFFFFF",
  height:"8vh",
  width:"20vh",
  color:"white",
  zIndex: "1"
};

var message = 'N/A'

export default class Home extends React.Component {
  constructor(props) {
      super(props);
      this.startMusic = this.startMusic.bind(this);
    }

  setRef = webcam => {
      this.webcam = webcam;
    };
	
	startMusic = () => {
    // put posts heres
    const imageSrc = this.webcam.getScreenshot();
    var imagestr = imageSrc.replace("data:image/jpeg;base64,", "");
    // fetch post
    const response = fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: imagestr,
      })
    }).then((response) => response.json())
    .then((response) => {
      message = response['message']
      console.log(message)
      this.forceUpdate();
    });
  };
	
    render() {
      return (
		        <div style={{ display: "flex", flexDirection:'column',justifyContent: "center"}}>
                <Webcam audio={false} screenshotFormat="image/jpeg" width='70%' videoConstraints={videoConstraints} ref={this.setRef} style={{alignSelf:"center"}}/>
                <div style={{justifyContent: "center", textAlign:"center"}}>Status: {message}</div>
                <Button style={button_style} onClick={this.startMusic}>
                  Track Mood
                </Button>
            </div>
      );
    }
  }
  