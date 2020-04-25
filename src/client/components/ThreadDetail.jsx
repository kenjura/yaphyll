import DateDisplay from './DateDisplay';
import PostDetail from './PostDetail';
import React from 'react';

import { NewPostLoader } from './NewPost';

import './ThreadDetail.scss';

export default function ThreadDetail(props) {
	const { forum={}, thread } = props;
	const { 
		createdAt=new Date(0),
		createdBy='?',
		posts=[], 
		title='unknown thread',
	} = thread;

	return <div className="thread-detail">
		{/*<header className="thread-header">
			<div className="title">{forum.title} > {title}</div>
		</header>*/}
		<div className="posts">
			{ posts.map(post => <PostDetail key={post.postId} {...post} />) }
			<NewPostLoader threadId={thread.threadId} />
		</div>
	</div>;
}