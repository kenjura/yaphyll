import React from 'react';

import './Avatar.scss';

export default function Avatar(props) {
	const { username } = props;

	const style = {
		backgroundColor: getColor(username),
	}

	return <div className="avatar" style={style}>{ username.substr(0,1) }</div>

	function getColor(username) {
		const h = Math.floor((username.toUpperCase().charCodeAt(0) - 65) * (360/26));

		return `hsl(${h},50%,50%)`
	}
}