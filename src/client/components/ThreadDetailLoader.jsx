import Breadcrumb from './Breadcrumb';
import LoadingIndicator from './LoadingIndicator';
import React from 'react';
import ThreadDetail from './ThreadDetail';

import { getForum } from '../model/forum';
import { getThread } from '../model/thread';

export default class ThreadDetailLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			thread: {},
		}
	}

	componentDidMount() {
		const { forumId, threadId } = this.props.match.params;
		this.load({ forumId, threadId });
	}

	async load({ forumId, threadId }) {
		this.setState({ forum:{}, thread:{}, loading: true });
		const [ forum, thread ] = await Promise.all([ getForum({ forumId }), getThread({ threadId }) ]);
		this.setState({ forum, thread, loading:false });
	}

	render() {
		const { forum, thread, loading } = this.state;

		if (loading) return <LoadingIndicator />;

		const breadcrumbs = [
			{ label:'Home', href:'/' },
			{ label:forum.title, href:`/forum/${forum.forumId}` },
			{ label:thread.title, href:`/forum/${forum.forumId}/thread/${thread.threadId}` },
		];

		return <div>
			<Breadcrumb breadcrumbs={breadcrumbs} />
			<ThreadDetail forum={forum} thread={thread} />
		</div>
	}
}