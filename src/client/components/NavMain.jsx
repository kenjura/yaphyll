import React from 'react';

import { Link } from 'react-router-dom';

import './NavMain.scss';

export default class NavMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return <nav id="nav-main">
			<header>Site Title</header>
			<Link to="/">Home</Link>
		</nav>
	}
}