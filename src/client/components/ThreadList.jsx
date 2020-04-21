import DateDisplay from './DateDisplay';
import React from 'react';

import { Link } from 'react-router-dom';

import './ThreadList.scss';

export default function ThreadList(props) {
	const { threads } = props;

	const sortedThreads = threads
		.map(thread => Object.assign(thread, { sortDate:new Date(thread.createdAt) }))
		.sort((a,b) => b.sortDate - a.sortDate);
		
	return <div className="thread-list">
	ThreadList:
		{ sortedThreads.map(ThreadLink) }
	</div>
}

function getThreads() {
	let threads = [];
	for (let i = 0; i < 10; i++) {
		threads.push({
			createdAt: (new Date(Date.now()+Math.floor(Math.random()*10000000000))).toISOString(),
			forumId: Math.floor(Math.random()*10),
			threadId: Math.floor(Math.random()*1000),
			createdBy: 'rando',
		});
	}
	return threads;
}

function ThreadLink(props) {
	const { createdBy, createdAt, title, forumId, threadId } = props;

	return <div className="thread" key={threadId}>
		<Link to={`/forum/${forumId}/thread/${threadId}`}>
			<div className="thread-title">{title}</div>
			<div className="thread-byline">{createdBy}, <DateDisplay date={createdAt} /></div>
		</Link>
	</div>
}
