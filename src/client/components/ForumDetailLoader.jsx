import ForumDetail from './ForumDetail';
import React from 'react';

import { getChildForums, getForum, getForums } from '../model/forum';
import { createThread, getThreadMetadata, getThreads } from '../model/thread';

const TempLoadingIndicator = props => <div>loading...</div>;

export default class ForumLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forum: null,
			loading: true,
		};
	}

	componentDidMount() {
		const { forumId } = this.props.match.params;
		this.load({ forumId });
	}

	async load({ forumId }={}) {
		this.setState({ forum:null, loading:true });
		const [ forum, childForums, threads, threadMetadata ] = await Promise.all([
			getForum({ forumId }),
			getChildForums({ forumId }),
			getThreads({ forumId }),
			getThreadMetadata({ forumId }),
		]);
		forum.childForums = childForums;
		forum.threads = threads;
		forum.threads.forEach(thread => {
			const { count=0, latest=null } = threadMetadata.find(t => t.threadId === thread.threadId) || {};
			thread.count = count;
			thread.latest = latest;
		})
		this.setState({ forum, loading:false });
	}

	render() {
		const { forum, loading } = this.state;
		if (loading) return <TempLoadingIndicator />;
		else return <ForumDetail key={forum.forumId} forum={forum} />
	}
}