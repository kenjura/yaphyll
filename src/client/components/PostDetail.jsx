import DateDisplay from './DateDisplay';
import React from 'react';

export default function PostDetail(props) {
	const { body, createdAt, createdBy } = props;

	return <div className="post-detail">
		<header>
			<div className="byline">{createdBy}, <DateDisplay date={createdAt} /></div>
		</header>
		<div className="body">{body}</div>
	</div>;
}
