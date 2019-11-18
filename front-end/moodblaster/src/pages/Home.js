import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import Webcam from "react-webcam";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import { string } from 'prop-types';

const videoConstraints = {
  width: 1280,
  "border-radius": "1vw",
  height: 720,
  facingMode: "user"
};

const GRADIENT_COLORS = [
  "linear-gradient(90deg, rgba(68,9,126,1) 0%, rgba(195,115,2,1) 100%)",
  "linear-gradient(90deg, rgba(126,9,9,1) 0%, rgba(116,195,2,1) 100%)",
  "linear-gradient(90deg, rgba(126,9,9,1) 0%, rgba(195,2,191,1) 100%)",
  "linear-gradient(90deg, rgba(2,42,20,1) 0%, rgba(48,195,2,1) 100%)",
  "linear-gradient(90deg, rgba(119,153,236,1) 0%, rgba(10,60,255,1) 100%)",
  "linear-gradient(90deg, rgba(4,35,112,1) 0%, rgba(120,10,255,1) 100%)",
  "linear-gradient(90deg, rgba(78,4,112,1) 0%, rgba(240,10,255,1) 100%)",
  "linear-gradient(90deg, rgba(255,105,184,1) 0%, rgba(255,10,10,1) 100%)",
  "linear-gradient(90deg, rgba(252,255,105,1) 0%, rgba(185,144,5,1) 100%)",
  "linear-gradient(90deg, rgba(0,255,145,1) 0%, rgba(200,255,172,1) 100%)"
];

var button_style = {
  alignSelf: 'center',
  fontWeight: "bolder",
  borderRadius: "1vw",
  backgroundColor: "#2f416d",
  borderColor: "#FFFFFF",
  height: "8vh",
  width: "20vh",
  color: "white",
  zIndex: "1"
};

var message = 'N/A'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.analyzeMusic = this.analyzeMusic.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  playMusic = () => {
    fetch('http://localhost:5000/play', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  pauseMusic = () => {
    fetch('http://localhost:5000/pause', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  analyzeMusic = () => {
    document.body.style.background = GRADIENT_COLORS[Math.floor(Math.random() * GRADIENT_COLORS.length)];
    document.body.style.transition = "background 5.5s ease-out";
    // put posts heres
    const imageSrc = this.webcam.getScreenshot();
    var imagestr = imageSrc.replace("data:image/jpeg;base64,", "");
    // fetch post
    const response = fetch('http://localhost:5000/picture', {
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
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
        <Webcam audio={false} screenshotFormat="image/jpeg" width='60%' videoConstraints={videoConstraints} ref={this.setRef} style={{ alignSelf: "center", marginTop:"3vh"}} />
        <div style={{ justifyContent: "center", textAlign: "center", fontWeight:"bolder", fontSize:"large"}}>Status: {message}</div>
        <Button style={button_style} onClick={this.analyzeMusic}>
          Track Mood
                </Button>

        <Button style={button_style} onClick={this.playMusic}>
          Play
                </Button>

        <Button style={button_style} onClick={this.pauseMusic}>
          Pause
                </Button>
      </div>
    );
  }
}
