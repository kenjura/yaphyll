import ForumList from './ForumList';
import ForumDetailLoader from './ForumDetailLoader';
import React from 'react';
import ThreadList from './ThreadList';
import ThreadCreate from './ThreadCreate';

import './ForumList.scss';

const TempLoadingIndicator = props => <div>loading...</div>;

export default function ForumDetail(props) {
	const { forum={} } = props;
	const { threads=[] } = forum;

	return <div id="forum">
		<h2>{forum.title}</h2>

		<div className="child-forums-list">
			<ForumList forums={forum.childForums} />
		</div>

		<div className="thread-list">
			<ThreadList threads={threads} />
		</div>

		<div className="thread-create">
			<ThreadCreate forumId={forum.forumId} />
		</div>
	</div>
}

