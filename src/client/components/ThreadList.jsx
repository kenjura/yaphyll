import DateDisplay from './DateDisplay';
import Pagination from './Pagination';
import React from 'react';

import { getParameter, setParameter } from '../helper/state';
import { Link } from 'react-router-dom';

import './ThreadList.scss';

export default function ThreadList(props) {
	const { threads } = props;

	const sortedThreads = threads
		.map(thread => Object.assign(thread, { sortDate:new Date(thread.createdAt) }))
		.sort((a,b) => b.sortDate - a.sortDate);

	const currentPage = parseInt(getParameter('page'));
	const pageSize = parseInt(getParameter('pageSize'));
	const pageCount = Math.ceil(threads.filterCount / pageSize);
	const more = threads.filterCount - currentPage * pageCount;
	const onChange = val => setParameter('page', val);

	return <div className="thread-list">
	ThreadList:
		{ sortedThreads.map(ThreadLink) }
		<Pagination 
			currentPage={currentPage} 
			pageCount={pageCount} 
			onChange={onChange} 
		/>
	</div>
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
