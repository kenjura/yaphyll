import DateDisplay from './DateDisplay';
import PostDetail from './PostDetail';
import React from 'react';

import './ThreadDetail.scss';

export default function ThreadDetail(props) {
	const { 
		createdAt=new Date(0),
		createdBy='?',
		posts=[], 
		title='unknown thread',
	} = props;

	return <div className="thread-detail">
		<header className="thread-header">
			<div className="title">{title}</div>
			{/*<div className="byline">{createdBy}, <DateDisplay date={createdAt} /></div>*/}
		</header>
		<div className="posts">
			{ posts.map(post => <PostDetail key={post.postId} {...post} />) }
		</div>
	</div>;
}
