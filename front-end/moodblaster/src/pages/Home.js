import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import Webcam from "react-webcam"; 
import {Route, Switch, BrowserRouter, Link } from 'react-router-dom';

const videoConstraints = {
  width: 1280,
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

var floater = {
  bottom: "10vh",
  "font-weight": "bold",
  "border-radius": "1vw",
  "background-color": "#2f416d",
  "border-color": "#FFFFFF",
  position: "fixed",
  height:"8vh",
  width:"20vh",
  color:"white" ,
  "z-index": "1"
};

export default class Home extends React.Component {
    constructor(props) {
      super(props);
	  this.startMusic = this.startMusic.bind(this);
    }
	
	startMusic = () => {
		// put posts heres
	};
	
    
    render() {
      return (
		        <div style={{ display: "flex", justifyContent: "center"}}>
                <Webcam/>
                <Button class="button" style={floater} onClick={this.startMusic}>
                  Track Mood
                </Button>
            </div>
      );
    }
  }
  