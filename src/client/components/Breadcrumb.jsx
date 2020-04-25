import React from 'react';

import { Link } from 'react-router-dom';

import './Breadcrumb.scss';

export default function Breadcrumb(props) {
	const { breadcrumbs=[] } = props;

	return <div class="breadcrumb">
		{ breadcrumbs.map(bc => <div className="breadcrumb-item" key={bc.label}>
				<Link to={bc.href}>{bc.label}</Link>
			</div>) }
	</div>
}