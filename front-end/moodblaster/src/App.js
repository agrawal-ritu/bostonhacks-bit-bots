import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home'


class App extends React.Component {	
	
	render() {
		return (
			/* The following is just to test Game page */
			<div>
				<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
				</Switch>
				</BrowserRouter>
		    </div>
		)
	}
}

export default App;
