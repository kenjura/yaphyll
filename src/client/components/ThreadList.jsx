import React from 'react';

import { Link } from 'react-router-dom';

import './ThreadList.scss';

export default function ThreadList(props) {
	const { threads } = props;

	return <div className="thread-list">
	ThreadList:
		{threads.map(thread => <div className="thread" key={thread.threadId}>
			<Link to={`/forum/${thread.forumId}/thread/${thread.threadId}`}>
				<div className="thread-title">{thread.title}</div>
				<div className="thread-byline">{thread.createdBy}, {thread.createdAt.toLocaleString()}</div>
			</Link>
		</div>)}
	</div>
}

