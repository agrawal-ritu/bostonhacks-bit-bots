import React from 'react';
import Button from "react-bootstrap/Button";
import "../components/BubblyButton.css";

export default class PButton extends React.Component.Button {
	constructor(props) {
		super(props);
		this.state = {
			// input state parameters as needed or delete this.state
			// error_status = 1
		}
	}
	
	render() {
		return(
			// input front end/final style + html here
			// just a placeholder
			<Button id="newbutton"></Button>
			
		)
	}
}
