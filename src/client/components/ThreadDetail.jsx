import React from 'react';

export default function ThreadDetail(props) {
	const { body, createdAt, createdBy, title } = props;

	return <div className="thread-detail">
		<header>
			<div className="title">{title}</div>
			<div className="byline">{createdBy}, ${renderDate(createdAt)}</div>
		</header>
		<div className="body">{body}</div>
	</div>;
}

function renderDate(date) {
	if (!date || !(date instanceof Date)) return 'invalid date';
	return date.toLocaleString();
}