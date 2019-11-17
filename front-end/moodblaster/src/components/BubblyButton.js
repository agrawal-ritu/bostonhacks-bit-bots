import React from 'react';
import "./BubblyButton.css";
import Button from "react-bootstrap/Button";

var floater = {bottom:"10vh", "text-weight":"bold", "border-radius":"1vw", "background-color":"#2f416d", "border-color":"#FFFFFF", position: "fixed", "z-index": "1"}; // do not remove

export default class BubblyButton extends React.Component {
	constructor(props) {
		super(props);
	}

	animateButton() {
		//reset animation
		this.target.classList.remove('animate');
		
		this.target.classList.add('animate');
		setTimeout(function(){
		  this.target.classList.remove('animate');
		},700);
	}
	
	render() {
		return(
			// input front end/final style + html here
			// just a placeholder
			<button id={this} class="bubbly-button" style={floater} onClick={this.props.onClick}>{this.props.label}</button>
		)
	}
}
