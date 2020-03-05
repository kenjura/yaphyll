import createThread from '../controller/createThread';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './ThreadCreate.scss';

export default function ThreadCreate(props) {
	const { forumId } = props;

	const [ createdBy, setCreatedBy ] = useState('admin');
	const [ title, setTitle ] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		createThread({ createdBy, forumId, title });
	}

	return <div className="thread-create">
	ThreadCreate:
		<form onSubmit={handleSubmit}>
			<label>
				Created by
				<input value={createdBy} onChange={evt => setCreatedBy(evt.target.value)} />
			</label>
			<label>
				Title
				<input value={title} onChange={evt => setTitle(evt.target.value)} />
			</label>
			<input type="submit" />
		</form>
	</div>
}

