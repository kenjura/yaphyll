import DateDisplay from './DateDisplay';
import React, { useEffect, useState } from 'react';

import './NewPost.scss';

export default function NewPost(props={}) {
	const { onSubmit, threadId, username='' } = props;

	const [ currentTime, setCurrentTime ] = useState(new Date());
	const [ body, setBody ] = useState('');

	// this is cute but hugely problematic; the interval isn't getting cleaned up
	// useEffect(() => {
	// 	setInterval(() => {
	// 		console.log('tick');
	// 		setCurrentTime(new Date());
	// 	}, 1000);
	// }, [threadId])

	return <div className="new-post post-detail">
		<header className="post-header">
			<div className="byline">New Post by {username}, <DateDisplay date={currentTime} /></div>
		</header>
		<div className="post-body">
			<form onSubmit={handleSubmit}>
				<textarea value={body} onChange={handleChange} />
				<input type="submit" />
			</form>
		</div>
	</div>;

	function handleChange(evt) {
		setBody(evt.target.value);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		onSubmit(body);
	}
}

import { getUser } from '../model/user'; // TODO: don't access data directly from here
import { createPost } from '../model/post';

export function NewPostLoader(props) {
	const { threadId } = props;
	const [ user, setUser ] = useState('?');

	useEffect(() => {
		(async () => {
			const user = await getUser();
			setUser(user.nickname);
		})();
	}, [props.key])

	return <NewPost threadId={threadId} username={user} onSubmit={onSubmit} />;

	function onSubmit(body) {
		const post = {
			body,
			threadId,
		};
		createPost(post)
			.then(res => console.log('success'))
			.catch(err => console.error(err))
	}
}