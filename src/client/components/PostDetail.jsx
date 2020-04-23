import DateDisplay from './DateDisplay';
import React from 'react';

export default function PostDetail(props) {
	const { body, createdAt, createdBy } = props;

	return <div className="post-detail">
		<header className="post-header">
			<div className="byline">{createdBy}, <DateDisplay date={createdAt} /></div>
		</header>
		<div className="post-body"><PostBody body={body} /></div>
	</div>;
}


function PostBody({ body }={}) {
	let html = body;

	// general
	html = html.replace(/\n/g, '<br>');

	// bbCode
	html = html.replace(/\[b\]/g, '<strong>');
	html = html.replace(/\[\/b\]/g, '</strong>');
	html = html.replace(/\[size=large\]/g, '<span style="font-size: 125%;">');
	html = html.replace(/\[\/size\]/g, '</span>');
	html = html.replace(/\[url\](.*?)\[\/url\]/g, '<a href="$1">$1</a>');
	html = html.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>');

	return <span dangerouslySetInnerHTML={{ __html:html }} />;
}