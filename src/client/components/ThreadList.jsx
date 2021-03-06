import Avatar from './Avatar';
import DateDisplay from './DateDisplay';
import Pagination from './Pagination';
import React from 'react';

import { getParameter, setParameter } from '../helper/state';
import { Link, useHistory } from 'react-router-dom';

import './ThreadList.scss';

export default function ThreadList(props) {
	const { threads } = props;

	const history = useHistory();

	const sortedThreads = threads
		.map(thread => Object.assign(thread, { sortDate:new Date(thread.createdAt) }))
		.sort((a,b) => b.sortDate - a.sortDate);

	const currentPage = parseInt(getParameter('page'));
	const pageSize = parseInt(getParameter('pageSize'));
	const pageCount = Math.ceil(threads.filterCount / pageSize);
	const more = threads.filterCount - currentPage * pageCount;
	const onChange = val => history.push({ search:setParameter('page', val) });

	return <div className="thread-list">
	ThreadList:
		<div className="table table-style-1">
			{ sortedThreads.map(ThreadLink) }
		</div>
		<Pagination 
			currentPage={currentPage} 
			pageCount={pageCount} 
			onChange={onChange} 
		/>
	</div>
}

function ThreadLink(props) {
	const { createdBy, createdAt, title, forumId, threadId, count, latest } = props;

	return <div className="thread-row row" key={threadId}>
			<div className="cell">
				<Avatar username={createdBy} />
			</div>
			<div className="cell major">
				<Link to={`/forum/${forumId}/thread/${threadId}`}>{title}</Link>
			</div>
			<div className="cell minor">{createdBy}</div>
			<div className="cell minor"><DateDisplay date={createdAt} /></div>
			<div className="cell minor">{count} posts</div>
		</div>
}
